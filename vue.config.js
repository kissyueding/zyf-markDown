module.exports = {
  publicPath: './',
  assetsDir: 'static',
  css: { extract: false }, // 强制内联（引用插件的时候就不用再引用css文件了，去掉可以看看效果）
  pages: {
      index: {
        entry: 'examples/main.js',
        template: 'public/index.html',
        filename: 'index.html'
      }
    },
    chainWebpack: config => {
      config.module
        .rule('js')
        .include
          .add('/packages')
          .end()
        .use('babel')
          .loader('babel-loader')
          .tap(options => {
            return options
          })
  }
}