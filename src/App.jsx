import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Layout from './layout/Layout'
import ProtectedRoute from './routes/ProtectedRoute'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import UsersList from './pages/Users/List'
import UserCreate from './pages/Users/Create'
import UserEdit from './pages/Users/Edit'
import UserDetails from './pages/Users/Details'
import ProductsList from './pages/Products/List'
import ProductCreate from './pages/Products/Create'
import ProductEdit from './pages/Products/Edit'
import ProductDetails from './pages/Products/Details'
import Settings from './pages/Settings'
import Forbidden from './pages/Forbidden'
import NotFound from './pages/NotFound'

export default function App() {
  const token = useSelector((s) => s.auth.token)
  return (
    <Routes>
      <Route path="/login" element={token ? <Navigate to="/" replace /> : <Login />} />

      <Route element={<ProtectedRoute roles={["admin", "user"]} />}> 
        <Route element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<ProductsList />} />
          <Route path="products/:id" element={<ProductDetails />} />

          <Route element={<ProtectedRoute roles={["admin"]} />}> 
            <Route path="products/create" element={<ProductCreate />} />
            <Route path="products/:id/edit" element={<ProductEdit />} />
            <Route path="users" element={<UsersList />} />
            <Route path="users/create" element={<UserCreate />} />
            <Route path="users/:id" element={<UserDetails />} />
            <Route path="users/:id/edit" element={<UserEdit />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>
      </Route>

      <Route path="/403" element={<Forbidden />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}