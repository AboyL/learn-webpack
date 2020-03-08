
### 如何进行一个loader的编写

#### 需求
编写一个loader 将 js文件中的 **李行知** *转成* **行知李** 或者其他的自己传入的参数

#### 编写
1. 创建loaders/xx.js
2. loader的本质就是一个函数 module.exports= function 注意不能使用箭头函数 必须使用声明式函数
因为会使用this指向 会导致this指向有问题
3. 函数接受一个参数 source 这个参数就是引入的源代码
4. reture 返回的转化后的 源代码
5. 在config文件中对需要的文件进行loader配置
6. 可以使用**this.query** 接受到loader配置的时候传递的**参数** 这部分的内容可以在webpack的官网进行查看 **API** 部分
7. webpack提供了loaders-utils 帮助我们快速的进行this处理
8. 假如希望传递例如sourceMap等其他信息出去，可以使用this.callback代替return
9. 假如 loader 中存在**异步操作** 需要使用 this.async 进行处理
10. 我们可以配置 **resolveLoader** 来统一处理loader的目录，这样就可以避免每次都要写很长的路径了

### 总结
这也符合我们对webpack的理解 loader 作用其实就是进行了代码的转化
在webpack的官网上有这样一句话 可以很好的进行总结

```js
所谓 loader 只是一个导出为函数的 JavaScript 模块。loader runner 会调用这个函数，然后把上一个 loader 产生的结果或者资源文件(resource file)传入进去。函数的 this 上下文将由 webpack 填充，并且 loader runner 具有一些有用方法，可以使 loader 改变为异步调用方式，或者获取 query 参数。

第一个 loader 的传入参数只有一个：资源文件(resource file)的内容。compiler 需要得到最后一个 loader 产生的处理结果。这个处理结果应该是 String 或者 Buffer（被转换为一个 string），代表了模块的 JavaScript 源码。另外还可以传递一个可选的 SourceMap 结果（格式为 JSON 对象）。

如果是单个处理结果，可以在同步模式中直接返回。如果有多个处理结果，则必须调用 this.callback()。在异步模式中，必须调用 this.async()，来指示 loader runner 等待异步结果，它会返回 this.callback() 回调函数，随后 loader 必须返回 undefined 并且调用该回调函数。
```

### 实际运用场景
对一些内容的处理
可以结合AST进行错误监控等等
国际化
假如源代码需要进行一些包装 就可以使用loader进行处理


