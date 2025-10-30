/**
 * 'use client' 指令
 * 
 * 这行告诉 Next.js 这是一个 Client Component（客户端组件）
 * - 可以使用 React Hooks（useState, useEffect 等）
 * - 可以使用浏览器 API（localStorage, window 等）
 * - 可以有交互性（onClick 等事件处理）
 * 
 * 如果没有这行，组件默认为 Server Component
 */
'use client'

import { useLanguage } from './contexts/LanguageContext'
import { LanguageToggle } from './components/LanguageToggle'

/**
 * 首页组件 (Home Page)
 * 
 * 文件路径: app/page.tsx
 * 对应路由: / (根路径)
 * 
 * Next.js 路由规则：
 * - app/page.tsx → / (主页)
 * - app/about/page.tsx → /about
 * - app/blog/page.tsx → /blog
 */
export default function Home() {
  // 使用语言切换 Context
  // 获取翻译函数 t，用于多语言支持
  const { t } = useLanguage()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <LanguageToggle />
      
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          {t('welcome')}&nbsp;
          <code className="font-mono font-bold">{t('app-name')}</code>
        </p>
      </div>

      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <h1 className="text-6xl font-bold text-center">
          {t('main-title')}
        </h1>
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-2 gap-4">
        <a
          href="/about"
          className="group rounded-lg border border-transparent px-8 py-6 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            👉 关于页面{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            查看 Server Component 示例，学习页面路由
          </p>
        </a>
        
        <a
          href="/api-demo"
          className="group rounded-lg border border-transparent px-8 py-6 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            🚀 API 演示{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            学习 Next.js API 路由的用法
          </p>
        </a>
      </div>
      
      {/* 学习资源卡片 */}
      <div className="max-w-5xl w-full">
        <div className="grid text-center lg:grid-cols-2 gap-6">
          <div className="rounded-lg border border-gray-300 dark:border-gray-700 px-6 py-6 bg-white dark:bg-gray-800">
            <h3 className="text-xl font-semibold mb-3">📚 学习指南</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              阅读详细的学习文档，了解 Next.js 的核心概念
            </p>
            <ul className="text-left text-sm space-y-2 text-gray-700 dark:text-gray-300">
              <li>✓ Server vs Client Components</li>
              <li>✓ App Router 路由系统</li>
              <li>✓ React Context 状态管理</li>
              <li>✓ 国际化和本地化</li>
            </ul>
          </div>
          
          <div className="rounded-lg border border-gray-300 dark:border-gray-700 px-6 py-6 bg-white dark:bg-gray-800">
            <h3 className="text-xl font-semibold mb-3">⚡ 快速参考</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              查看 QUICKSTART.md 获取快速入门指南
            </p>
            <ul className="text-left text-sm space-y-2 text-gray-700 dark:text-gray-300">
              <li>✓ 常用命令速查</li>
              <li>✓ 代码示例</li>
              <li>✓ Tailwind CSS 技巧</li>
              <li>✓ 常见问题解答</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}
