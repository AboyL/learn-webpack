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

__webpack_require__.m = __webpack_modules__;

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
  // return Promise.all(Object.keys(__webpack_require__.functions).reduce((promises, key) => {
  //   __webpack_require__.functions[key](chunkId, promises);
  //   return promises;
  // }, []));
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

var inProgress = {};
var dataWebpackPrefix = "my-webpack:";

// load 真正的加载
__webpack_require__.load = (url, done, key, chunkId) => {
  // 处理短时间内重复加载的情况
  if (inProgress[url]) { inProgress[url].push(done); return; }
  var script, needAttach;
  if (key !== undefined) {
    var scripts = document.getElementsByTagName("script");
    for (var i = 0; i < scripts.length; i++) {
      var s = scripts[i];
      if (s.getAttribute("src") == url ||
        s.getAttribute("data-webpack") == dataWebpackPrefix + key) {
        script = s; break;
      }
    }
  }
  if (!script) {
    needAttach = true;
    script = document.createElement('script');
    script.charset = 'utf-8';
    script.timeout = 120;
    if (__webpack_require__.nc) {
      script.setAttribute("nonce", __webpack_require__.nc);
    }
    script.setAttribute("data-webpack", dataWebpackPrefix + key);
    script.src = url;
  }
  inProgress[url] = [done];
  var onScriptComplete = (prev, event) => {
    script.onerror = script.onload = null;
    clearTimeout(timeout);
    var doneFns = inProgress[url];
    delete inProgress[url];
    script.parentNode && script.parentNode.removeChild(script);
    doneFns && doneFns.forEach((fn) => (fn(event)));
    if (prev) return prev(event);
  }
    ;
  var timeout = setTimeout(onScriptComplete.bind(null, undefined,
    { type: 'timeout', target: script }),
    120000);
  script.onerror = onScriptComplete.bind(null, script.onerror);
  script.onload = onScriptComplete.bind(null, script.onload);
  needAttach && document.head.appendChild(script);
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
        var error = new Error();
        var loadingEnded = (event) => {
          if (__webpack_require__.o(installedChunks, chunkId)) {
            installedChunkData = installedChunks[chunkId];
            if (installedChunkData !== 0) installedChunks[chunkId] = undefined;
            if (installedChunkData) {
              var errorType = event && (event.type === 'load' ? 'missing' : event.type);
              var realSrc = event && event.target && event.target.src;
              error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
              error.name = 'ChunkLoadError';
              error.type = errorType;
              error.request = realSrc;
              // 处理加载失败的情况
              installedChunkData[1](error);
            }
          }
        };
        __webpack_require__.load(url, loadingEnded, "chunk-" + chunkId, chunkId);
      } else installedChunks[chunkId] = 0;
    }
  }
};

var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
  var [chunkIds, moreModules, runtime] = data;
  var moduleId, chunkId, i = 0;
  for (moduleId in moreModules) {
    if (__webpack_require__.o(moreModules, moduleId)) {
      __webpack_require__.m[moduleId] = moreModules[moduleId];
    }
  }
  if (runtime) runtime(__webpack_require__);
  if (parentChunkLoadingFunction) parentChunkLoadingFunction(data);
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
}, 1000);