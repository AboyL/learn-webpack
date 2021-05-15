
var __webpack_modules__ = {
  "./src/module.js":
    ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
      "use strict";
      __webpack_require__.rankESModule(__webpack_exports__);
      __webpack_require__.defineProperty(__webpack_exports__, {
        "default": () => (__WEBPACK_DEFAULT_EXPORT__),
        "test": () => (test)
      });
      const __WEBPACK_DEFAULT_EXPORT__ = ('test_es_modules');
      const test = 'test'
    })
}
var __webpack_module_cache__ = {};

// 同前面的实现
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

// 设置属性 可以延迟加载
__webpack_require__.defineProperty = (exports, definition) => {
  for (var key in definition) {
    if (__webpack_require__.ownProperty(definition, key)
      && !__webpack_require__.ownProperty(exports, key)) {
      Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
    }
  }
};

// 判断是否是ownProperty
__webpack_require__.ownProperty = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))

// 标记为 es 模块
__webpack_require__.rankESModule = (exports) => {
  if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
    // 不使用在控制台会显示为一个普通的对象 而是使用了 打印是一个带有Module的对象
    Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
  }
  Object.defineProperty(exports, '__esModule', { value: true });
};

const module = __webpack_require__("./src/module.js")
console.log(module)
console.log(module.test)