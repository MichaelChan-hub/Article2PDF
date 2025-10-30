# Next.js 快速入门

## 🚀 开始学习

### 1. 启动项目

```bash
# 安装依赖（如果还没有）
npm install

# 启动开发服务器
npm run dev
```

访问 http://localhost:3000

---

## 📁 项目文件结构

```
app/
├── layout.tsx           # 根布局（Server Component）
├── page.tsx             # 首页 (/) - Client Component
├── about/
│   └── page.tsx         # 关于页面 (/about) - Server Component
├── components/
│   └── LanguageToggle.tsx  # 语言切换按钮
└── contexts/
    └── LanguageContext.tsx  # 语言 Context
```

---

## 🎯 关键概念速查

### Server Component vs Client Component

| 特性 | Server Component | Client Component |
|------|------------------|------------------|
| 位置 | 默认（无需标记） | 需要 `'use client'` |
| 运行环境 | 服务器 | 浏览器 |
| 可以使用 Hooks | ❌ | ✅ |
| 可以使用 localStorage | ❌ | ✅ |
| 可以使用浏览器 API | ❌ | ✅ |
| 可以直接访问数据库 | ✅ | ❌ |
| 安全性 | 更安全 | 需要小心处理 |

### 使用建议

**使用 Server Component 当：**
- 获取数据（数据库、API）
- 访问私有凭证或信息
- 保持大的依赖在服务器上
- 减少客户端 JavaScript

**使用 Client Component 当：**
- 需要交互性（onClick、useState 等）
- 使用浏览器 API（localStorage、window 等）
- 需要生命周期效果（useEffect）

---

## 📚 核心文件详解

### `app/layout.tsx` - 根布局

```tsx
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}  {/* 所有页面都在这里 */}
      </body>
    </html>
  )
}
```

**作用**：
- 包裹所有页面
- 应用全局样式
- 设置全局 Context
- 必须包含 `<html>` 和 `<body>`

### `app/page.tsx` - 主页

```tsx
'use client'  // 客户端组件

export default function Home() {
  return <div>Home</div>
}
```

**对应路由**：`/`

### 创建新页面

```
app/
└── new-page/
    └── page.tsx  → 访问 /new-page
```

---

## 🔄 React Context 模式

本项目使用 Context 实现语言切换：

1. **创建 Context** (`contexts/LanguageContext.tsx`)
2. **创建 Provider** 包裹应用
3. **创建自定义 Hook** (`useLanguage`)
4. **在根布局中提供** (`layout.tsx`)
5. **在组件中使用** (`page.tsx`)

```tsx
// 1. 创建 Context
const LanguageContext = createContext()

// 2. 创建 Provider
export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en')
  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

// 3. 创建 Hook
export function useLanguage() {
  return useContext(LanguageContext)
}

// 4. 使用
const { language, setLanguage } = useLanguage()
```

---

## 🎨 Tailwind CSS 速查

### 常用类名

```tsx
// 布局
<div className="flex items-center justify-between">
<div className="grid grid-cols-3 gap-4">

// 间距
<div className="p-4">   {/* padding */}
<div className="m-4">   {/* margin */}
<div className="px-4 py-2">  {/* 特定方向 */}

// 文字
<h1 className="text-4xl font-bold">
<p className="text-gray-600">

// 颜色
<button className="bg-blue-500 hover:bg-blue-600">
<div className="bg-white dark:bg-gray-800">  {/* 深色模式 */}

// 响应式
<div className="w-full lg:w-1/2">  {/* 移动端全宽，桌面端一半 */}
```

### 响应式断点

- `sm:` - 640px 及以上
- `md:` - 768px 及以上
- `lg:` - 1024px 及以上
- `xl:` - 1280px 及以上

---

## 🌍 国际化实现

### 结构

1. **翻译字典** 存储在 `contexts/LanguageContext.tsx`
2. **Provider** 包裹应用
3. **翻译函数** `t(key)` 获取翻译
4. **localStorage** 持久化语言选择

```tsx
// 使用翻译
const { t } = useLanguage()
<h1>{t('main-title')}</h1>

// 切换语言
const { setLanguage } = useLanguage()
setLanguage('zh')
```

---

## 📖 常用命令

```bash
npm run dev      # 启动开发服务器
npm run build    # 构建生产版本
npm run start    # 启动生产服务器
npm run lint     # 运行 ESLint
```

---

## 🔗 有用的链接

- [Next.js 文档](https://nextjs.org/docs)
- [React 文档](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript 文档](https://www.typescriptlang.org/docs)

---

## 💡 下一步学习

1. **API 路由** - 创建 `app/api/` 处理后端请求
2. **动态路由** - 使用 `[id]` 创建动态页面
3. **中间件** - 使用 `middleware.ts` 处理请求
4. **数据获取** - 在 Server Components 中使用 `fetch`
5. **部署** - 使用 Vercel 一键部署

---

## ❓ 常见问题

**Q: 如何创建一个新路由？**

A: 在 `app/` 目录下创建文件夹和 `page.tsx`：
```
app/contact/
└── page.tsx → /contact
```

**Q: 什么时候用 Server Component？**

A: 默认使用 Server Component。只有在需要交互性或浏览器 API 时才使用 Client Component。

**Q: 如何获取数据？**

A: 在 Server Component 中直接使用 `fetch` 或导入数据库客户端。

**Q: 如何使用 TypeScript？**

A: Next.js 默认支持 TypeScript。只需使用 `.tsx` 扩展名即可。

---

## 🎉 开始探索

1. 启动项目：`npm run dev`
2. 访问 http://localhost:3000
3. 查看代码注释学习
4. 阅读 `NEXTJS学习指南.md` 获取详细信息
5. 尝试创建自己的页面！

祝你学习愉快！🚀

