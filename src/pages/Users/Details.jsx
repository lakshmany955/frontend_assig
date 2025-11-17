import { useParams, useNavigate } from 'react-router-dom'
import { useGetUserQuery, useDeleteUserMutation } from '../../store/api'
import Loader from '../../components/Loader'
import Card from '../../components/Card'
import Button from '../../components/Button'
import Modal from '../../components/Modal'
import { useSelector } from 'react-redux'
import { useState } from 'react'

export default function UserDetails() {
  const { id } = useParams()
  const { data, isLoading } = useGetUserQuery(id)
  const [remove, { isLoading: removing }] = useDeleteUserMutation()
  const role = useSelector((s) => s.auth.role)
  const [confirm, setConfirm] = useState(false)
  const navigate = useNavigate()
  if (isLoading) return <Loader />
  return (
    <Card title={`User ${data.id}`}>
      <div className="space-y-1 text-sm">
        <div><b>Name:</b> {data.name}</div>
        <div><b>Email:</b> {data.email}</div>
        <div><b>Role:</b> {data.role}</div>
        <div><b>Created:</b> {new Date(data.createdAt).toLocaleString()}</div>
      </div>
      {role === 'admin' && (
        <div className="mt-3 flex gap-2">
          <Button variant="secondary" onClick={() => navigate(`/users/${id}/edit`)}>Edit</Button>
          <Button variant="danger" onClick={() => setConfirm(true)}>Delete</Button>
        </div>
      )}
      <Modal open={confirm} title="Confirm delete" onClose={() => setConfirm(false)}>
        <p>Delete this user?</p>
        <div className="mt-3 flex justify-end gap-2">
          <Button variant="secondary" onClick={() => setConfirm(false)}>Cancel</Button>
          <Button variant="danger" loading={removing} onClick={async () => { await remove(Number(id)); navigate('/users') }}>Delete</Button>
        </div>
      </Modal>
    </Card>
  )
}