'use client'

import { useLanguage } from '../contexts/LanguageContext'

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

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
