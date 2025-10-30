/**
 * 这个文件演示了 React Context API 的使用
 * Context 用于在组件树中共享状态（语言切换）
 */
'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

// 定义支持的语言类型
type Language = 'en' | 'zh'

// Context 的类型定义
interface LanguageContextType {
  language: Language              // 当前语言
  setLanguage: (lang: Language) => void  // 切换语言函数
  t: (key: string) => string      // 翻译函数
}

// 创建 Context
// 初始值设为 undefined，因为我们会在 Provider 中提供值
const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// 翻译字典
// 存储所有语言的翻译文本
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

/**
 * LanguageProvider 组件
 * 
 * 这个组件提供语言切换功能给整个应用
 * 使用 React Context 模式共享状态
 */
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // 使用 useState 管理当前语言状态
  // 默认语言是英文
  const [language, setLanguage] = useState<Language>('en')

  // useEffect: 组件挂载时从 localStorage 加载保存的语言
  // 依赖数组为空 []，所以只在组件挂载时运行一次
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'zh')) {
      setLanguage(savedLanguage)
    }
  }, [])

  // useEffect: 语言改变时保存到 localStorage
  // 依赖数组包含 [language]，所以当 language 改变时运行
  useEffect(() => {
    localStorage.setItem('language', language)
  }, [language])

  // 翻译函数：根据当前语言返回对应的翻译文本
  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key
  }

  // 通过 Provider 提供值给子组件
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

/**
 * 自定义 Hook: useLanguage
 * 
 * 使用这个 Hook 可以在任何组件中访问语言相关功能
 * 必须在 LanguageProvider 包裹的组件中使用
 * 
 * 使用示例：
 * const { t, language, setLanguage } = useLanguage()
 */
export function useLanguage() {
  const context = useContext(LanguageContext)
  
  // 错误处理：如果没有在 Provider 中使用，抛出错误
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  
  return context
}
