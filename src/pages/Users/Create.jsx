import { useState } from 'react'
import { useCreateUserMutation } from '../../store/api'
import Input from '../../components/Input'
import Button from '../../components/Button'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export default function UserCreate() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('user')
  const [errors, setErrors] = useState({})
  const [create, { isLoading }] = useCreateUserMutation()
  const navigate = useNavigate()
  const onSubmit = async (e) => {
    e.preventDefault()
    const errs = {}
    if (!name.trim()) errs.name = 'Name is required'
    if (!email.trim()) errs.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Invalid email'
    setErrors(errs)
    if (Object.keys(errs).length) return
    await create({ name, email, role })
    toast.success('User created')
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
      <Button type="submit" loading={isLoading}>Save</Button>
    </form>
  )
}