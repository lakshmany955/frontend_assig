import Header from './Header'
import Sidebar from './Sidebar'
import Footer from './Footer'
import { useSelector, useDispatch } from 'react-redux'
import { toggleSidebar } from '../store/uiSlice'

export default function Layout({ children }) {
  const dispatch = useDispatch()
  const theme = useSelector((s) => s.ui.theme)

  return (
    <div className="min-h-screen">{/* theme applied via uiSlice */}
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4 md:ml-64">
          <button className="mb-2 md:hidden rounded border px-3 py-2" onClick={() => dispatch(toggleSidebar())}>☰</button>
          {children}
        </main>
      </div>
      <Footer />
    </div>
  )
}