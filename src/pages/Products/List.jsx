import { useMemo, useState, useEffect } from 'react'
import { useGetProductsQuery, useDeleteProductMutation } from '../../store/api'
import Table from '../../components/Table'
import Button from '../../components/Button'
import Input from '../../components/Input'
import Skeleton from '../../components/Skeleton'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { api } from '../../store/api'
import Pagination from '../../components/Pagination'

export default function ProductsList() {
  const [page, setPage] = useState(1)
  const [q, setQ] = useState('')
  const [debouncedQ, setDebouncedQ] = useState('')
  const [categories, setCategories] = useState([])
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  useEffect(() => { const h = setTimeout(() => setDebouncedQ(q), 300); return () => clearTimeout(h) }, [q])
  const { data, isLoading, isError, refetch } = useGetProductsQuery({ page, q: debouncedQ, category: categories, minPrice, maxPrice })
  const [removeProduct, { isLoading: removing }] = useDeleteProductMutation()
  const role = useSelector((s) => s.auth.role)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const columns = useMemo(() => ([
    { key: 'id', header: 'ID' },
    { key: 'name', header: 'Name' },
    { key: 'category', header: 'Category' },
    { key: 'price', header: 'Price', cell: (r) => `$${r.price.toFixed(2)}` },
    { key: 'stock', header: 'Stock' },
    { key: 'createdAt', header: 'Created', cell: (r) => new Date(r.createdAt).toLocaleString() },
    ...(role === 'admin' ? [{ key: 'actions', header: 'Actions', cell: (r) => (
      <div className="flex gap-2">
        <Button variant="secondary" onClick={(e) => { e.stopPropagation(); navigate(`/products/${r.id}`) }}>View</Button>
        <Button variant="secondary" onClick={(e) => { e.stopPropagation(); navigate(`/products/${r.id}/edit`) }}>Edit</Button>
        <Button variant="danger" onClick={(e) => { e.stopPropagation(); setConfirm(r) }}>Delete</Button>
      </div>
    ) }]: []),
  ]), [navigate, role])

  const onDelete = async () => {
    const id = confirm.id
    dispatch(
      api.util.updateQueryData('getProducts', { page, q: debouncedQ, category: categories, minPrice, maxPrice }, (draft) => {
        draft.items = draft.items.filter((p) => p.id !== id)
        draft.total = Math.max(0, (draft.total || 0) - 1)
      })
    )
    await removeProduct(id)
    setConfirm(null)
  }

  const clearFilters = () => { setQ(''); setDebouncedQ(''); setCategories([]); setMinPrice(''); setMaxPrice(''); setPage(1); refetch() }

  return (
    <div className="space-y-3">
      <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-4">
        <Input label="Search" value={q} onChange={(e) => setQ(e.target.value)} />
        <div className="text-sm">
          <span className="mb-1 block">Category</span>
          <div className="flex gap-2">
            {['Electronics', 'Books', 'Clothing'].map((c) => (
              <label key={c} className="flex items-center gap-1">
                <input type="checkbox" checked={categories.includes(c)} onChange={(e) => {
                  setCategories((prev) => e.target.checked ? [...prev, c] : prev.filter((x) => x !== c))
                }} />
                <span>{c}</span>
              </label>
            ))}
          </div>
        </div>
        <Input label="Min Price" type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
        <Input label="Max Price" type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
      </div>
      <div className="flex gap-2">
        {role === 'admin' && <Link to="/products/create"><Button>Create</Button></Link>}
        <Button variant="secondary" onClick={clearFilters}>Clear</Button>
      </div>
      {isLoading ? (
        <div className="space-y-2">
          <Skeleton className="h-8" />
          <Skeleton className="h-48" />
        </div>
      ) : isError ? (
        <div>
          <div className="mb-2">Failed to load products.</div>
          <Button variant="secondary" onClick={() => refetch()}>Retry</Button>
        </div>
      ) : (
        <Table columns={columns} data={data?.items || []} onRowClick={(r) => navigate(`/products/${r.id}`)} footer={(
          <div className="flex items-center justify-between">
            <div>Total: {data?.total || 0}</div>
            <Pagination current={page} total={data?.total || 0} pageSize={data?.pageSize || 10} onChange={(p) => setPage(p)} />
          </div>
        )} />
      )}

      {(!isLoading && !isError && (data?.items?.length || 0) === 0) && (
        <div className="text-sm text-gray-500">No results</div>
      )}

      <Modal open={!!confirm} title="Confirm delete" onClose={() => setConfirm(null)}>
        <p>Are you sure you want to delete {confirm?.name}?</p>
        <div className="mt-3 flex justify-end gap-2">
          <Button variant="secondary" onClick={() => setConfirm(null)}>Cancel</Button>
          <Button variant="danger" onClick={onDelete} loading={removing}>Delete</Button>
        </div>
      </Modal>
    </div>
  )
}