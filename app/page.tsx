'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (!url.trim()) {
      setError('请输入有效的网页链接')
      return
    }

    // 验证URL格式
    try {
      new URL(url)
    } catch {
      setError('请输入有效的URL格式（例如：https://example.com）')
      return
    }

    setLoading(true)
    
    try {
      // 调用API解析网页
      const response = await fetch('/api/parse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || '解析网页失败')
      }

      const data = await response.json()
      
      // 跳转到预览页面，传递解析的数据
      router.push(`/preview?title=${encodeURIComponent(data.title)}&content=${encodeURIComponent(data.content)}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : '发生未知错误')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="w-full max-w-2xl space-y-8">
        {/* 标题区域 */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            网页转PDF工具
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            将你喜欢的文章和博客保存为PDF，永久珍藏
          </p>
        </div>

        {/* 输入表单 */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="url" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              网页链接
            </label>
            <div className="flex gap-2">
              <input
                id="url"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/article"
                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                         bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         transition-all"
                disabled={loading}
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm mt-1">{error}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 
                     text-white font-semibold rounded-lg shadow-lg
                     hover:from-blue-700 hover:to-purple-700
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                     disabled:opacity-50 disabled:cursor-not-allowed
                     transition-all transform hover:scale-105"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                正在解析...
              </span>
            ) : (
              '生成PDF'
            )}
          </button>
        </form>

        {/* 功能说明 */}
        <div className="grid md:grid-cols-3 gap-4 mt-8">
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="text-3xl mb-2">📄</div>
            <h3 className="font-semibold mb-1">输入链接</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              粘贴你想要保存的文章或博客链接
            </p>
          </div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="text-3xl mb-2">✏️</div>
            <h3 className="font-semibold mb-1">编辑预览</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              在富文本编辑器中预览和编辑内容
            </p>
          </div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="text-3xl mb-2">💾</div>
            <h3 className="font-semibold mb-1">下载PDF</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              一键生成并下载PDF文件
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
