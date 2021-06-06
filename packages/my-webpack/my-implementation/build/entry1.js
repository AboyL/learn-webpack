
var __webpack_modules__ = ({
  "./test-code/module.js":
    ((module) => {
      //log1
      //log2
      module.exports = 'module';
    })
  ,
  "./test-code/module2.js":
    ((module) => {
      //log1
      //log2
      const m = require("./test-code/module.js");

      module.exports = "module2" + m;
    })
  ,
  "./test-code/index.js":
    ((module) => {
      //log1
      //log2
      const m = require("./test-code/module.js");

      const module2 = require("./test-code/module2.js");

      console.log('test+', m + module2);
    })

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
const module = require("./test-code/index.js")
