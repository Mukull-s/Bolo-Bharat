import { createContext, useContext, useState } from 'react'
import { t as translate } from '../i18n'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [uiLang, setUiLang] = useState(() => {
    if (typeof window === 'undefined') return 'hi'
    return window.localStorage.getItem('bolo-ui-lang') || 'hi'
  })

  const changeLanguage = (code) => {
    setUiLang(code)
    window.localStorage.setItem('bolo-ui-lang', code)
  }

  const t = (key) => translate(uiLang, key)

  return (
    <LanguageContext.Provider value={{ uiLang, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
