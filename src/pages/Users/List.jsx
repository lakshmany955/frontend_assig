import { useMemo, useState, useEffect } from 'react'
import { useGetUsersQuery, useDeleteUserMutation } from '../../store/api'
import Table from '../../components/Table'
import Button from '../../components/Button'
import Input from '../../components/Input'
import Pagination from '../../components/Pagination'
import Modal from '../../components/Modal'
import Loader from '../../components/Loader'
import Skeleton from '../../components/Skeleton'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { api } from '../../store/api'
import { Link, useNavigate } from 'react-router-dom'

export default function UsersList() {
  const [page, setPage] = useState(1)
  const [q, setQ] = useState('')
  const [debouncedQ, setDebouncedQ] = useState('')
  const [role, setRole] = useState('')
  useEffect(() => { const h = setTimeout(() => setDebouncedQ(q), 300); return () => clearTimeout(h) }, [q])
  const { data, isLoading, isError, refetch } = useGetUsersQuery({ page, q: debouncedQ, role })
  const [remove, { isLoading: removing }] = useDeleteUserMutation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [confirm, setConfirm] = useState(null)

  const columns = useMemo(() => ([
    { key: 'id', header: 'ID' },
    { key: 'name', header: 'Name' },
    { key: 'email', header: 'Email' },
    { key: 'role', header: 'Role' },
    { key: 'createdAt', header: 'Created', cell: (r) => new Date(r.createdAt).toLocaleString() },
    { key: 'actions', header: 'Actions', cell: (r) => (
      <div className="flex gap-2">
        <Button variant="secondary" onClick={(e) => { e.stopPropagation(); navigate(`/users/${r.id}`) }}>View</Button>
        <Button variant="secondary" onClick={(e) => { e.stopPropagation(); navigate(`/users/${r.id}/edit`) }}>Edit</Button>
        <Button variant="danger" onClick={(e) => { e.stopPropagation(); setConfirm(r) }}>Delete</Button>
      </div>
    ) },
  ]), [navigate])

  const onDelete = async () => {
    const id = confirm.id
    dispatch(
      api.util.updateQueryData('getUsers', { page, q: debouncedQ, role }, (draft) => {
        draft.items = draft.items.filter((u) => u.id !== id)
        draft.total = Math.max(0, (draft.total || 0) - 1)
      })
    )
    await remove(id)
    setConfirm(null)
    toast.success('User deleted')
  }

  const clearFilters = () => { setQ(''); setDebouncedQ(''); setRole(''); setPage(1); refetch() }

  return (
    <div className="space-y-3">
      <div className="flex items-end gap-2">
        <Input label="Search" value={q} onChange={(e) => setQ(e.target.value)} />
        <label className="text-sm">
          <span className="mb-1 block">Role</span>
          <select value={role} onChange={(e) => setRole(e.target.value)} className="w-40 rounded-md border px-3 py-2">
            <option value="">All</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </label>
        <Link to="/users/create"><Button>Create</Button></Link>
        <Button variant="secondary" onClick={clearFilters}>Clear</Button>
      </div>

      {isLoading ? (
        <div className="space-y-2">
          <Skeleton className="h-8" />
          <Skeleton className="h-48" />
        </div>
      ) : isError ? (
        <div>
          <div className="mb-2">Failed to load users.</div>
          <Button variant="secondary" onClick={() => refetch()}>Retry</Button>
        </div>
      ) : (
        <Table columns={columns} data={data?.items || []} onRowClick={(r) => navigate(`/users/${r.id}`)} footer={(
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