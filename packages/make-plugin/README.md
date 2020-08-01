### 如何编写插件

### 插件的作用
在打包的某个时段 执行某些动作 例如
在打包前 对dist目录进行清除
在打包之后 生成html文件 并且进行注入

可以说 plugin跟loader 就是webpack的灵魂

### 如何编写
事件驱动
目标:
- 在**打包完成**后 在dist目录下生成一个版权相关的文件

1. loader是一个函数 而plugin是一个类
2. 编写apply函数 它接受一个compiler对象，其为一个webpack实例
3. compiler存在一些hooks 将会在打包的过程中进行执行 例如vue的生命周期
4. emit 将打包的文件放到目标文件夹的时刻 为一个异步的钩子 执行**tapAsync**方法 接受**compilation**以及cb参数
    这个cb函数一定要进行执行
5. 通过compilation参数进行处理 例如额外生成文件等

### 总结
所谓插件 就是在打包的某些过程中执行了某些操作
可以与生命周期中做的事情进行对应

 