export default function Alert({ type = 'info', children }) {
  const styles = {
    info: 'bg-blue-50 text-blue-700 border-blue-200',
    success: 'bg-green-50 text-green-700 border-green-200',
    error: 'bg-red-50 text-red-700 border-red-200',
    warning: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  }
  return <div className={`rounded-md border px-3 py-2 text-sm ${styles[type]}`}>{children}</div>
}