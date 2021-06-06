const { SyncHook } = require('tapable');
const fs = require('fs-extra')
const path = require('path')
const { toUnixPath, tryExtensions, getSource } = require('./utils')
const types = require('@babel/types');
const parser = require('@babel/parser');//源代码转成AST抽象语法树
const traverse = require('@babel/traverse').default;//遍历语法树
const generator = require('@babel/generator').default;//把语法树重新生成代码

class Compiler {
  constructor(config) {
    this.config = config
    this.hooks = {
      run: new SyncHook(),//会在开始编译的时候触发
      emit: new SyncHook(),//会在将要写入文件的时候触发
      done: new SyncHook()//会在完成编译的时候触发
    }

    this.entries = new Set();//这个数组存放着所有的入口
    this.modules = new Set();//这里存放着所有的模块
    this.chunks = new Set();//webpack5 this.chunks = new Set();
    this.assets = {};//输出列表 存放着将要产出的资源文件
    this.files = new Set();//表示本次编译的所有产出的文件名

  }
  run (callback) {
    console.log('开始编译')
    // 执行run钩子里面的插件
    this.hooks.run.call()
    // 确定entry
    let entry = {}
    if (typeof this.config.entry === 'string') {
      entry = {
        main: this.config.entry
      }
    } else {
      entry = this.config.entry
    }
    // 读取entry进行编译并且调用loader进行处理
    const rootPath = toUnixPath(this.config.context)
    for (let entryName in entry) {
      // 处理路径
      const entryFilePath = toUnixPath(path.join(rootPath, entry[entryName]))
      let entryModule = this.buildModule(entryName, entryFilePath);
      this.entries.add(entryModule)
      this.modules.add(entryModule)
      // 生成chunk
      const chunk = {
        name: entryName,
        // 可以是数组模式 这里只用对象进行处理
        origins: entryModule,
        // 对应的module
        modules: Array.from(this.modules).filter(m => (m.chunks || []).includes(entryName))
      }
      // 根据modules生成chunk
      this.chunks.add(chunk)
    }
    // 生成assets
    // 根据Chunk转换成一个单独的文件加入到输出列表 this.assets对象key文件名 值 文件的内容
    let output = this.config.output;
    this.chunks.forEach(chunk => {
      let filename = output.filename.replace('[name]', chunk.name);//filename只是文件名
      this.assets[filename] = getSource(chunk);
    });
    // 根据assets生成文件
    this.hooks.emit.call()
    for (let filename in this.assets) {
      this.files.add(filename)
      fs.outputFileSync(path.join(output.path, filename), this.assets[filename], {
        encoding: 'utf-8'
      })
    }
    //到了这里编译工作就全部结束，就可以触发done的回调了
    this.hooks.done.call();
    callback(null, {
      toJson: () => (
        {
          entries: this.entries,
          chunks: this.chunks,
          modules: this.modules,
          files: this.files,
          assets: this.assets
        }
      )
    });
  }
  buildModule (entryName, entryFilePath) {
    // 通过loader进行处理
    // 获取原始代码
    const originSourceCode = fs.readFileSync(entryFilePath, 'utf-8')
    // 获取匹配的loader
    const rules = this.config.module.rules
    let loaders = []
    for (let rule of rules) {
      // 如果可以匹配就放进去
      if (rule.test.test(entryFilePath)) {
        loaders = [...loaders, ...rule.use]
      }
    }
    // 通过loader转换原始代码
    let targetSourceCode = originSourceCode
    while (loaders.length !== 0) {
      const loader = require(loaders.pop())
      targetSourceCode = loader(targetSourceCode)
    }
    //找到模块依赖的模块再递归本步骤直到入口文件依赖的文件偶读经过了
    // 本步骤的处理
    // 模块id就是相对根目录的相对路径
    let mouduleId = './' + path.posix.relative(toUnixPath(this.config.context), entryFilePath)
    // 依赖分析
    let module = {
      name: mouduleId,
      id: mouduleId,
      chunks: [entryName],
      dependencies: [],
    }
    const AST = parser.parse(targetSourceCode, {
      sourceType: 'module'
    })
    traverse(AST, {
      // 找到require进行处理
      CallExpression: ({ node }) => {
        if (node.callee.name === 'require') {
          // 也就相当于引入的模块的相对路径
          let moduleName = node.arguments[0].value
          // 获取模块的绝对路径
          const dirname = path.posix.dirname(entryFilePath)
          let depModulePath = path.join(dirname, moduleName)
          // 添加后缀
          const extensions = this.config.resolve.extensions
          depModulePath = tryExtensions(depModulePath, extensions, moduleName, dirname);
          let depModuleId = './' + path.posix.relative(toUnixPath(this.config.context), depModulePath)
          // 统一id 将相对模块路径转化成相对根目录的路径才能进行读取
          node.arguments = [types.stringLiteral(depModuleId)]
          //判断现有的已经编译过的modules里有没有这个模块，如果有，不用添加依赖了，如果没有则需要添加
          const alreadyModule = Array.from(this.modules).find(module => module.id === depModuleId);
          //如果已经编译过的模块的里不包含这个依赖模块的话才添加，如果已经包含了，就不要添加了
          // 这个路径应该是一个绝对路径
          if (!alreadyModule) {
            module.dependencies.push({depModulePath})
          } else {
            // 修改chunk
            alreadyModule.chunks = Array.from(new Set([...(alreadyModule.chunks || []), entryName]))
          }
        }
      }
    })
    const { code } = generator(AST)
    module._source = code
    module.dependencies.forEach(dep => {
      let depModule = this.buildModule(entryName, dep)
      this.modules.add(depModule)
    })
    return module
  }
}


module.exports = Compiler