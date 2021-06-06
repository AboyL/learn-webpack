let babel = require("@babel/core");
let types = require("babel-types");
const visitor = {
  ImportDeclaration: {
    enter (path, state = { opts }) {
      const specifiers = path.node.specifiers;
      const source = path.node.source;
      if (
        // 针对部分导入进行转化
        state.opts.library == source.value &&
        // 避免死循环
        !types.isImportDefaultSpecifier(specifiers[0])
      ) {
        // 新的声明语句
        const declarations = specifiers.map((specifier, index) => {
          return types.ImportDeclaration(
            [types.importDefaultSpecifier(specifier.local)],
            types.stringLiteral(`${source.value}/${specifier.local.name}`)
          );
        });
        path.replaceWithMultiple(declarations);
      }
    },
  },
};
module.exports = function (babel) {
  return {
    visitor,
  };
};