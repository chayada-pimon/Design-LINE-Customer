import { getDaysRemaining } from "@/components/documents/document-data"

export function DocumentTimeBadge({ dueDate }: { dueDate: string }) {
  const days = getDaysRemaining(dueDate)
  const overdue = days < 0
  const urgent = !overdue && days <= 3

  const classes = overdue
    ? "bg-[var(--color-danger-soft)] text-[var(--color-danger)]"
    : urgent
      ? "bg-amber-100 text-amber-700"
      : "bg-blue-100 text-[var(--color-brand-header)]"

  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-1 text-[length:var(--text-caption)] font-bold ${classes}`}
    >
      {overdue ? "เกินกำหนด" : `เหลือ ${days} วัน`}
    </span>
  )
}
