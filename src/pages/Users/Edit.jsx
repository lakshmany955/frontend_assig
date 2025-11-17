import { useParams, useNavigate } from 'react-router-dom'
import { useGetUserQuery, useUpdateUserMutation } from '../../store/api'
import Input from '../../components/Input'
import Button from '../../components/Button'
import Loader from '../../components/Loader'
import toast from 'react-hot-toast'
import { useState, useEffect } from 'react'

export default function UserEdit() {
  const { id } = useParams()
  const { data, isLoading } = useGetUserQuery(id)
  const [update, { isLoading: saving }] = useUpdateUserMutation()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('user')
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()
  useEffect(() => { if (data) { setName(data.name); setEmail(data.email); setRole(data.role) } }, [data])
  if (isLoading) return <Loader />
  const onSubmit = async (e) => {
    e.preventDefault()
    const errs = {}
    if (!name.trim()) errs.name = 'Name is required'
    if (!email.trim()) errs.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Invalid email'
    setErrors(errs)
    if (Object.keys(errs).length) return
    await update({ id, name, email, role })
    toast.success('User updated')
    navigate('/users')
  }
  return (
    <form onSubmit={onSubmit} className="max-w-lg space-y-3">
      <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} error={errors.name} />
      <Input label="Email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" error={errors.email} />
      <label className="text-sm">
        <span className="mb-1 block">Role</span>
        <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full rounded-md border px-3 py-2">
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
      </label>
      <Button type="submit" loading={saving}>Save</Button>
    </form>
  )
}