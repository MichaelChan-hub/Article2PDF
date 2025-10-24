# Article2PDF

一个现代化的书籍创作和管理平台，使用 Next.js 14 构建。

## 功能特性

- 📚 创建和管理书籍
- 🎨 多种书籍模板
- 📖 个人书库管理
- ⚙️ 个性化设置
- 🌙 深色模式支持
- 📱 响应式设计
- 🌍 中英文国际化支持

## 技术栈

- **框架**: Next.js 14
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **字体**: Inter (Google Fonts)

## 开始使用

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看应用。

### 构建生产版本

```bash
npm run build
```

### 启动生产服务器

```bash
npm start
```

## 项目结构

```
Article2PDF/
├── app/                    # App Router 目录
│   ├── components/         # 组件目录
│   ├── contexts/           # Context 目录
│   ├── globals.css        # 全局样式
│   ├── layout.tsx         # 根布局组件
│   └── page.tsx           # 首页
├── public/                # 静态资源
├── next.config.js         # Next.js 配置
├── tailwind.config.js     # Tailwind CSS 配置
├── tsconfig.json          # TypeScript 配置
└── package.json           # 项目依赖
```

## 开发指南

1. 使用 TypeScript 进行类型安全开发
2. 遵循 Next.js 13+ App Router 规范
3. 使用 Tailwind CSS 进行样式设计
4. 保持代码整洁和可维护性

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT License
