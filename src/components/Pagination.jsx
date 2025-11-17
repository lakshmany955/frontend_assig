export default function Pagination({ current = 1, total = 0, pageSize = 10, onChange }) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const mkBtn = (p, label = p, disabled = false, active = false) => (
    <button
      key={label}
      disabled={disabled}
      onClick={() => !disabled && onChange?.(p)}
      className={`min-w-[2rem] rounded px-2 py-1 text-sm border ${active ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
    >{label}</button>
  )
  const items = []
  items.push(mkBtn(Math.max(1, current - 1), 'Prev', current === 1))
  const window = 2
  const start = Math.max(1, current - window)
  const end = Math.min(totalPages, current + window)
  if (start > 1) items.push(mkBtn(1, 1, false, current === 1))
  if (start > 2) items.push(<span key="l-ellipsis" className="px-2">…</span>)
  for (let p = start; p <= end; p++) items.push(mkBtn(p, p, false, p === current))
  if (end < totalPages - 1) items.push(<span key="r-ellipsis" className="px-2">…</span>)
  if (end < totalPages) items.push(mkBtn(totalPages, totalPages, false, current === totalPages))
  items.push(mkBtn(Math.min(totalPages, current + 1), 'Next', current === totalPages))
  return <div className="flex items-center gap-1">{items}</div>
}