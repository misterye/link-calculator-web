import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import translations from '../utils/i18n'

const I18nContext = createContext()

function getNestedProperty(obj, path) {
  return path.split('.').reduce((prev, curr) => prev?.[curr], obj)
}

export function I18nProvider({ children }) {
  const [locale, setLocaleState] = useState(() => {
    if (typeof window === 'undefined') return 'zh'
    const saved = localStorage.getItem('locale')
    if (saved && (saved === 'zh' || saved === 'en')) return saved
    const browserLang = navigator.language || navigator.userLanguage
    return browserLang?.startsWith('zh') ? 'zh' : 'en'
  })

  useEffect(() => {
    localStorage.setItem('locale', locale)
    document.documentElement.lang = locale === 'zh' ? 'zh-CN' : 'en'
  }, [locale])

  const setLocale = useCallback((l) => {
    if (l === 'zh' || l === 'en') setLocaleState(l)
  }, [])

  const toggleLocale = useCallback(() => {
    setLocaleState((prev) => (prev === 'zh' ? 'en' : 'zh'))
  }, [])

  const t = useCallback(
    (key) => {
      return getNestedProperty(translations[locale], key) || key
    },
    [locale]
  )

  return (
    <I18nContext.Provider value={{ locale, setLocale, toggleLocale, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}
