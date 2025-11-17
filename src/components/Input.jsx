export default function Input({ label, className = '', error, ...props }) {
  const errorCls = error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-700 focus:ring-blue-500'
  return (
    <label className="block text-sm">
      {label && <span className="mb-1 block text-gray-600 dark:text-gray-300">{label}</span>}
      <input className={`w-full rounded-md bg-white dark:bg-gray-800 px-3 py-2 focus:outline-none focus:ring-2 ${errorCls} ${className}`} {...props} />
      {error && <span className="mt-1 block text-xs text-red-600">{error}</span>}
    </label>
  )
}