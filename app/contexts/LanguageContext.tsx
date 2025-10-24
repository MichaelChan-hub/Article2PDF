'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

type Language = 'en' | 'zh'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Translation keys
const translations = {
  en: {
    'welcome': 'Welcome to',
    'app-name': 'Make Your Book',
    'main-title': 'Create Your Book',
    'create-new': 'Create New Book',
    'create-desc': 'Start creating your first book',
    'my-library': 'My Library',
    'library-desc': 'View and manage all your books',
    'templates': 'Templates',
    'templates-desc': 'Choose suitable book templates',
    'settings': 'Settings',
    'settings-desc': 'Personalize your creative environment',
  },
  zh: {
    'welcome': '欢迎来到',
    'app-name': 'Make Your Book',
    'main-title': '制作你的书',
    'create-new': '创建新书',
    'create-desc': '开始创作你的第一本书',
    'my-library': '我的书库',
    'library-desc': '查看和管理你的所有书籍',
    'templates': '模板',
    'templates-desc': '选择适合的书籍模板',
    'settings': '设置',
    'settings-desc': '个性化你的创作环境',
  }
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en') // Default to English

  useEffect(() => {
    // Load language from localStorage on mount
    const savedLanguage = localStorage.getItem('language') as Language
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'zh')) {
      setLanguage(savedLanguage)
    }
  }, [])

  useEffect(() => {
    // Save language to localStorage when it changes
    localStorage.setItem('language', language)
  }, [language])

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
