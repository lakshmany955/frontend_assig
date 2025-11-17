import { useMemo } from 'react'

export default function Table({ columns, data, footer, onRowClick }) {
  const cols = useMemo(() => columns, [columns])
  return (
    <div className="overflow-x-auto rounded-md border border-gray-200 dark:border-gray-700">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            {cols.map((c) => (
              <th key={c.key} className="px-4 py-2 text-left text-xs font-semibold text-gray-600 dark:text-gray-300">{c.header}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
          {data.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer" onClick={() => onRowClick?.(row)}>
              {cols.map((c) => (
                <td key={c.key} className="px-4 py-2 text-sm">{typeof c.cell === 'function' ? c.cell(row) : row[c.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
        {footer && (
          <tfoot className="bg-gray-50 dark:bg-gray-800"><tr><td className="px-4 py-2" colSpan={cols.length}>{footer}</td></tr></tfoot>
        )}
      </table>
    </div>
  )
}