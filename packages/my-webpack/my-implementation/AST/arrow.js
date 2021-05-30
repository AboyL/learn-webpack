// 箭头函数转化成普通函数
const core = require('@babel/core')
const types = require('@babel/types')
const BabelPluginTransformEs2015ArrowFunctions =
  require('babel-plugin-transform-es2015-arrow-functions');

const es5code = `
const func=(a,b)=>{
  return a+b
}
`

const maPluginTransformEs2015ArrowFunctions = {
  visitor: {
    //属性就是节点的类型，babel在遍历到对应类型的节点的时候会调用此函数
    ArrowFunctionExpression (nodePath) {//参数是节点的数据
      let node = nodePath.node;//获取 当前路径上的节点
      node.type ='FunctionExpression'
    }
  }
}

const es6Code = core.transform(es5code, {
  // plugins: [BabelPluginTransformEs2015ArrowFunctions]
  plugins: [maPluginTransformEs2015ArrowFunctions]
})

console.log(es6Code.code)