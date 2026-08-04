"use client"

import { Check, Clock, LogIn, LogOut } from "lucide-react"
import { useState } from "react"

function Badge({
  tone,
  icon,
  children,
}: {
  tone: "pending" | "done"
  icon: React.ReactNode
  children: React.ReactNode
}) {
  const toneClass =
    tone === "done"
      ? "bg-[var(--color-success-soft)] text-[var(--color-success)]"
      : "bg-blue-50 text-[var(--color-brand-header)]"

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-[length:var(--text-caption)] font-semibold ${toneClass}`}
    >
      {icon}
      {children}
    </span>
  )
}

function StepIcon({
  tone,
  children,
}: {
  tone: "active" | "done"
  children: React.ReactNode
}) {
  const circleClass =
    tone === "done"
      ? "bg-[var(--color-success-soft)] text-[var(--color-success)]"
      : "bg-blue-50 text-[var(--color-brand-header)]"

  return (
    <span className={`grid size-14 shrink-0 place-items-center rounded-full transition-colors ${circleClass}`}>
      {children}
    </span>
  )
}

export function EmployeeCheckInSection() {
  const [isCheckedIn, setIsCheckedIn] = useState(false)
  const [checkedInAt, setCheckedInAt] = useState<string | null>(null)

  function formatNow() {
    return new Intl.DateTimeFormat("th-TH", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date())
  }

  function checkInToWork() {
    setCheckedInAt(formatNow())
    setIsCheckedIn(true)
  }

  function checkOutFromWork() {
    setIsCheckedIn(false)
    setCheckedInAt(null)
  }

  return (
    <section className="px-4 pt-7" aria-labelledby="attendance-heading">
      <h2
        className="mb-3 text-[length:var(--text-h2)] font-bold text-[var(--color-text-muted)]"
        id="attendance-heading"
      >
        สถานะการทำงานวันนี้
      </h2>
      <div className="surface-card overflow-hidden rounded-[1.5rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
        <div className="flex items-start gap-3">
          <StepIcon tone={isCheckedIn ? "done" : "active"}>
            <Clock aria-hidden="true" className="size-7" />
          </StepIcon>
          <div className="min-w-0 flex-1 pt-1">
            <p className="text-[1.125rem] font-bold leading-snug">เช็คอินเข้างาน</p>
            <p
              aria-live="polite"
              className="mt-0.5 flex items-center gap-1 text-[length:var(--text-label)] text-[var(--color-text-muted)]"
            >
              {isCheckedIn && <Clock aria-hidden="true" className="size-3.5 shrink-0" />}
              {isCheckedIn ? `เช็คอินแล้วเมื่อ ${checkedInAt} น.` : "ยังไม่ได้เช็คอินวันนี้"}
            </p>
            {isCheckedIn && (
              <div className="mt-2">
                <Badge icon={<Check aria-hidden="true" className="size-3" />} tone="done">
                  เสร็จสิ้น
                </Badge>
              </div>
            )}
          </div>
        </div>
        <button
          className={`mt-4 flex min-h-12 w-full items-center justify-center gap-2 rounded-[var(--radius-btn)] px-4 text-[length:var(--text-lg)] font-bold text-[var(--color-surface)] shadow-sm outline-none transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)] ${
            isCheckedIn
              ? "bg-[var(--color-checkout)] active:bg-[var(--color-red-800)]"
              : "bg-[var(--color-checkin)] active:bg-[var(--color-green-800)]"
          }`}
          onClick={isCheckedIn ? checkOutFromWork : checkInToWork}
          type="button"
        >
          {isCheckedIn ? (
            <LogOut aria-hidden="true" className="size-5" />
          ) : (
            <LogIn aria-hidden="true" className="size-5" />
          )}
          {isCheckedIn ? "เช็คเอาท์ออกงาน" : "เช็คอินเข้างาน"}
        </button>
      </div>
    </section>
  )
}
