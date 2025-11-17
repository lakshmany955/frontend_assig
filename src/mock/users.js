let users = Array.from({ length: 36 }).map((_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@company.com`,
  role: i % 3 === 0 ? 'admin' : 'user',
  createdAt: new Date(Date.now() - i * 86400000).toISOString(),
}))

const wait = (ms = 300) => new Promise((res) => setTimeout(res, ms))

export async function list({ page = 1, q = '', role, pageSize = 10 } = {}) {
  await wait(300)
  let data = users
  if (q) data = data.filter((u) => u.name.toLowerCase().includes(q.toLowerCase()) || u.email.toLowerCase().includes(q.toLowerCase()))
  if (role) data = data.filter((u) => u.role === role)
  const total = data.length
  const start = (page - 1) * pageSize
  const items = data.slice(start, start + pageSize)
  return { items, total, page, pageSize }
}

export async function getById(id) {
  await wait(200)
  return users.find((u) => u.id === Number(id))
}

export async function create(payload) {
  await wait(200)
  const id = users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1
  const user = { id, createdAt: new Date().toISOString(), role: 'user', ...payload }
  users.unshift(user)
  return user
}

export async function update(id, changes) {
  await wait(200)
  users = users.map((u) => (u.id === Number(id) ? { ...u, ...changes } : u))
  return users.find((u) => u.id === Number(id))
}

export async function remove(id) {
  await wait(200)
  const before = users.length
  users = users.filter((u) => u.id !== Number(id))
  return { success: before !== users.length }
}