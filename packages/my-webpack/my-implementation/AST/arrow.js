// 箭头函数转化成普通函数
const core = require('@babel/core')
const types = require('@babel/types')
const BabelPluginTransformEs2015ArrowFunctions =
  require('babel-plugin-transform-es2015-arrow-functions');

const es5code = `
const func=(a,b)=>{
  console.log(this)
  return a+b
}
`

function getScopeInfoInformation (fnPath) {
  let thisPaths = [];
  //遍历当前path所有的子节点路径，
  //告诉 babel我请帮我遍历fnPath的子节点，遇到ThisExpression节点就执行函数，并且把对应的路径传进去 
  fnPath.traverse({
    ThisExpression (thisPath) {
      thisPaths.push(thisPath);
    }
  });
  return thisPaths;
}
function hoistFunctionEnvironment (fnPath) {
  const thisEnvFn = fnPath.findParent(p => {
    //是一个函数，不能是箭头函数 或者 是根节点也可以
    return (p.isFunction() && !p.isArrowFunctionExpression()) || p.isProgram()
  });
  //找一找当前作用域哪些地方用到了this的路径
  let thisPaths = getScopeInfoInformation(fnPath);
  //声明了一个this的别名变量，默认是_this __this
  let thisBinding = '_this';
  if (thisPaths.length > 0) {
    //在thisEnvFn的作用域内添加一个变量，变量名 _this,初始化的值为 this
    thisEnvFn.scope.push({
      id: types.identifier(thisBinding),
      init: types.thisExpression()
    });
    thisPaths.forEach(item => {
      //创建一个_this的标识符  
      let thisBindingRef = types.identifier(thisBinding);
      //把老的路径 上的节点替换成新节点
      item.replaceWith(thisBindingRef);
    });
  }
}

const myPluginTransformEs2015ArrowFunctions = {
  visitor: {
    //属性就是节点的类型，babel在遍历到对应类型的节点的时候会调用此函数
    ArrowFunctionExpression (nodePath) {//参数是节点的数据
      let node = nodePath.node;//获取 当前路径上的节点
      hoistFunctionEnvironment(nodePath)
      node.type = 'FunctionExpression'
    }
  }
}

const es6Code = core.transform(es5code, {
  // plugins: [BabelPluginTransformEs2015ArrowFunctions]
  plugins: [myPluginTransformEs2015ArrowFunctions]
})

console.log(es6Code.code)
// var _this = this;

// const func = function (a, b) {
//   console.log(_this);
//   return a + b;
// };