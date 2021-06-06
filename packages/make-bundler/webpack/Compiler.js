const path = require('path')
const { toUnixPath, tryExtensions, getSource } = require('./utils')
const fs = require('fs-extra')

const types = require('@babel/types');
const parser = require('@babel/parser');//源代码转成AST抽象语法树
const traverse = require('@babel/traverse').default;//遍历语法树
const generator = require('@babel/generator').default;//把语法树重新生成代码

class Compiler {
  constructor(config) {
    this.config = config
    this.entries = new Set();//这个数组存放着所有的入口
    this.modules = new Set();//这里存放着所有的模块
    this.chunks = new Set();//webpack5 this.chunks = new Set();
    this.assets = {};//输出列表 存放着将要产出的资源文件
    this.files = new Set();//表示本次编译的所有产出的文件名
  }
  run (callBack) {
    // 入口处理
    let entry = {}
    if (typeof this.config.entry === 'string') {
      entry = { main: this.config.entry }
    } else {
      entry = this.config.entry
    }
    // 生成入口模块
    const rootPath = toUnixPath(this.config.context)
    this.rootPath = rootPath
    for (let entryName in entry) {
      // 最后传入的路径应该是绝对路径 才比较好生成id
      const entryModule = this.buildModule(entryName, path.join(rootPath, entry[entryName]))
      this.modules.add(entryModule)
      this.entries.add(entryModule)
      // 添加chunk
      this.chunks.add({
        name: entryName,
        entryModule,
        modules: Array.from(this.modules).filter(module => module.chunks.includes(entryName))
      })
      // 生成对应的模块
    }
    // 根据chunks生成资源
    const output = this.config.output
    const outputPath = output.path
    this.chunks.forEach(chunk => {
      const filename = output.filename.replace('[name]', chunk.name)
      this.files.add(filename)
      this.assets[filename] = getSource(chunk)
    })
    for (let asset in this.assets) {
      // 输出文件
      fs.outputFileSync(path.join(outputPath, asset), this.assets[asset], {
        encoding: 'utf-8'
      })
    }
    callBack(null, {
      toJson: () => ({
        entries: this.entries,
        modules: this.modules,
        chunks: this.chunks,
        assets: this.assets,
        files: this.files,
      })
    })
  }
  buildModule (entryName, entryFilePath) {
    // 相对根目录的路径作为id
    const code = fs.readFileSync(entryFilePath, 'utf-8')
    let mouduleId = './' + path.posix.relative(this.rootPath, entryFilePath)
    const module = {
      id: mouduleId,
      name: mouduleId,
      chunks: [entryName],
      dependencies: [] // 存放依赖的绝对路径
    }
    const AST = parser.parse(code)
    traverse(AST, {
      CallExpression: ({ node }) => {
        // 找到对应的语句
        if (node.callee.name === 'require') {
          // 找到对应的模块
          const dep = node.arguments[0].value
          // 将路径转化为绝对路径
          const dirname = path.dirname(entryFilePath)
          const depPath = tryExtensions(
            path.join(dirname, dep),
            this.config.resolve.extensions,
            dep,
            dirname,
          )
          const depId = './' + path.posix.relative(this.rootPath, depPath)
          // 修改模块的路径引入
          node.arguments[0] = types.identifier(`"${depId}"`)
          // 将依赖添加进来
          module.dependencies.push({
            name: dep,
            id: depId,
            path: depPath
          })
        }
      }
    })
    // 注意这里AST改变了 所以需要获取真正的代码
    const targetCode = generator(AST)
    module._source = targetCode.code
    // 循环编译
    module.dependencies.forEach(dep => {
      // 添加到模块里面来
      // 处理模块重复处理
      const alreadyModule = Array.from(this.modules)
        .find(module => module.id === dep.id);
      if (!alreadyModule) {
        const depModule = this.buildModule(entryName, dep.path)
        this.modules.add(depModule)
      } else {
        alreadyModule.chunks = Array.from(new Set([...(alreadyModule.chunks || []), entryName]))
      }
    })
    return module
  }
}

module.exports = Compiler
