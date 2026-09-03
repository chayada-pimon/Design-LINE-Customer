"use client"

import { Calendar, Check, ChevronDown, X } from "lucide-react"
import { useEffect, useMemo, useState } from "react"

import { formatThaiMonth, formatThaiYear } from "@/components/receipts/receipt-data"

const ALL_MONTHS = "all"
const LAST_3_MONTHS = "last3"
const LAST_6_MONTHS = "last6"
const YEAR_PREFIX = "year:"

export { ALL_MONTHS, LAST_3_MONTHS, LAST_6_MONTHS }

export function matchesMonthFilter(receiptMonthKey: string, filterValue: string, months: string[]) {
  if (filterValue === ALL_MONTHS) return true
  if (filterValue === LAST_3_MONTHS) return months.slice(0, 3).includes(receiptMonthKey)
  if (filterValue === LAST_6_MONTHS) return months.slice(0, 6).includes(receiptMonthKey)
  if (filterValue.startsWith(YEAR_PREFIX)) {
    return receiptMonthKey.startsWith(filterValue.slice(YEAR_PREFIX.length))
  }
  return receiptMonthKey === filterValue
}

export function formatMonthFilterLabel(value: string) {
  if (value === ALL_MONTHS) return "ทุกช่วงเวลา"
  if (value === LAST_3_MONTHS) return "3 เดือนล่าสุด"
  if (value === LAST_6_MONTHS) return "6 เดือนล่าสุด"
  if (value.startsWith(YEAR_PREFIX)) return `ปี ${formatThaiYear(value.slice(YEAR_PREFIX.length))}`
  return formatThaiMonth(value)
}

export function ReceiptMonthFilter({
  months,
  value,
  onChange,
}: {
  months: string[]
  value: string
  onChange: (monthKey: string) => void
}) {
  const [open, setOpen] = useState(false)
  const [visible, setVisible] = useState(false)

  const label = formatMonthFilterLabel(value)
  const currentYearKey = `${YEAR_PREFIX}${new Date().getFullYear()}`

  const groupedMonths = useMemo(() => {
    const groups: { year: string; months: string[] }[] = []
    for (const monthKey of months) {
      const year = monthKey.slice(0, 4)
      const lastGroup = groups[groups.length - 1]
      if (lastGroup && lastGroup.year === year) {
        lastGroup.months.push(monthKey)
      } else {
        groups.push({ year, months: [monthKey] })
      }
    }
    return groups
  }, [months])

  const showYearHeaders = groupedMonths.length > 1

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = "hidden"
    const raf = requestAnimationFrame(() => setVisible(true))

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") close()
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.body.style.overflow = ""
      cancelAnimationFrame(raf)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [open])

  function close() {
    setVisible(false)
    setTimeout(() => setOpen(false), 200)
  }

  function select(monthKey: string) {
    onChange(monthKey)
    close()
  }

  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-[length:var(--text-caption)] font-bold text-[var(--color-text-muted)]">
        กรองตามช่วงเวลา
      </span>
      <button
        aria-expanded={open}
        aria-haspopup="dialog"
        className="inline-flex max-w-[65%] items-center gap-1.5 rounded-full border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-3.5 py-2 text-left outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]"
        onClick={() => setOpen(true)}
        type="button"
      >
        <Calendar aria-hidden="true" className="size-4 shrink-0 text-[var(--color-brand-header)]" />
        <span className="min-w-0 truncate text-[length:var(--text-h2)] font-bold text-[var(--color-text)]">
          {label}
        </span>
        <ChevronDown aria-hidden="true" className="size-4 shrink-0 text-[var(--color-text-subtle)]" />
      </button>

      {open ? (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true">
          <div
            className={`absolute inset-0 bg-black/50 transition-opacity duration-200 ${
              visible ? "opacity-100" : "opacity-0"
            }`}
            onClick={close}
          />
          <div
            className={`absolute inset-x-0 bottom-0 max-h-[85vh] rounded-t-[var(--radius-card)] bg-[var(--color-surface)] shadow-[var(--shadow-card)] transition-transform duration-200 ${
              visible ? "translate-y-0" : "translate-y-full"
            } flex flex-col`}
          >
            <div className="flex shrink-0 items-center justify-between border-b border-[var(--color-border)] px-4 py-3">
              <p className="text-[length:var(--text-base)] font-bold text-[var(--color-text)]">
                กรองตามช่วงเวลา
              </p>
              <button
                aria-label="ปิด"
                className="grid size-8 place-items-center rounded-full text-[var(--color-text-subtle)] active:bg-[var(--color-surface-sunken)]"
                onClick={close}
                type="button"
              >
                <X aria-hidden="true" className="size-5" />
              </button>
            </div>

            <div className="shrink-0 border-b border-[var(--color-border)] px-4 py-3">
              <div className="flex flex-wrap gap-2">
                {[
                  { key: ALL_MONTHS, label: "ทั้งหมด" },
                  { key: LAST_3_MONTHS, label: "3 เดือนล่าสุด" },
                  { key: LAST_6_MONTHS, label: "6 เดือนล่าสุด" },
                  { key: currentYearKey, label: "ปีนี้" },
                ].map((chip) => (
                  <button
                    aria-pressed={value === chip.key}
                    className={`rounded-full border px-3.5 py-1.5 text-[length:var(--text-h2)] font-bold transition-colors ${
                      value === chip.key
                        ? "border-[var(--color-brand-header)] bg-blue-50 text-[var(--color-brand-header)]"
                        : "border-[var(--color-border-strong)] text-[var(--color-text)] active:bg-[var(--color-surface-sunken)]"
                    }`}
                    key={chip.key}
                    onClick={() => select(chip.key)}
                    type="button"
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            </div>

            <ul className="min-h-0 flex-1 overflow-y-auto px-2 py-2" role="listbox">
              {groupedMonths.map((group) => (
                <li key={group.year}>
                  {showYearHeaders ? (
                    <p className="px-2.5 pb-1.5 pt-3 text-[length:var(--text-h2)] font-bold text-[var(--color-text-subtle)] first:pt-1">
                      ปี {formatThaiYear(group.year)}
                    </p>
                  ) : null}
                  <ul>
                    {group.months.map((monthKey) => (
                      <li key={monthKey}>
                        <button
                          aria-selected={value === monthKey}
                          className={`flex w-full items-center justify-between gap-2 rounded-[var(--radius-btn)] px-2.5 py-2.5 text-left text-[length:var(--text-base)] font-semibold ${
                            value === monthKey
                              ? "bg-blue-50 text-[var(--color-brand-header)]"
                              : "text-[var(--color-text)] active:bg-[var(--color-surface-sunken)]"
                          }`}
                          onClick={() => select(monthKey)}
                          role="option"
                          type="button"
                        >
                          <span className="truncate">{formatThaiMonth(monthKey)}</span>
                          {value === monthKey ? <Check aria-hidden="true" className="size-4 shrink-0" /> : null}
                        </button>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  )
}
