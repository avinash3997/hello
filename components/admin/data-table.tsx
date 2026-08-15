'use client'

import { Button } from '@/components/ui/button'
import { useState } from 'react'

export interface Column<T> {
  header: string
  accessor: keyof T | ((item: T) => string | number)
  className?: string
}

export interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  onEdit?: (item: T) => void
  onDelete?: (item: T) => void
  onAdd?: () => void
  title: string
}

export function DataTable<T extends { id?: string }>({
  columns,
  data,
  onEdit,
  onDelete,
  onAdd,
  title,
}: DataTableProps<T>) {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const getValue = (item: T, accessor: Column<T>['accessor']) => {
    if (typeof accessor === 'function') {
      return accessor(item)
    }
    return String(item[accessor] || '')
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-xl font-bold text-ink">{title}</h3>
        {onAdd && (
          <Button
            onClick={onAdd}
            className="bg-accent text-ink hover:bg-accent/90"
          >
            + Add {title.slice(0, -1)}
          </Button>
        )}
      </div>

      <div className="bg-surface rounded-lg border border-border overflow-hidden">
        <table className="w-full">
          <thead className="bg-paper border-b border-border">
            <tr>
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  className={`px-4 py-3 text-left text-xs font-medium text-ink uppercase ${
                    col.className || ''
                  }`}
                >
                  {col.header}
                </th>
              ))}
              {(onEdit || onDelete) && (
                <th className="px-4 py-3 text-right text-xs font-medium text-ink uppercase">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (onEdit || onDelete ? 1 : 0)}
                  className="px-4 py-8 text-center text-ink/60"
                >
                  No records found
                </td>
              </tr>
            ) : (
              data.map((item, idx) => (
                <tr
                  key={item.id || idx}
                  className={`border-b border-border hover:bg-paper transition-colors cursor-pointer ${
                    selectedId === item.id ? 'bg-accent/5' : ''
                  }`}
                  onClick={() => setSelectedId(item.id || null)}
                >
                  {columns.map((col, colIdx) => (
                    <td
                      key={colIdx}
                      className={`px-4 py-3 text-ink ${col.className || ''}`}
                    >
                      {getValue(item, col.accessor)}
                    </td>
                  ))}
                  {(onEdit || onDelete) && (
                    <td className="px-4 py-3 text-right space-x-2">
                      {onEdit && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation()
                            onEdit(item)
                          }}
                          className="text-accent hover:bg-accent/10"
                        >
                          Edit
                        </Button>
                      )}
                      {onDelete && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation()
                            onDelete(item)
                          }}
                          className="text-below-basic hover:bg-below-basic/10"
                        >
                          Delete
                        </Button>
                      )}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
