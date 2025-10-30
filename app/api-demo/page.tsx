'use client'

import { useState } from 'react'

/**
 * API 调用演示页面
 * 
 * 演示如何从 Client Component 调用 Next.js API 路由
 */
export default function APIDemo() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  // 调用 API
  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/hello')
      const result = await response.json()
      setData(result)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  // 发送 POST 请求
  const sendData = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/hello', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: 'Next.js Learner', age: 25 }),
      })
      const result = await response.json()
      setData(result)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen p-24">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">API 调用演示</h1>

        <div className="space-y-4">
          {/* GET 请求 */}
          <button
            onClick={fetchData}
            disabled={loading}
            className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 transition-colors"
          >
            {loading ? '加载中...' : '调用 GET /api/hello'}
          </button>

          {/* POST 请求 */}
          <button
            onClick={sendData}
            disabled={loading}
            className="px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50 transition-colors ml-4"
          >
            {loading ? '发送中...' : '发送 POST /api/hello'}
          </button>
        </div>

        {/* 显示返回的数据 */}
        {data && (
          <div className="mt-8 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">API 响应：</h2>
            <pre className="bg-gray-200 dark:bg-gray-900 p-4 rounded overflow-auto">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        )}

        {/* 说明 */}
        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h3 className="font-semibold mb-2">📝 说明：</h3>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>这是一个 Client Component（'use client'）</li>
            <li>使用 <code className="bg-gray-200 dark:bg-gray-800 px-1 rounded">fetch()</code> 调用 API</li>
            <li>API 路由定义在 <code className="bg-gray-200 dark:bg-gray-800 px-1 rounded">app/api/hello/route.ts</code></li>
            <li>支持 GET、POST、PUT、DELETE 等方法</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

