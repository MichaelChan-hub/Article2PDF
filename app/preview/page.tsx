'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

// 动态导入react-quill，避免SSR问题
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
import 'react-quill/dist/quill.snow.css'

function PreviewContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')
  const [generating, setGenerating] = useState(false)

  useEffect(() => {
    // 从URL参数获取数据
    const titleParam = searchParams.get('title')
    const contentParam = searchParams.get('content')

    if (titleParam) {
      setTitle(decodeURIComponent(titleParam))
    }
    if (contentParam) {
      setContent(decodeURIComponent(contentParam))
    }
  }, [searchParams])

  const handleGeneratePDF = async () => {
    if (!content.trim()) {
      alert('内容不能为空')
      return
    }

    setGenerating(true)

    try {
      // 创建一个隐藏的容器来渲染PDF内容
      const printContainer = document.createElement('div')
      printContainer.style.position = 'absolute'
      printContainer.style.left = '-9999px'
      printContainer.style.width = '210mm' // A4 width
      printContainer.style.padding = '20mm'
      printContainer.style.backgroundColor = 'white'
      printContainer.style.color = '#333'
      printContainer.style.fontFamily = "'Microsoft YaHei', Arial, sans-serif"
      printContainer.style.lineHeight = '1.6'
      printContainer.style.fontSize = '14px'

      // 创建标题
      const titleElement = document.createElement('h1')
      titleElement.textContent = title || 'Document'
      titleElement.style.marginBottom = '20px'
      titleElement.style.fontSize = '24px'
      titleElement.style.fontWeight = 'bold'
      titleElement.style.textAlign = 'center'
      printContainer.appendChild(titleElement)

      // 创建内容容器
      const contentElement = document.createElement('div')
      contentElement.innerHTML = content
      contentElement.style.wordWrap = 'break-word'
      
      // 处理图片样式
      const images = contentElement.querySelectorAll('img')
      images.forEach((img) => {
        img.style.maxWidth = '100%'
        img.style.height = 'auto'
        img.style.display = 'block'
        img.style.margin = '10px auto'
      })
      
      printContainer.appendChild(contentElement)
      document.body.appendChild(printContainer)

      // 等待内容渲染
      await new Promise(resolve => setTimeout(resolve, 300))

      // 使用html2canvas将内容转换为canvas
      const canvas = await html2canvas(printContainer, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        width: printContainer.scrollWidth,
        height: printContainer.scrollHeight,
      })

      // 移除临时容器
      document.body.removeChild(printContainer)

      // 创建PDF
      const pdf = new jsPDF('p', 'mm', 'a4')
      const imgWidth = 210 // A4 width in mm
      const pageHeight = 297 // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight
      let position = 0

      // 添加第一页内容
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight

      // 如果内容超过一页，添加更多页面
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }

      // 保存PDF
      const fileName = (title || 'document').replace(/[^a-z0-9\u4e00-\u9fa5]/gi, '_').toLowerCase() + '.pdf'
      pdf.save(fileName)
    } catch (error) {
      console.error('生成PDF失败:', error)
      alert('生成PDF失败: ' + (error instanceof Error ? error.message : '未知错误'))
    } finally {
      setGenerating(false)
    }
  }

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ['link', 'image'],
      ['clean'],
    ],
  }

  const quillFormats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'list',
    'bullet',
    'color',
    'background',
    'align',
    'link',
    'image',
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* 顶部导航栏 */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => router.push('/')}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white 
                       flex items-center gap-2 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              返回首页
            </button>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">预览与编辑</h1>
            <button
              onClick={handleGeneratePDF}
              disabled={generating || !content.trim()}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white 
                       font-semibold rounded-lg shadow-lg
                       hover:from-blue-700 hover:to-purple-700
                       disabled:opacity-50 disabled:cursor-not-allowed
                       transition-all"
            >
              {generating ? '生成中...' : '生成PDF'}
            </button>
          </div>
        </div>
      </div>

      {/* 主内容区域 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          {/* 标题输入 */}
          <div className="mb-6">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              文章标题
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="输入文章标题"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* 富文本编辑器 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              文章内容
            </label>
            <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-300 dark:border-gray-600">
              <ReactQuill
                theme="snow"
                value={content}
                onChange={setContent}
                modules={quillModules}
                formats={quillFormats}
                placeholder="编辑文章内容..."
                className="quill-editor"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 自定义样式 */}
      <style jsx global>{`
        .quill-editor .ql-container {
          min-height: 500px;
          font-size: 16px;
          color: #1f2937;
        }
        .dark .quill-editor .ql-container {
          color: #f9fafb;
        }
        .quill-editor .ql-editor {
          min-height: 500px;
        }
        .quill-editor .ql-toolbar {
          border-top-left-radius: 0.5rem;
          border-top-right-radius: 0.5rem;
          background-color: #f9fafb;
        }
        .dark .quill-editor .ql-toolbar {
          background-color: #1f2937;
        }
      `}</style>
    </div>
  )
}

export default function PreviewPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">加载中...</p>
        </div>
      </div>
    }>
      <PreviewContent />
    </Suspense>
  )
}

