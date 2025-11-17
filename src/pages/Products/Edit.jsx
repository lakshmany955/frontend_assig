import { useParams, useNavigate } from 'react-router-dom'
import { useGetProductQuery, useUpdateProductMutation } from '../../store/api'
import Input from '../../components/Input'
import Button from '../../components/Button'
import Loader from '../../components/Loader'
import toast from 'react-hot-toast'
import { useState, useEffect } from 'react'

export default function ProductEdit() {
  const { id } = useParams()
  const { data, isLoading } = useGetProductQuery(id)
  const [update, { isLoading: saving }] = useUpdateProductMutation()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('0')
  const [category, setCategory] = useState('Electronics')
  const [stock, setStock] = useState('0')
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()
  useEffect(() => { if (data) { setName(data.name); setDescription(data.description); setPrice(String(data.price)); setCategory(data.category); setStock(String(data.stock)) } }, [data])
  if (isLoading) return <Loader />
  const onSubmit = async (e) => {
    e.preventDefault()
    const errs = {}
    if (!name.trim()) errs.name = 'Name is required'
    if (!description.trim()) errs.description = 'Description is required'
    if (!price || Number(price) <= 0) errs.price = 'Price must be > 0'
    if (!stock || Number(stock) < 0) errs.stock = 'Stock must be >= 0'
    setErrors(errs)
    if (Object.keys(errs).length) return
    await update({ id, name, description, price: Number(price), category, stock: Number(stock) })
    toast.success('Product updated')
    navigate('/products')
  }
  return (
    <form onSubmit={onSubmit} className="max-w-lg space-y-3">
      <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} error={errors.name} />
      <Input label="Description" value={description} onChange={(e) => setDescription(e.target.value)} error={errors.description} />
      <Input label="Price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} error={errors.price} />
      <label className="text-sm">
        <span className="mb-1 block">Category</span>
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full rounded-md border px-3 py-2">
          <option>Electronics</option>
          <option>Books</option>
          <option>Clothing</option>
        </select>
      </label>
      <Input label="Stock" type="number" value={stock} onChange={(e) => setStock(e.target.value)} error={errors.stock} />
      <Button type="submit" loading={saving}>Save</Button>
    </form>
  )
}