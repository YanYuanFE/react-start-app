## react-start-app

### 基于 Ant Design 的 React 脚手架，开箱即用

> A React start project


## 技术栈

*  React16
*  Ant Design and Ant Pro
*  dva
*  Webpack 4.x

## 特性
*  :gem: 基于 React，Ant Design，dva 等企业级后台管理系统最佳实践。
*  :art: 基于 Ant Design 设计语言和 Ant Pro UI 组件库，提供后台管理系统常见使用场景。
*  :nail_care: 基于 CSS Module 的样式解决方案。
*  :airplane: 基于 dva 动态加载 Model 和路由，按需加载。
*  :rocket: 基于 webpack4.x 本地调试和构建。
*  :iphone: 响应式设计。
*  :triangular_ruler: Eslint && husky 统一代码规范。

## 开发构建

### 目录结构

```bash
├── /dist/           # 项目输出目录
├── /src/            # 项目源码目录
│ ├── /assets/       # 图片资源
│ ├── /common/       # 公共配置文件，菜单、路由
│ │ ├── munu.js      # 侧边栏菜单配置
│ │ └── router.js    # 路由配置
│ ├── /components/   # UI组件
│ ├── /layouts/      # 布局组件
│ ├── /routes/       # 页面组件
│ ├── /models/       # 数据模型
│ ├── /services/     # 数据接口
│ ├── /utils/        # 工具函数
│ │ ├── authority.js # 权限工具函数
│ │ ├── Authorized.js # 权限配置
│ │ ├── utils.js     # 工具函数
│ │ ├── request.js   # 异步请求函数
│ │ └── utils.less   # 工具样式
│ ├── route.js       # 路由入口
│ ├── index.js       # 入口文件
│ ├── themes.js      # 自定义antd主题变量
│ └── index.html
├── postcss.config.js # postcss配置
├── package.json     # 项目依赖
├── .eslintrc        # ESlint配置
└── .babelrc         # babel配置
```

### 快速开始

克隆项目文件:

```bash
git clone https://github.com/YanYuanFE/react-start-app
```
推荐使用[react-start-cli](https://github.com/YanYuanFE/react-start-cli)初始化项目：

```bash
npm install react-start-cli -g

react-start-cli init [projectName]
```


进入目录安装依赖:

```bash
#国内用户推荐yarn或者cnpm
npm i 或者 yarn install
```

开发：

```bash
npm start
```

构建：

```bash
npm run build
```
