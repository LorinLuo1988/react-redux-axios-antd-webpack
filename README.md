# react-redux-axios-antd-webpack
react+redux+axios+antd+webpack

## 技术栈

### ract+react-router+redux+redux-saga+antd+mock+axios+es6+less

## Run
### 参数
1. --PORT: wepack-dev-server端口号

2. --MOCK_PORT: mock代理服务器端口号

3. --analyzer: 启动bundle分析

### Development
1. npm run dll:dev(只在第一次或者第三方包有更新时才用运行，第三方包参考/build/webpack.dll.config.js)
2. npm run dev

### Mock Development
1. npm run dll:dev(只在第一次或者第三方包有更新时才用运行，第三方包参考/build/webpack.dll.config.js)

2. npm run dev:mock

3. 启动mock服务器 npm run server:mock

4. 添加mock数据，请在mock/mock-data文件夹下，按照路由层级添加mock文件

### Test(Build)
1. npm run dll:prod(只在第一次或者第三方包有更新时才用运行，第三方包参考/build/webpack.dll.config.js)

2. npm run test

### Production(Build)
1. npm run dll:prod(只在第一次或者第三方包有更新时才用运行，第三方包参考/build/webpack.dll.config.js)
2. npm run build

### Local Server
npm run server

## 样式处理
### 除了/src/styles/common文件下下面的样式文件，其他样式文件均进行了  css modules处理
### /src/styles/antd-theme.less文件为覆盖antd样式的文件，修改该文件后，需要重新启动项目才能生效

## components
### 1. component统一放到/src/components文件夹
### 2. 公共的component放到/src/components/common文件夹下面
### 3. 页面级别的componnet单独在/src/componnets文件夹下面新建页面文件夹
### 4. 公用componnet涉及样式的，建议将Compnent写成文件夹， 将样式与视图放在一起， 并且使用css modules进行样式引入，便于其他项目复用

## 路由跳转(已经将history实例注入到全局window.$history)
### 1. 组件里面用法Link组件进行跳转
### 2. 路由级组件可以使用this.props.history.push(path)进行跳转
### 3. 非路由级组件可以通过withRouter(Component)对组件进行包，然后this.props.history.push(path)进行跳转；也可以使用全局的window.$history.push(path)进行跳转
### 4. 非组件js代码通过window.$history.push(path)进行跳转

## redux
### 将reducer action saga内聚
