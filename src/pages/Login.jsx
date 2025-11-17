import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLoginMutation } from '../store/api'
import { loginSuccess } from '../store/authSlice'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'
import Input from '../components/Input'
import Button from '../components/Button'

export default function Login() {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [login, { isLoading }] = useLoginMutation()
  const dispatch = useDispatch()

  const onSubmit = async (e) => {
    e.preventDefault()
    const res = await login({ email, password })
    if (res.data) {
      dispatch(loginSuccess(res.data))
      toast.success('Logged in')
    } else {
      toast.error(t('auth.invalid'))
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form onSubmit={onSubmit} className="w-full max-w-sm space-y-3 rounded-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4">
        <h1 className="text-xl font-semibold">{t('auth.login')}</h1>
        <Input label={t('auth.email')} value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
        <Input label={t('auth.password')} value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
        <Button type="submit" disabled={isLoading}>{t('auth.signIn')}</Button>
        <div className="text-xs text-gray-500">
          Admin: admin@company.com / admin123<br />User: user@company.com / user123
        </div>
      </form>
    </div>
  )
}