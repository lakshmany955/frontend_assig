export default function Card({ title, children, footer }) {
  return (
    <div className="rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 shadow">
      {title && <h3 className="mb-3 text-lg font-semibold">{title}</h3>}
      <div>{children}</div>
      {footer && <div className="mt-3 border-t border-gray-200 dark:border-gray-700 pt-3">{footer}</div>}
    </div>
  )
}