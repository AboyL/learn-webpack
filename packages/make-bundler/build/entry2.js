
(() => {
  var __webpack_modules__ = ({
    
        "./src/dep2.js":((module) => {
          const dep1 = __webpack_require__("./src/dep1.js");

module.exports = dep1 + 2;
        })
        ,
        "./src/entry2.js":((module) => {
          const dep2 = __webpack_require__("./src/dep2.js");

console.log('entry2' + dep2);
        })
        
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
    const dep2 = __webpack_require__("./src/dep2.js");

console.log('entry2' + dep2);
  })();
})()
  ;
