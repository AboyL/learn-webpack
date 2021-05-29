var __webpack_modules__ = ({});
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

__webpack_require__.modules = __webpack_modules__;

__webpack_require__.d = (exports, definition) => {
  for (var key in definition) {
    if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
      Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
    }
  }
};

// 函数
__webpack_require__.functions = {};

// 对__webpack_require__.functions中的函数进行了一次遍历调用
// 通过jsonp加载异步代码
__webpack_require__.ensure = (chunkId) => {
  console.log(Object.keys(__webpack_require__.functions))
  let promises = []
  for (let k in __webpack_require__.functions) {
    const func = __webpack_require__.functions[k]
    func(chunkId, promises)
  }
  return Promise.all(promises)
};

__webpack_require__.unionFileName = (chunkId) => {
  return "" + chunkId + ".main.js";
};

__webpack_require__.g = (function () {
  if (typeof globalThis === 'object') return globalThis;
  try {
    return this || new Function('return this')();
  } catch (e) {
    if (typeof window === 'object') return window;
  }
})();


__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))

// load 真正的加载
__webpack_require__.load = (url, done, key, chunkId) => {
  script = document.createElement('script');
  script.charset = 'utf-8';
  script.src = url;
  document.head.appendChild(script)
};


// rankEsModule
__webpack_require__.rankEsModule = (exports) => {
  if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
    Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
  }
  Object.defineProperty(exports, '__esModule', { value: true });
};

var scriptUrl;
if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
var document = __webpack_require__.g.document;
if (!scriptUrl && document) {
  if (document.currentScript)
    scriptUrl = document.currentScript.src
  if (!scriptUrl) {
    var scripts = document.getElementsByTagName("script");
    if (scripts.length) scriptUrl = scripts[scripts.length - 1].src
  }
}
if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
__webpack_require__.p = scriptUrl;

// 已经安装的代码块
var installedChunks = {
  "main": 0 // 0 表示加载成功了 此时非undefined
};

// __webpack_require__.functions.jsonp
__webpack_require__.functions.jsonp = (chunkId, promises) => {
  var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
  console.log('installedChunkData',installedChunkData)
  if (installedChunkData !== 0) {
    if (installedChunkData) { // 没有加载成功 但是正在加载
      promises.push(installedChunkData[2]);
    } else {
      if (true) {
        var promise = new Promise((resolve, reject) =>
          (installedChunkData = installedChunks[chunkId] = [resolve, reject]));
        // installedChunkData=[resolve, reject,promise]
        promises.push(installedChunkData[2] = promise);
        // src_module_js.main.js
        // 构建访问路径
        var url = __webpack_require__.p + __webpack_require__.unionFileName(chunkId);
        var loadingEnded = (event) => {
        };
        __webpack_require__.load(url, loadingEnded, "chunk-" + chunkId, chunkId);
      } else installedChunks[chunkId] = 0;
    }
  }
};

var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
  var [chunkIds, moreModules] = data;
  var moduleId, chunkId, i = 0;
  for (moduleId in moreModules) {
    if (__webpack_require__.o(moreModules, moduleId)) {
      __webpack_require__.modules[moduleId] = moreModules[moduleId];
    }
  }
  for (; i < chunkIds.length; i++) {
    chunkId = chunkIds[i];
    if (__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
      installedChunks[chunkId][0]();
    }
    installedChunks[chunkIds[i]] = 0;
  }
}

var chunkLoadingGlobal = self["webpackChunkmy_webpack"] = self["webpackChunkmy_webpack"] || [];
chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));


var __webpack_exports__ = {};

setTimeout(() => {
  __webpack_require__.ensure("src_module_js")
    .then(__webpack_require__.bind(__webpack_require__, "./src/module.js"))
    .then(res => {
      console.log('res', res)
    })
    __webpack_require__.ensure("src_module_js")
    .then(__webpack_require__.bind(__webpack_require__, "./src/module.js"))
    .then(res => {
      console.log('res222', res)
    })
}, 1000);