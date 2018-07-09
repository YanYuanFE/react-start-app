## react-start-app

### 基于Ant Design的React脚手架，开箱即用

> A React start project


## 技术栈

*  React
*  Ant Design and Ant Pro
*  dva
*  Webpack 4.x

## 特性
*  :gem: 基于React，Ant Design，dva等企业级后台管理系统最佳实践。
*  :art: 基于Ant Design 和Ant Pro UI组件库，提供后台管理系统常见使用场景。
*  :nail_care: 基于CSS Module的样式解决方案。
*  :airplane: 基于dva动态加载 Model 和路由，按需加载。
*  :rocket: 基于webpack4.x本地调试和构建。
*  :iphone: 响应式设计。


## 开发构建

### 目录结构

```bash
├── /dist/           # 项目输出目录
├── /src/            # 项目源码目录
│ ├── /assets/       # 图片资源
│ ├── /common/       # 公共文件，编译时copy至dist目录
│ │ ├── munu.js      # 侧边栏菜单配置
│ │ └── router.js    # 路由配置
│ ├── /components/   # UI组件
│ ├── /layouts/      # 布局组件
│ ├── /routes/       # 页面组件
│ ├── /models/       # 数据模型
│ ├── /services/     # 数据接口
│ ├── /utils/        # 工具函数
│ │ ├── authority.js # 权限工具函数
│ │ ├── Authorized.js# 权限配置
│ │ ├── utils.js     # 工具函数
│ │ ├── request.js   # 异步请求函数
│ │ └── utils.less   # 工具样式
│ ├── route.js       # 路由入口
│ ├── index.js       # 入口文件
│ ├── themes.js      # 自定义主题样式
│ └── index.html
├── postcss.config.js# postcss配置
├── package.json     # 项目依赖
├── .eslintrc        # ESlint配置
└── .babelrc         # babel配置
```

### 快速开始

克隆项目文件:

```bash
git clone https://github.com/YanYuanFE/react-start-app
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
