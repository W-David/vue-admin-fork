const path = require('path')
const webpack = require('webpack')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const HappyPack = require('happypack')
const os = require('os')

module.exports = {
  chainWebpack: config => {
    // 设置别名
    config.resolve.alias
      .set('@', path.resolve(__dirname, 'src'))
      .set('assets', path.resolve(__dirname, 'src/assets'))
      .set('components', path.resolve(__dirname, 'src/components'))
      .set('views', path.resolve(__dirname, 'src/views'))

    // SVG Loader
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule.exclude.add(/node_modules/)
    svgRule.include.add(path.resolve(__dirname, 'src/icons'))
    svgRule
      .test(/\.(svg)(\?.*)?$/)
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')

    // 图片压缩
    config.module
      .rule('images')
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({
        bypassOnDebug: true,
        disable: process.env.NODE_ENV !== 'production'
      })

    // HTML 压缩
    config.plugin('html').tap(args => {
      args[0].minify = {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        minifyCSS: true,
        minifyJS: true,
        ignoreCustomFragments: [/<%[\s\S]*?%>/, /<\?[\s\S]*?\?>/g]
      }
      return args
    })

    // 预加载模块
    config.plugin('preload').tap(options => {
      options[0].include = 'initial'
      return options
    })

    // 删除 moment 的 locale 文件，优化打包大小
    config.plugin('ignore').use(new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn/))

    // 取消多余的 CSS 提取
    ;['vue-modules', 'vue', 'normal-modules', 'normal'].forEach(match => {
      config.optimization.splitChunks({
        cacheGroups: {
          [match]: {
            name: module => {
              const moduleName = module
                .identifier()
                .split('/')
                .reduceRight(item => item)
              return `${match}-${moduleName}`
            },
            test: new RegExp(`[\\\\/]node_modules[\\\\/]${match}[\\\\/]`),
            priority: -10,
            chunks: 'all'
          }
        }
      })
    })

    // 启用 cache-loader 优化构建速度
    config.module
      .rule('js')
      .exclude.add(/node_modules/)
      .end()
      .use('cache-loader')
      .loader('cache-loader')
      .options({
        cacheDirectory: path.resolve(__dirname, '.cache')
      })
      .end()
      .use('happypack/loader?id=js')
      .loader('happypack/loader?id=js')
      .end()

    config.module
      .rule('css')
      .oneOf('vue')
      .use('cache-loader')
      .loader('cache-loader')
      .options({
        cacheDirectory: path.resolve(__dirname, '.cache')
      })
      .end()
      .use('happypack/loader?id=css')
      .loader('happypack/loader?id=css')
      .end()

    // 启用 hard-source-webpack-plugin 优化二次构建速度
    config.plugin('hard-source-webpack-plugin').use(HardSourceWebpackPlugin)

    // 使用 Happypack 并行处理任务
    const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })
    config.plugin('happypack-js').use(HappyPack, [
      {
        id: 'js',
        threadPool: happyThreadPool,
        loaders: ['babel-loader?cacheDirectory'],
        verbose: true
      }
    ])
    config.plugin('happypack-css').use(HappyPack, [
      {
        id: 'css',
        threadPool: happyThreadPool,
        loaders: ['css-loader', 'postcss-loader']
      }
    ])

    // 使用 DllPlugin 和 DllReferencePlugin 进行预编译
    const dllPath = path.join(__dirname, './public/vendor')
    config.plugin('dllPlugin').use(webpack.DllPlugin, {
      name: '[name]',
      path: path.join(dllPath, '[name].json')
    })
    config.plugin('dllReferencePlugin').use(webpack.DllReferencePlugin, {
      manifest: require(path.join(dllPath, 'vue-manifest.json'))
    })

    // 使用 Scope Hoisting 剔除无用代码
    config.optimization.set('concatenateModules', true)
    config.optimization.set('flagIncludedChunks', true)
    config.optimization.set('occurrenceOrder', true)
    config.optimization.set('providedExports', true)
    config.optimization.set('usedExports', true)
    config.optimization.set('sideEffects', true)
    config.optimization.runtimeChunk({ name: 'manifest' })
  },

  // 开启 CSS source maps
  css: {
    sourceMap: true
  },

  // 配置 webpack-dev-server 行为。
  devServer: {
    open: process.platform === 'darwin',
    host: '0.0.0.0',
    port: 8080,
    https: false,
    hotOnly: false,
    proxy: {
      '/api': {
        target: '<url>',
        ws: true,
        changeOrigin: true
      }
    }
  }
}
