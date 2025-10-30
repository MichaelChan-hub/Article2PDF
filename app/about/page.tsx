/**
 * 关于页面 (About Page)
 * 
 * 这个页面演示了：
 * 1. 嵌套路由：app/about/page.tsx → /about 路由
 * 2. Server Component：没有 'use client'，所以是服务器组件
 * 3. 从 API 获取数据（示例）
 */
import { Metadata } from 'next'
import Link from 'next/link' // Next.js 的 Link 组件用于客户端导航

// 页面特定的元数据
export const metadata: Metadata = {
  title: 'About - Make Your Book',
  description: 'Learn more about Make Your Book',
}

// 这个组件是 Server Component（默认）
// 可以在这里直接获取数据
export default function About() {
  // 在真实应用中，你可以在这里获取数据
  // const data = await fetch('https://api.example.com/data')
  
  return (
    <div className="min-h-screen p-24">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">关于 Make Your Book</h1>
        
        <div className="space-y-4 text-gray-700 dark:text-gray-300">
          <p>
            Make Your Book 是一个使用 Next.js 构建的现代化书籍创作应用。
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">技术栈</h2>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Next.js 14</strong> - React 全栈框架</li>
            <li><strong>React 18</strong> - UI 库</li>
            <li><strong>TypeScript</strong> - 类型安全</li>
            <li><strong>Tailwind CSS</strong> - 样式框架</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">核心特性</h2>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>🎨 现代化的 UI 设计</li>
            <li>🌍 国际化支持（中文/英文）</li>
            <li>📱 响应式布局</li>
            <li>⚡ 服务端渲染</li>
            <li>🎭 黑暗模式支持</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">学习要点</h2>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <ul className="space-y-2">
              <li>✅ App Router 的使用</li>
              <li>✅ Server Components vs Client Components</li>
              <li>✅ React Context 状态管理</li>
              <li>✅ TypeScript 类型定义</li>
              <li>✅ Tailwind CSS 样式</li>
            </ul>
          </div>
        </div>

        {/* 使用 Link 组件进行客户端导航 */}
        <div className="mt-8">
          <Link 
            href="/" 
            className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            ← 返回首页
          </Link>
        </div>
      </div>
    </div>
  )
}

