// happypack对url-loader和file-loader支持有问题

const fs = require('fs')
const path = require('path')
const Happypack = require('happypack')
const lessToJs = require('less-vars-to-js')
const antdThemeVariables = lessToJs(fs.readFileSync(path.resolve(__dirname, '../src/styles/antd-theme.less'), 'utf8'))
const defaultLoaders = {
  'jsx?': ['babel-loader?cacheDirectory'],
  'jsx?.eslint': ['eslint-loader'],
  'css.development': ['style-loader', 'css-loader', 'postcss-loader'],
  'css.development.modules': [
    'style-loader',
    {
      loader: 'css-loader',
      options: {
        modules: true,
        localIdentName: '[path][name]__[local]--[hash:base64:5]'
      }
    },
    'postcss-loader'
  ],
  'css.production': ['css-loader?minimize', 'postcss-loader'],
  'css.production.modules': [
    {
      loader: 'css-loader',
      options: {
        modules: true,
        localIdentName: '[path][name]__[local]--[hash:base64:5]',
        minimize: true
      }
    },
    'postcss-loader'
  ],
  'less.development.antd': [
    'style-loader',
    'css-loader',
    'postcss-loader',
    {
      loader: 'less-loader',
      options: {
        javascriptEnabled: true,
        modifyVars: antdThemeVariables
      }
    }
  ],
  'less.development': [
    'style-loader',
    'css-loader',
    'postcss-loader',
    {
      loader: 'less-loader',
      options: {
        javascriptEnabled: true
      }
    }
  ],
  'less.development.modules': [
    'style-loader',
    {
      loader: 'css-loader',
      options: {
        modules: true,
        localIdentName: '[path][name]__[local]--[hash:base64:5]'
      }
    },
    'postcss-loader',
    {
      loader: 'less-loader',
      options: {
        javascriptEnabled: true
      }
    }
  ],
  'less.production.antd': [
    'css-loader?minimize',
    'postcss-loader',
    {
      loader: 'less-loader',
      options: {
        javascriptEnabled: true,
        modifyVars: antdThemeVariables
      }
    }
  ],
  'less.production': [
    'css-loader?minimize',
    'postcss-loader',
    {
      loader: 'less-loader',
      options: {
        javascriptEnabled: true
      }
    }
  ],
  'less.production.modules': [
    {
      loader: 'css-loader',
      options: {
        modules: true,
        localIdentName: '[path][name]__[local]--[hash:base64:5]',
        minimize: true
      }
    },
    'postcss-loader',
    {
      loader: 'less-loader',
      options: {
        javascriptEnabled: true
      }
    }
  ]
}

/**
 * happypack工厂函数
 * @param  {String} id 唯一标识    
 * @param  {Object} options happypack配置项
 * @param  {Array} loaderQuery loader的query数组
 * @return {Object} happypack实例   
 */
const happypackFactory = (id = '', options = {}) => {
  if (!options.loaders || !options.loaders.length) {
    options.loaders = defaultLoaders[id]
  }
  
  return new Happypack({
    id,
    threads: 4,
    ...options
  })
}

module.exports = happypackFactory