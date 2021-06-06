const fs = require('fs-extra')
// 统一平台
function toUnixPath (filePath) {
  return filePath.replace(/\\/g, '/');
}

function tryExtensions (dep, extensions, originalModulePath, moduleContext,) {
  for (let extension of ['', ...extensions]) {
    if (fs.existsSync(dep + extension)) {
      return dep + extension
    }
  }
  // 错误处理
  throw new Error(`Module not found: Error: Can't resolve '${originalModulePath}' in '${moduleContext}'`);
}


const changeRequire = (code) => {
  return code.replace('require', '__webpack_require__')
}
function getSource (chunk) {
  const { modules } = chunk
  return `
(() => {
  var __webpack_modules__ = ({
    ${modules.map(module => {
    return `
        "${module.id}":((module) => {
          ${changeRequire(module._source)}
        })
        `
  }).join(',')
    }
  });

  var __webpack_module_cache__ = {};
  function __webpack_require__ (moduleId) {
    var cachedModule = __webpack_module_cache__[moduleId];
    if (cachedModule !== undefined) {
      return cachedModule.exports;
    }
    var module = __webpack_module_cache__[moduleId] = {
      exports: {}
    };
    __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
    return module.exports;
  }
  var __webpack_exports__ = {};
  (() => {
    ${changeRequire(chunk.entryModule._source)}
  })();
})()
  ;
`
}

module.exports = {
  toUnixPath,
  tryExtensions,
  getSource
}