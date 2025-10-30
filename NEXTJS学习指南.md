# Next.js 学习指南

通过本项目（Make Your Book）学习 Next.js 核心概念

## 目录
1. [项目结构](#项目结构)
2. [Next.js 核心概念](#nextjs-核心概念)
3. [App Router (App目录路由)](#app-router)
4. [Server Components vs Client Components](#server-components-vs-client-components)
5. [布局和路由](#布局和路由)
6. [客户端状态管理](#客户端状态管理)
7. [国际化实现](#国际化实现)
8. [Tailwind CSS 样式](#tailwind-css-样式)

---

## 项目结构

```
makeyourbook/
├── app/                      # Next.js App Router
│   ├── components/          # 可复用组件
│   │   └── LanguageToggle.tsx
│   ├── contexts/            # React 上下文
│   │   └── LanguageContext.tsx
│   ├── globals.css          # 全局样式
│   ├── layout.tsx           # 根布局
│   └── page.tsx             # 主页
├── package.json             # 项目依赖
└── tailwind.config.js       # Tailwind 配置
```

---

## Next.js 核心概念

### 1. 什么是 Next.js？

Next.js 是构建在 React 之上的全栈框架，提供：
- **服务端渲染 (SSR)**: 在服务器上渲染页面
- **静态站点生成 (SSG)**: 在构建时生成静态页面
- **API 路由**: 创建后端 API
- **文件系统路由**: 基于文件结构自动创建路由
- **自动代码分割**: 优化性能
- **TypeScript 支持**: 开箱即用的类型安全

### 2. 关键特性

**App Router (Next.js 13+)**
- 新的路由系统，使用 `app/` 目录
- 支持嵌套布局和并行路由
- 默认是 Server Components（服务器组件）

**之前的 Pages Router**
- 使用 `pages/` 目录
- 基于文件的路由系统

**本项目使用 App Router**

---

## App Router

### 核心文件说明

#### `app/layout.tsx` - 根布局
```tsx
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}  {/* 所有页面都会被包裹在这里 */}
      </body>
    </html>
  )
}
```

**作用**：
- 每个 Next.js App 必须有根布局
- 必须包含 `<html>` 和 `<body>` 标签
- 整个应用都会被包裹在这个布局中

#### `app/page.tsx` - 主页
```tsx
export default function Home() {
  return <div>Home Page</div>
}
```

**作用**：
- 对应 `/` 路由
- Next.js 会自动将 `page.tsx` 作为可访问的路由

### 路由规则

```
app/
├── page.tsx           → / (首页)
├── about/
│   └── page.tsx       → /about
└── blog/
    ├── page.tsx       → /blog (博客列表)
    └── [id]/
        └── page.tsx   → /blog/:id (动态路由)
```

---

## Server Components vs Client Components

这是 Next.js 13+ 的重要概念！

### Server Components（服务器组件）

**特点**：
- 在服务器上渲染
- 可以直接访问数据库、文件系统等
- 不能使用 `useState`, `useEffect` 等钩子
- 不能使用浏览器 API
- 默认情况

**优点**：
- 减少客户端 JavaScript 包大小
- 更好的性能
- 安全的 API 调用（不会暴露给客户端）

### Client Components（客户端组件）

**特点**：
- 在客户端运行
- 可以使用 React Hooks
- 可以使用浏览器 API
- 必须添加 `'use client'` 指令

**何时使用**：
- 需要交互性（按钮点击、表单等）
- 需要使用 `useState`, `useEffect`
- 需要使用浏览器 API（localStorage、window 等）

### 本项目中的例子

**`app/page.tsx`** - Client Component（需要 useState）
```tsx
'use client'  // ← 这行表示这是客户端组件

import { useLanguage } from './contexts/LanguageContext'
```

**`app/layout.tsx`** - Server Component（默认）
```tsx
// 没有 'use client'，所以是服务器组件
export default function RootLayout({ children }) {
  return <html>...</html>
}
```

---

## 布局和路由

### Layout 嵌套

在 `app/` 目录中：
```
app/
├── layout.tsx              # 根布局
├── page.tsx                # 首页
└── blog/
    ├── layout.tsx          # blog 的布局
    │                        # 会嵌套在根布局中
    └── page.tsx
```

**如何嵌套**：
```
RootLayout
└── BlogLayout
    └── BlogPage
```

### Metadata（元数据）

在 `layout.tsx` 或 `page.tsx` 中导出：

```tsx
export const metadata: Metadata = {
  title: 'Make Your Book',
  description: 'Create and manage your books with ease',
}
```

Next.js 会自动添加到 `<head>` 中。

---

## 客户端状态管理

### Context API

本项目使用 React Context 管理语言切换。

**`app/contexts/LanguageContext.tsx`**：
```tsx
'use client'

// 1. 创建 Context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// 2. 创建 Provider 组件
export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState<Language>('en')
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

// 3. 创建自定义 Hook
export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
```

**使用方式**（在 `app/page.tsx` 中）：
```tsx
const { t } = useLanguage()  // 使用自定义 Hook
```

---

## 国际化实现

### 实现步骤

1. **创建 Context** 管理语言状态
2. **存储翻译文本**
3. **在根布局包裹 Provider**
4. **在组件中使用翻译函数**

### 代码示例

```tsx
// 翻译字典
const translations = {
  en: { 'hello': 'Hello' },
  zh: { 'hello': '你好' }
}

// 翻译函数
const t = (key: string) => {
  return translations[language][key]
}

// 使用
<h1>{t('hello')}</h1>
```

### localStorage 持久化

```tsx
useEffect(() => {
  // 加载保存的语言
  const saved = localStorage.getItem('language')
  if (saved) setLanguage(saved)
}, [])

useEffect(() => {
  // 保存语言变化
  localStorage.setItem('language', language)
}, [language])
```

---

## Tailwind CSS 样式

### 什么是 Tailwind CSS？

实用优先的 CSS 框架，通过类名快速应用样式。

### 基础用法

```tsx
<div className="flex min-h-screen items-center">  // flex 布局
  <h1 className="text-6xl font-bold">              // 字体大小和粗细
    Hello
  </h1>
</div>
```

### 响应式设计

```tsx
<div className="w-full lg:w-1/2">  // 移动端全宽，桌面端一半
  {/* 内容 */}
</div>
```

### 黑暗模式

Tailwind 自动支持黑暗模式：

```tsx
<div className="bg-white dark:bg-gray-800">  // 浅色背景，深色模式时深色背景
```

---

## 常见问题

### Q1: 什么时候用 Server Component？什么时候用 Client Component？

**答**：
- **Server Component（默认）**：
  - 获取数据（数据库、API）
  - 访问后端资源
  - 保持大的依赖在服务器上
  - 包含敏感信息（API keys）

- **Client Component**：
  - 需要交互（onClick, onChange 等）
  - 需要使用 Hooks（useState, useEffect）
  - 需要使用浏览器 API

### Q2: 'use client' 应该放在哪里？

**答**：放在文件**最顶部**，所有导入之前。

```tsx
'use client'  // ← 这里

import { useState } from 'react'
```

### Q3: 如何在 Server Component 中使用数据？

**答**：直接在组件中 async 获取：

```tsx
export default async function Page() {
  const data = await fetch('https://api.example.com/data')
  return <div>{data}</div>
}
```

### Q4: 如何在不同组件之间共享状态？

**答**：使用 React Context（如本项目的 LanguageContext）。

### Q5: 如何创建新的路由？

**答**：在 `app/` 目录下创建文件夹，添加 `page.tsx`：

```
app/
└── new-route/
    └── page.tsx  → 访问 /new-route
```

---

## 下一步学习

1. **API 路由**：创建 `app/api/` 目录处理后端请求
2. **动态路由**：使用 `[id]` 创建动态路由
3. **Middleware**：在请求之间运行代码
4. **数据获取**：使用 `fetch` 获取数据
5. **部署**：使用 Vercel 部署 Next.js 应用

---

## 命令说明

```bash
npm run dev    # 启动开发服务器（http://localhost:3000）
npm run build  # 构建生产版本
npm run start  # 启动生产服务器
```

---

## 推荐资源

- [Next.js 官方文档](https://nextjs.org/docs)
- [React 文档](https://react.dev)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)

祝你学习愉快！🚀

