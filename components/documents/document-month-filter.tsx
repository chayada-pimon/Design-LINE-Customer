import { formatThaiMonth } from "@/components/documents/document-data"

export const ALL_MONTHS = "all"

type DocumentMonthFilterProps = {
  months: string[]
  value: string
  onChange: (value: string) => void
}

export function DocumentMonthFilter({ months, value, onChange }: DocumentMonthFilterProps) {
  return (
    <select
      aria-label="กรองตามเดือน"
      className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1.5 text-[length:var(--text-h2)] font-semibold text-[var(--color-text)] shadow-[var(--shadow-card)]"
      onChange={(event) => onChange(event.target.value)}
      value={value}
    >
      <option value={ALL_MONTHS}>ทุกเดือน</option>
      {months.map((month) => (
        <option key={month} value={month}>
          {formatThaiMonth(month)}
        </option>
      ))}
    </select>
  )
}
