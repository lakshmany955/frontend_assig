import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import Button from '../components/Button'
import { logout } from '../store/authSlice'
import { setTheme } from '../store/uiSlice'
import { useState } from 'react'

export default function Header() {
  const dispatch = useDispatch()
  const { t, i18n } = useTranslation()
  const theme = useSelector((s) => s.ui.theme)
  const role = useSelector((s) => s.auth.role)
  const [open, setOpen] = useState(false)

  const toggleTheme = () => {
    dispatch(setTheme(theme === 'dark' ? 'light' : 'dark'))
  }

  const switchLang = () => {
    const next = i18n.language === 'en' ? 'es' : 'en'
    i18n.changeLanguage(next)
    localStorage.setItem('lang', next)
  }

  return (
    <header className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-3">
      <div className="font-semibold">{t('app.title')}</div>
      <div className="relative">
        <button className="flex items-center gap-2 rounded px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => setOpen((v) => !v)}>
          <span className="inline-block h-6 w-6 rounded-full bg-blue-600 text-white text-center leading-6">{role?.[0]?.toUpperCase()}</span>
          <span className="text-sm text-gray-700 dark:text-gray-200">{role?.toUpperCase()}</span>
          <span>▾</span>
        </button>
        {open && (
          <div className="absolute right-0 z-50 mt-2 w-56 rounded-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-2 shadow">
            <div className="px-2 py-1 text-xs text-gray-500">Profile</div>
            <Button variant="secondary" className="w-full" onClick={toggleTheme}>{t('app.theme')}: {theme === 'dark' ? t('app.dark') : t('app.light')}</Button>
            <Button variant="secondary" className="mt-2 w-full" onClick={switchLang}>{t('app.language')}: {i18n.language.toUpperCase()}</Button>
            <Button variant="danger" className="mt-2 w-full" onClick={() => dispatch(logout())}>{t('app.logout')}</Button>
          </div>
        )}
      </div>
    </header>
  )
}