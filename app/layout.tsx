import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

// Next.js 字体优化 - 自动加载 Google 字体
// Inter 是一个 sans-serif 字体
const inter = Inter({ subsets: ['latin'] })

// 元数据 - Next.js 会自动添加到 <head> 标签中
// SEO 优化：搜索引擎会使用这些信息
export const metadata: Metadata = {
  title: '网页转PDF工具 - 将文章博客保存为PDF',
  description: '免费的网页转PDF工具，支持将任意网页文章和博客转换为PDF文件，支持在线编辑和预览',
}

/**
 * 根布局 (Root Layout)
 * 
 * 这是 Next.js App Router 的核心文件
 * - 每个 Next.js 应用必须有根布局
 * - 必须包含 <html> 和 <body> 标签
 * - 包裹所有页面内容
 * - 这里没有 'use client'，所以是 Server Component
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode // 所有页面内容都会作为 children 传入
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}> {/* 应用字体样式 */}
        {children} {/* 这里会被替换成具体的页面内容 */}
      </body>
    </html>
  )
}
