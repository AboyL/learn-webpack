const fs = require('fs-extra')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const babel = require('@babel/core')
const path = require('path')

const moduleAnalyser = (filename) => {
  const entryCode = fs.readFileSync(filename, 'utf-8')
  const AST = parser.parse(entryCode, {
    sourceType: 'module'
  })

  // 依赖处理
  const dependencies = {}
  traverse(AST, {
    ImportDeclaration ({ node }) {
      const pathValue = node.source.value
      const dirPath = path.dirname(filename)
      // 进行路径处理
      dependencies[pathValue] = path.join(dirPath, pathValue)
    }
  })

  const { code } = babel.transformFromAstSync(AST, null, {
    presets: ['@babel/preset-env']
  })

  return {
    filename,
    dependencies,
    code
  }
}

// 生成依赖图
const getDependenciesGraph = (entry) => {
  // 先通过入口文件获取到对应的依赖
  const entryContent = moduleAnalyser(entry)
  const graphArr = [entryContent]
  for (let item of graphArr) {
    const { dependencies } = item
    if (dependencies) {
      for (let k in dependencies) {
        graphArr.push(moduleAnalyser(dependencies[k]))
      }
    }
  }
  const graph = {}
  graphArr.forEach(item => {
    graph[item.filename] = {
      dependencies: item.dependencies,
      code: item.code
    }
  })
  debugger
  return graph
}

const generateCode = (entry) => {
  // 生成代码
  const graph = getDependenciesGraph(entry)
  return `
  (function(graph){
    function require(module){
      function localRequier(relativePath){
        return require(graph[module].dependencies[relativePath])
      }
      var exports={};
      (function(require,exports,code){ 
        eval(code)
      })(localRequier,exports,graph[module].code)
      return exports
    }
    require('${entry}')
  })(${JSON.stringify(graph)})
  `
}
const result = generateCode('./src/index.js')
fs.outputFileSync('./dist/output.js',result)