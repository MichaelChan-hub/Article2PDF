# Make Your Book - Next.js 学习项目

一个现代化的书籍创作和管理平台，使用 Next.js 14 构建。

> 🎓 **本项目是学习 Next.js 的优秀起点！** 包含详细的中文注释和学习文档。

## 功能特性

- 📚 **Next.js 学习示例** - 包含详细的中文注释
- 🎨 **App Router** - 演示 Next.js 13+ 的新路由系统
- 📖 **Server & Client Components** - 学习组件渲染模式
- ⚙️ **React Context** - 状态管理实战示例
- 🌙 **深色模式支持** - Tailwind CSS 样式
- 📱 **响应式设计** - 移动端友好
- 🌍 **国际化** - 中英文双语支持

## 📚 学习资源

本项目包含完整的 Next.js 学习材料：

1. **`NEXTJS学习指南.md`** - 详细的学习文档，涵盖：
   - Next.js 核心概念
   - Server vs Client Components
   - App Router 详解
   - React Context 状态管理
   - 国际化实现
   - Tailwind CSS 使用

2. **`QUICKSTART.md`** - 快速入门指南：
   - 核心概念速查表
   - 常用命令
   - 代码示例
   - 常见问题解答

3. **代码注释** - 所有代码文件都包含详细的中文注释，解释：
   - 文件的作用
   - 关键代码的含义
   - 为什么这样写
   - 如何使用

## 🎯 学习路径

1. **启动项目**：`npm run dev`
2. **阅读文档**：查看 `NEXTJS学习指南.md` 和 `QUICKSTART.md`
3. **查看代码**：阅读带注释的代码文件
4. **运行示例**：
   - 访问 `/` - 查看首页 (Client Component)
   - 访问 `/about` - 查看关于页面 (Server Component)
   - 访问 `/api-demo` - 查看 API 调用示例
5. **实践**：尝试修改代码，创建自己的页面

## 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript 5
- **样式**: Tailwind CSS 3
- **字体**: Inter (Google Fonts)
- **运行时**: Node.js 18+

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看应用。

### 其他命令

```bash
npm run build    # 构建生产版本
npm run start    # 启动生产服务器
npm run lint     # 运行代码检查
```

## 📖 学习内容

本项目详细演示了以下 Next.js 概念：

### 1. App Router 路由
- `app/layout.tsx` - 根布局（Server Component）
- `app/page.tsx` - 首页路由 `/`
- `app/about/page.tsx` - 关于页面 `/about`
- `app/api-demo/page.tsx` - API 演示页面

### 2. Server vs Client Components
- **Server Component** (`layout.tsx`): 服务器端渲染，SEO 友好
- **Client Component** (`page.tsx`): 客户端交互，使用 React Hooks

### 3. API 路由
- `app/api/hello/route.ts` - 创建 RESTful API
- 支持 GET、POST、PUT、DELETE 等方法

### 4. 状态管理
- React Context API 实现全局状态
- 语言切换功能示例

### 5. 国际化 (i18n)
- 双语支持（中文/英文）
- localStorage 持久化

## 📁 项目结构

```
makeyourbook/
├── app/                          # Next.js App Router
│   ├── api/                      # API 路由目录
│   │   └── hello/
│   │       └── route.ts         # API 路由示例
│   ├── components/               # 可复用组件
│   │   └── LanguageToggle.tsx   # 语言切换按钮
│   ├── contexts/                 # React Context
│   │   └── LanguageContext.tsx  # 语言 Context
│   ├── about/
│   │   └── page.tsx             # /about 路由
│   ├── api-demo/
│   │   └── page.tsx             # /api-demo 路由
│   ├── globals.css              # 全局样式
│   ├── layout.tsx               # 根布局
│   └── page.tsx                 # 首页 (/)
├── NEXTJS学习指南.md            # 📚 详细学习文档
├── QUICKSTART.md                # ⚡ 快速入门指南
├── README.md                     # 项目说明（本文件）
├── next.config.js                # Next.js 配置
├── tailwind.config.js            # Tailwind CSS 配置
├── tsconfig.json                 # TypeScript 配置
└── package.json                   # 项目依赖
```

## 🎓 学习建议

1. **阅读文档**：从 `QUICKSTART.md` 开始，了解基础概念
2. **查看代码**：打开 `app/` 目录下的文件，阅读中文注释
3. **运行示例**：访问不同页面，观察页面行为
4. **修改实验**：尝试修改代码，看看会发生什么
5. **深入学习**：阅读 `NEXTJS学习指南.md` 获取详细信息
6. **创建页面**：尝试创建自己的页面和组件

## 💡 关键概念

### Server Components (默认)
- 在服务器上渲染
- 更小的 JavaScript 包
- 可以访问数据库、文件系统
- 不能使用 `useState`、`useEffect`

### Client Components
- 需要添加 `'use client'`
- 在浏览器中运行
- 可以使用 React Hooks
- 可以使用浏览器 API

### App Router
- 基于文件系统的路由
- `page.tsx` = 页面
- `layout.tsx` = 布局
- 自动支持嵌套布局

## 🌟 下一步

1. 阅读 `NEXTJS学习指南.md` 了解详细信息
2. 查看 `QUICKSTART.md` 获取快速参考
3. 修改代码，创建自己的页面
4. 尝试添加更多功能

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT License
