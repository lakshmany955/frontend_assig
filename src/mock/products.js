let products = Array.from({ length: 120 }).map((_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  description: `Description for product ${i + 1}`,
  price: Math.round(Math.random() * 9000) / 100 + 10,
  category: ['Electronics', 'Books', 'Clothing'][i % 3],
  stock: 50 + (i % 20),
  createdAt: new Date(Date.now() - i * 43200000).toISOString(),
}))

const wait = (ms = 300) => new Promise((res) => setTimeout(res, ms))

export async function list({ page = 1, q = '', category, minPrice, maxPrice, pageSize = 10 } = {}) {
  await wait(300)
  let data = products
  if (q) data = data.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()) || p.description.toLowerCase().includes(q.toLowerCase()))
  if (Array.isArray(category) ? category.length : !!category) {
    if (Array.isArray(category)) data = data.filter((p) => category.includes(p.category))
    else data = data.filter((p) => p.category === category)
  }
  if (minPrice != null) data = data.filter((p) => p.price >= Number(minPrice))
  if (maxPrice != null) data = data.filter((p) => p.price <= Number(maxPrice))
  const total = data.length
  const start = (page - 1) * pageSize
  const items = data.slice(start, start + pageSize)
  return { items, total, page, pageSize }
}

export async function getById(id) {
  await wait(200)
  return products.find((p) => p.id === Number(id))
}

export async function create(payload) {
  await wait(200)
  const id = products.length ? Math.max(...products.map((p) => p.id)) + 1 : 1
  const product = { id, createdAt: new Date().toISOString(), ...payload }
  products.unshift(product)
  return product
}

export async function update(id, changes) {
  await wait(200)
  products = products.map((p) => (p.id === Number(id) ? { ...p, ...changes } : p))
  return products.find((p) => p.id === Number(id))
}

export async function remove(id) {
  await wait(200)
  const before = products.length
  products = products.filter((p) => p.id !== Number(id))
  return { success: before !== products.length }
}

export async function stats() {
  await wait(200)
  const map = {}
  for (const p of products) {
    map[p.category] = (map[p.category] || 0) + 1
  }
  return Object.entries(map).map(([category, count]) => ({ category, count }))
}