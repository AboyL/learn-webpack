

class EmitPlugin {
    apply (compiler) {
        //注册run这个钩子
        compiler.hooks.emit.tap('RunPlugin', () => {
            compiler.assets['README.md'] = '请先读我';
        });
    }
}

module.exports = EmitPlugin;