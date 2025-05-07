# 博客项目

这是一个使用Nuxt.js 3框架构建的现代化博客项目。

## 项目结构

```
博客项目（Nuxt.js框架）
│
├── .idea/                 - WebStorm IDE配置目录
├── .nuxt/                 - Nuxt.js构建输出目录
├── node_modules/          - npm包依赖目录
├── public/                - 静态资源目录
│   ├── favicon.ico        - 网站图标
│   └── robots.txt         - 搜索引擎爬虫规则文件
├── server/                - 服务器端代码目录
│   └── tsconfig.json      - 服务器TypeScript配置
├── app.vue                - 应用程序入口Vue组件
├── nuxt.config.ts         - Nuxt.js配置文件
├── package.json           - 项目依赖和脚本配置
├── package-lock.json      - npm包版本锁定文件
├── README.md              - 项目说明文档
├── tsconfig.json          - 项目TypeScript配置
├── .cursorrules           - Cursor编辑器配置
└── .gitignore             - Git忽略文件配置
```

## 技术栈

- 前端框架：Nuxt.js 3
- 语言：TypeScript, JavaScript
- UI框架：Vue.js 3
- 路由：Vue Router 4

## 开发环境设置

### 前提条件

- Node.js (推荐 v18+)
- npm 或 yarn

### 安装步骤

1. 克隆仓库
```bash
git clone <仓库URL>
cd blog
```

2. 安装依赖
```bash
npm install
# 或
yarn install
```

3. 启动开发服务器
```bash
npm run dev
# 或
yarn dev
```

应用将在 `http://localhost:3000` 运行

## 构建和部署

### 构建生产版本
```bash
npm run build
# 或
yarn build
```

### 预览生产版本
```bash
npm run preview
# 或
yarn preview
```

### 生成静态网站
```bash
npm run generate
# 或
yarn generate
```

## 特性

- 响应式设计
- 基于Vue 3的组件系统
- SSR (服务器端渲染)
- 静态站点生成能力
- TypeScript支持

## 许可证

[MIT](LICENSE)
