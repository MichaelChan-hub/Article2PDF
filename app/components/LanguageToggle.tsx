/**
 * 语言切换组件 (Language Toggle)
 * 
 * 这是一个可复用的组件
 * 演示了：
 * 1. Client Component 的使用 ('use client')
 * 2. Context Hook 的使用 (useLanguage)
 * 3. 事件处理 (onClick)
 */
'use client'

import { useLanguage } from '../contexts/LanguageContext'

export function LanguageToggle() {
  // 从 Context 获取语言状态和切换函数
  const { language, setLanguage } = useLanguage()

  // 切换语言：英文 ↔ 中文
  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'zh' : 'en')
  }

  return (
    <button
      onClick={toggleLanguage}
      className="fixed top-4 right-4 z-50 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700"
      aria-label="Toggle language"
    >
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {language === 'en' ? '中文' : 'English'}
      </span>
    </button>
  )
}
