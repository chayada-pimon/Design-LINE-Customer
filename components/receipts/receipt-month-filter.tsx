"use client"

import { Calendar, Check, ChevronDown } from "lucide-react"
import { useEffect, useRef, useState } from "react"

import { formatThaiMonth } from "@/components/receipts/receipt-data"

const ALL_MONTHS = "all"

export { ALL_MONTHS }

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
  const containerRef = useRef<HTMLDivElement>(null)

  const label = value === ALL_MONTHS ? "ทุกช่วงเวลา" : formatThaiMonth(value)

  useEffect(() => {
    if (!open) return

    function handlePointerDown(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false)
    }

    document.addEventListener("pointerdown", handlePointerDown)
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [open])

  function select(monthKey: string) {
    onChange(monthKey)
    setOpen(false)
  }

  return (
    <div className="relative" ref={containerRef}>
      <span className="mb-1.5 block text-[length:var(--text-caption)] font-bold text-[var(--color-text-muted)]">
        กรองตามช่วงเวลา
      </span>
      <button
        aria-expanded={open}
        aria-haspopup="listbox"
        className="flex w-full items-center gap-2 rounded-[var(--radius-btn)] border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-3.5 py-2.5 text-left outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]"
        onClick={() => setOpen((current) => !current)}
        type="button"
      >
        <span className="grid size-7 shrink-0 place-items-center rounded-full bg-blue-100 text-[var(--color-brand-header)]">
          <Calendar aria-hidden="true" className="size-4" />
        </span>
        <span className="min-w-0 flex-1 truncate text-[length:var(--text-base)] font-bold text-[var(--color-text)]">
          {label}
        </span>
        <ChevronDown
          aria-hidden="true"
          className={`size-4 shrink-0 text-[var(--color-text-subtle)] transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open ? (
        <ul
          className="absolute inset-x-0 top-[calc(100%+0.375rem)] z-10 overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-card)]"
          role="listbox"
        >
          <li>
            <button
              aria-selected={value === ALL_MONTHS}
              className={`flex w-full items-center justify-between gap-2 px-4 py-2.5 text-left text-[length:var(--text-base)] font-semibold ${
                value === ALL_MONTHS
                  ? "bg-blue-50 text-[var(--color-brand-header)]"
                  : "text-[var(--color-text)] active:bg-[var(--color-surface-sunken)]"
              }`}
              onClick={() => select(ALL_MONTHS)}
              role="option"
              type="button"
            >
              ทุกช่วงเวลา
              {value === ALL_MONTHS ? <Check aria-hidden="true" className="size-4" /> : null}
            </button>
          </li>
          {months.map((monthKey) => (
            <li key={monthKey}>
              <button
                aria-selected={value === monthKey}
                className={`flex w-full items-center justify-between gap-2 border-t border-[var(--color-border)] px-4 py-2.5 text-left text-[length:var(--text-base)] font-semibold ${
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
      ) : null}
    </div>
  )
}
