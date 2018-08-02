const webpack = require('webpack')
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const happypackFactory = require('./happypack')

const ROOT_PATH = path.resolve(__dirname, '../')
const GLOBAL_CONFIG = require(`../config/${process.env.ENV}.env.js`)

module.exports = {
  output: {
    filename: '[name].[chunkHash].bundle.js'
  },
  devtool: '#cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.less$/,
        exclude: [ // 除去node_modules和src/styles/common下面的less文件，其他less文件均进行css modules
          path.resolve(ROOT_PATH, 'node_modules'),
          path.resolve(ROOT_PATH, 'src/styles/common')
        ],
        use: [
          MiniCssExtractPlugin.loader,
          'happypack/loader?id=less.production.modules'
        ]
      },
      {
        test: /.less$/,
        include: path.resolve(ROOT_PATH, 'src/styles/common'),
        use: [
          MiniCssExtractPlugin.loader,
          'happypack/loader?id=less.production'
        ]
      },
      {
        test: /\.css$/,
        exclude: [ // 除去node_modules和src/styles/common下面的css文件，其他css文件均进行css modules
          path.resolve(ROOT_PATH, 'node_modules'),
          path.resolve(ROOT_PATH, 'src/styles/common')
        ],
        use: [
          MiniCssExtractPlugin.loader,
          'happypack/loader?id=css.production.modules'
        ]
      },
      {
        test: /\.css$/,
        include: [
          path.resolve(ROOT_PATH, 'node_modules'),
          path.resolve(ROOT_PATH, 'src/styles/common')
        ],
        use: [
          MiniCssExtractPlugin.loader,
          'happypack/loader?id=css.production'
        ]
      }
    ]
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(), // 使用hash作为模块的命名，防止新加入模块后，缓存模块的chunkHash变化，导致缓存失效
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname, '../'),
      exclude: ['dll']
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[chunkHash].css',
      chunkFilename: '[name].[chunkHash].css'
    }),
    new webpack.DefinePlugin(GLOBAL_CONFIG), //向代码里注入配置文件的变量
    happypackFactory('less.production.modules'),
    happypackFactory('less.production'),
    happypackFactory('css.production.modules'),
    happypackFactory('css.production')
  ]
}

