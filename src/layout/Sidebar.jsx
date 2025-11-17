import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { closeSidebar } from '../store/uiSlice'

export default function Sidebar() {
  const role = useSelector((s) => s.auth.role)
  const open = useSelector((s) => s.ui.sidebarOpen)
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const icon = (name) => ({
    dashboard: '📊', users: '👥', products: '📦', settings: '⚙️'
  }[name])

  const links = [
    { to: '/', label: `${icon('dashboard')} ${t('nav.dashboard')}` },
    ...(role === 'admin' ? [
      { to: '/users', label: `${icon('users')} ${t('nav.users')}` },
      { to: '/products', label: `${icon('products')} ${t('nav.products')}` },
      { to: '/settings', label: `${icon('settings')} Settings` },
    ] : [
      { to: '/products', label: `${icon('products')} ${t('nav.products')}` },
    ]),
  ]

  return (
    <aside className={`fixed inset-y-0 left-0 z-40 w-64 transform border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 transition-transform md:static md:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
      <nav className="p-4 space-y-2">
        {links.map((l) => (
          <NavLink key={l.to} to={l.to} onClick={() => dispatch(closeSidebar())} className={({ isActive }) => `block rounded px-3 py-2 text-sm ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
            {l.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}