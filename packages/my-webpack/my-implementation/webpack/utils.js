const fs = require('fs')

function toUnixPath (filePath) {
  return filePath.replace(/\\/g, '/');
}

function tryExtensions (modulePath, extensions, originalModulePath, moduleContext) {
  extensions.unshift('')
  // 判断是否存在这个文件
  for (let i = 0; i < extensions.length; i++) {
    const ext = extensions[i]
    if (fs.existsSync(modulePath + ext)) {
      return modulePath + ext
    }
  }
  throw new Error(`Module not found: Error: Can't resolve '${originalModulePath}' in '${moduleContext}'`);
}

function getSource (chunk) {
  const { name, origins, modules } = chunk
  const innerModules = {}
  for (let module of modules) {
    innerModules[module.id] = `(module)=>{
      ${module._source}
    }
    `
  }
  return `
var __webpack_modules__ = ({${chunk.modules.map(module => `
  "${module.id}":
    ((module) => {
            ${module._source}
    })
  `).join(',')
    }
});

var __webpack_module_cache__ = {};
function require (moduleId) {
  var cachedModule = __webpack_module_cache__[moduleId];
  if (cachedModule !== undefined) {
    return cachedModule.exports;
  }
  var module = __webpack_module_cache__[moduleId] = {
    exports: {}
  };
  __webpack_modules__[moduleId](module, module.exports, require);
  return module.exports;
}
const module = require("${origins.id}")
  `
}
module.exports = {
  toUnixPath,
  tryExtensions,
  getSource
}