const path = require('path')
const webpack = require('webpack')
const AssetsPlugin = require('assets-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const happypackFactory = require('./happypack')

const ROOT_PATH = path.resolve(__dirname, '../')
const NODE_ENV = process.env.NODE_ENV

const entry = {
  vendor: [
    'axios',
    'babel-polyfill',
    'nprogress',
    'nprogress/nprogress.css',
    'history',
    'viewerjs',
    'viewerjs/dist/viewer.min.css'
  ],
  react: [
    'react',
    // 'react-dom', // antd依赖了react-dom，重复打包会出问题
    'react-router',
    'prop-types',
    'react-router-dom',
    'react-loadable',
    'react-dnd',
    'react-dnd-html5-backend',
    'react-redux'
  ],
  redux: ['redux', 'redux-saga'],
  moment: ['moment', 'moment/locale/zh-cn'],
  antd: ['antd', 'antd/lib/locale-provider/zh_CN', 'antd-css']
}

const plugins = [
  new webpack.HashedModuleIdsPlugin(), // 使用hash作为模块的命名，防止新加入模块后，缓存模块的chunkHash变化，导致缓存失效
  new CleanWebpackPlugin([
    `dist/dll/${NODE_ENV}`
  ], {
    root: path.resolve(__dirname, '../')
  }),
  new webpack.DllPlugin({
    path: path.join(__dirname, `../dist/dll/${NODE_ENV}`, '[name]-manifest.json'),
    name: '[name]_[chunkHash]_Library' // dll bundle 输出到哪个全局变量上, 和 output.library 一样即可。
  }),
  // 把带hash的dll插入到html中
  new AssetsPlugin({
    filename: 'bundle-config.json', 
    path: path.join(__dirname, `../dist/dll/${NODE_ENV}`)
  }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(NODE_ENV)
    }
  }),
  happypackFactory('jsx?')
]

const rules = [
  {
    test: /\.jsx?$/,
    use: 'happypack/loader?id=jsx?'
  },
  {
    test: /\.(png|jpe?g|gif)(\?.*)?$/,
    loader: 'url-loader',
    options: {
      limit: 8192, // 将小于8192byte的图片转换成base64编码
      name: '[name].[ext]?[hash]'
    }
  },
  {
    test: /\.(woff|svg|eot|ttf|ico)(\?.*)?$/,
    loader: 'url-loader',
    options: {
      limit: 8192 // 将小于8192byte的字体转换成base64编码
    }
  }
]


// 是否要启动bundle分析
if (process.env.npm_config_analyzer) {
  plugins.push(new BundleAnalyzerPlugin())
}

if (NODE_ENV === 'production') {
  rules.push(
    {
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
        'happypack/loader?id=css.production' 
      ]
    },
    {
      test: /\.less$/,
      include: path.resolve(ROOT_PATH, 'node_modules/antd'),
      use: [
        MiniCssExtractPlugin.loader,
        'happypack/loader?id=less.production.antd'
      ]
    }
  )
  plugins.push(
    happypackFactory('css.production'),
    happypackFactory('less.production.antd'),
    new MiniCssExtractPlugin({
      filename: '[name].[chunkHash].css',
      chunkFilename: '[name].[chunkHash].css'
    })
  )
} else {
  rules.push(
    {
      test: /\.css$/,
      use: 'happypack/loader?id=css.development'
    },
    {
      test: /\.less$/,
      include: path.resolve(ROOT_PATH, 'node_modules/antd'),
      use: 'happypack/loader?id=less.development.antd'
    }
  )
  plugins.push(
    happypackFactory('css.development'),
    happypackFactory('less.development.antd')
  )
  entry.devWebpack = [
    'sockjs-client/dist/sockjs.js',
    'html-entities',
    'url',
    'punycode',
    'events',
    'lodash',
    'error-stack-parser',
    'querystring-es3',
    'loglevel',
    'stackframe',
    'ansi-html'
  ]
}

module.exports = {
  entry,
  output: {
    path: path.join(__dirname, `../dist/dll/${NODE_ENV}`),
    filename: 'dll.[name].[chunkHash].js',
    library: '[name]_[chunkHash]_Library' // 将会定义为 window.${output.library}
  },
  plugins,
  resolve: {
    alias: {
      'antd-css': 'antd/dist/antd.less'
    }
  },
  module: {
    rules
  }
}
