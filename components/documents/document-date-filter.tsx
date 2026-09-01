"use client"

import { Calendar, ChevronDown, ChevronLeft, ChevronRight, X } from "lucide-react"
import { useEffect, useState } from "react"

import { formatThaiDate } from "@/components/documents/document-data"

export const ALL_DATES = "all"

const WEEKDAY_LABELS = ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"]

function toDateKey(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
}

function formatThaiMonthYear(year: number, month: number) {
  return new Date(year, month, 1).toLocaleDateString("th-TH", { month: "long", year: "numeric" })
}

export function DocumentDateFilter({
  markedDates,
  value,
  onChange,
}: {
  markedDates: string[]
  value: string
  onChange: (dateKey: string) => void
}) {
  const [open, setOpen] = useState(false)
  const [visible, setVisible] = useState(false)

  const today = new Date()
  const initial = value !== ALL_DATES ? new Date(value) : today
  const [viewYear, setViewYear] = useState(initial.getFullYear())
  const [viewMonth, setViewMonth] = useState(initial.getMonth())

  const label = value === ALL_DATES ? "เลือกวันที่" : formatThaiDate(value)
  const markedSet = new Set(markedDates)

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

  function select(dateKey: string) {
    onChange(dateKey)
    close()
  }

  function goToPreviousMonth() {
    if (viewMonth === 0) {
      setViewYear((year) => year - 1)
      setViewMonth(11)
    } else {
      setViewMonth((month) => month - 1)
    }
  }

  function goToNextMonth() {
    if (viewMonth === 11) {
      setViewYear((year) => year + 1)
      setViewMonth(0)
    } else {
      setViewMonth((month) => month + 1)
    }
  }

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
  const firstWeekday = new Date(viewYear, viewMonth, 1).getDay()
  const todayKey = toDateKey(today.getFullYear(), today.getMonth(), today.getDate())

  return (
    <div>
      <button
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label="กรองตามวันที่เผยแพร่"
        className="flex items-center gap-1.5 rounded-full border border-[var(--color-border-strong)] bg-[var(--color-surface)] py-1.5 pr-3 pl-2.5 outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]"
        onClick={() => setOpen(true)}
        type="button"
      >
        <Calendar aria-hidden="true" className="size-4 shrink-0 text-[var(--color-brand-header)]" />
        <span className="max-w-32 truncate text-[length:var(--text-caption)] font-bold text-[var(--color-text)]">
          {label}
        </span>
        <ChevronDown aria-hidden="true" className="size-3.5 shrink-0 text-[var(--color-text-subtle)]" />
      </button>

      {open ? (
        <div aria-modal="true" className="fixed inset-0 z-50" role="dialog">
          <div
            className={`absolute inset-0 bg-black/50 transition-opacity duration-200 ${
              visible ? "opacity-100" : "opacity-0"
            }`}
            onClick={close}
          />
          <div
            aria-label="เลือกวันที่เผยแพร่"
            className={`absolute inset-x-0 bottom-0 rounded-t-[var(--radius-card)] bg-[var(--color-surface)] p-3 pb-5 shadow-[var(--shadow-card)] transition-transform duration-200 ${
              visible ? "translate-y-0" : "translate-y-full"
            }`}
          >
            <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-3">
              <p className="text-[length:var(--text-base)] font-bold text-[var(--color-text)]">เลือกวันที่เผยแพร่</p>
              <button
                aria-label="ปิด"
                className="grid size-8 place-items-center rounded-full text-[var(--color-text-subtle)] active:bg-[var(--color-surface-sunken)]"
                onClick={close}
                type="button"
              >
                <X aria-hidden="true" className="size-5" />
              </button>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <button
                aria-label="เดือนก่อนหน้า"
                className="icon-button grid size-8 place-items-center rounded-full text-[var(--color-text-muted)] outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]"
                onClick={goToPreviousMonth}
                type="button"
              >
                <ChevronLeft aria-hidden="true" className="size-4" />
              </button>
              <p className="text-[length:var(--text-caption)] font-bold text-[var(--color-text)]">
                {formatThaiMonthYear(viewYear, viewMonth)}
              </p>
              <button
                aria-label="เดือนถัดไป"
                className="icon-button grid size-8 place-items-center rounded-full text-[var(--color-text-muted)] outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]"
                onClick={goToNextMonth}
                type="button"
              >
                <ChevronRight aria-hidden="true" className="size-4" />
              </button>
            </div>

            <div className="mt-2 grid grid-cols-7 gap-1">
              {WEEKDAY_LABELS.map((label) => (
                <span
                  className="grid h-7 place-items-center text-[length:var(--text-caption)] font-bold text-[var(--color-text-subtle)]"
                  key={label}
                >
                  {label}
                </span>
              ))}

              {Array.from({ length: firstWeekday }).map((_, index) => (
                <span key={`blank-${index}`} />
              ))}

              {Array.from({ length: daysInMonth }).map((_, index) => {
                const day = index + 1
                const dateKey = toDateKey(viewYear, viewMonth, day)
                const selected = value === dateKey
                const marked = markedSet.has(dateKey)
                const isToday = dateKey === todayKey

                return (
                  <button
                    aria-label={formatThaiDate(dateKey)}
                    aria-pressed={selected}
                    className={`relative grid h-8 place-items-center rounded-full text-[length:var(--text-caption)] font-semibold outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)] ${
                      selected
                        ? "bg-[var(--color-brand-header)] text-[var(--color-surface)]"
                        : isToday
                          ? "border border-[var(--color-brand-header)] text-[var(--color-brand-header)]"
                          : "text-[var(--color-text)] active:bg-[var(--color-surface-sunken)]"
                    }`}
                    key={dateKey}
                    onClick={() => select(dateKey)}
                    type="button"
                  >
                    {day}
                    {marked && !selected ? (
                      <span
                        aria-hidden="true"
                        className="absolute bottom-0.5 size-1 rounded-full bg-[var(--color-brand-header)]"
                      />
                    ) : null}
                  </button>
                )
              })}
            </div>

            <button
              className="mt-3 w-full rounded-[var(--radius-btn)] border border-[var(--color-border)] py-2 text-center text-[length:var(--text-caption)] font-bold text-[var(--color-text-muted)] active:bg-[var(--color-surface-sunken)]"
              onClick={() => select(ALL_DATES)}
              type="button"
            >
              ทั้งหมด
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}
