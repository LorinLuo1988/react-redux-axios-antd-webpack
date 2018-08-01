const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const fs = require('fs')
const utils = require('./utils')
const happypackFactory = require('./happypack')

const NODE_ENV = process.env.NODE_ENV
const ROOT_PATH = path.resolve(__dirname, '../')
const SRC_PATH = path.resolve(ROOT_PATH, 'src')
const DEV_API_ROOT_PATH = path.resolve(ROOT_PATH, 'config/dev-api-root.js')

const devApiRootFileExist = utils.fsExistsSync(DEV_API_ROOT_PATH)

// 如果沒有dev-api-root.js，则新建该文件
if (!devApiRootFileExist) {
  const devApiRootContent = `const DEV_API_ROOT = 'http://127.0.0.1:8080'\n\nmodule.exports = DEV_API_ROOT`
  fs.writeFileSync(DEV_API_ROOT_PATH, devApiRootContent, {encoding:'utf-8'})
}

const webpackNodeEnvConfig = require(`./webpack.${NODE_ENV === 'development' ? 'dev' : 'prod'}.config.js`)
const bundleConfig = require(`../dist/dll/${NODE_ENV}/bundle-config.json`)

const plugins = [
  new webpack.DllReferencePlugin({
    manifest: path.resolve(ROOT_PATH, `dist/dll/${NODE_ENV}/vendor-manifest.json`)
  }),
  new webpack.DllReferencePlugin({
    manifest: path.resolve(ROOT_PATH, `dist/dll/${NODE_ENV}/moment-manifest.json`)
  }),
  new webpack.DllReferencePlugin({
    manifest: path.resolve(ROOT_PATH, `dist/dll/${NODE_ENV}/antd-manifest.json`)
  }),
  new webpack.DllReferencePlugin({
    manifest: path.resolve(ROOT_PATH, `dist/dll/${NODE_ENV}/react-manifest.json`)
  }),
  new webpack.DllReferencePlugin({
    manifest: path.resolve(ROOT_PATH, `dist/dll/${NODE_ENV}/redux-manifest.json`)
  }),
	new HtmlWebpackPlugin({
		favicon: path.resolve(SRC_PATH, 'favicon.ico'),
    template: path.resolve(SRC_PATH, 'index.html'),
    chunks: ['index'],
    vendorBundleName: `${NODE_ENV}/${bundleConfig.vendor.js}`, // 把带hash的dll js插入到html中
    momentBundleName: `${NODE_ENV}/${bundleConfig.moment.js}`, // 把带hash的dll js插入到html中
    antdBundleName: `${NODE_ENV}/${bundleConfig.antd.js}`, // 把带hash的dll js插入到html中
    reactBundleName: `${NODE_ENV}/${bundleConfig.react.js}`, // 把带hash的dll js插入到html中
    reduxBundleName: `${NODE_ENV}/${bundleConfig.redux.js}`, // 把带hash的dll js插入到html中
    devWebpackBundleName: `${NODE_ENV}/${bundleConfig.devWebpack ? bundleConfig.devWebpack.js : ''}`, // 把带hash的dll js插入到html中
    antdCssName: `${NODE_ENV}/${bundleConfig.antd.css}`, // 把带hash的dll css插入到html中
    vendorCssName: `${NODE_ENV}/${bundleConfig.vendor.css}` // 把带hash的dll css插入到html中
	}),
  happypackFactory('jsx?.eslint'),
  happypackFactory('jsx?')
]

// 是否要启动bundle分析
if (process.env.npm_config_analyzer) {
  plugins.push(new BundleAnalyzerPlugin())
}

let commonConfig = {
	entry: {
		index: ['babel-polyfill', path.resolve(SRC_PATH, 'index.jsx')]
	},
	output: {
		path: path.resolve(ROOT_PATH, 'dist'),
    chunkFilename: '[name].[chunkHash].bundle.js',
		publicPath: '/'
	},
	module: {
		rules: [
			{
				enforce: 'pre', //防止eslint在代码检查前，代码被其他loader修改
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: 'happypack/loader?id=jsx?.eslint'
			},
      {
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: 'happypack/loader?id=jsx?'
      },
			{
				test: /\.(png|jpe?g|gif|ico)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 8192, // 将小于8192byte的图片转换成base64编码
          name: '[name].[ext]?[hash]'
        }
			},
			{
				test: /\.(woff|svg|eot|ttf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 8192, // 将小于8192byte的字体转换成base64编码
        }
			}
		]
	},
	plugins,
	resolve: {
    extensions: ['.js', '.jsx', '.less', '.css', '.json'],
		alias: {
			'@': SRC_PATH,
			'@root': ROOT_PATH,
			'@components': path.resolve(SRC_PATH, 'components'),
			'@containers': path.resolve(SRC_PATH, 'containers'),
			'@services': path.resolve(SRC_PATH, 'services'),
			'@constants': path.resolve(SRC_PATH, 'constants'),
			'@utils': path.resolve(SRC_PATH, 'utils'),
			'@styles': path.resolve(SRC_PATH, 'styles'),
			'@imgs': path.resolve(SRC_PATH, 'imgs'),
      '@redux': path.resolve(SRC_PATH, 'redux'),
      '@config': path.resolve(SRC_PATH, 'config'),
      '@decorator': path.resolve(SRC_PATH, 'decorator')
		}
	}
}

module.exports = webpackMerge(
	commonConfig,
	webpackNodeEnvConfig
)