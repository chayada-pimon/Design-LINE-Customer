"use client"

import { Check, Clock, Lock, LogIn, LogOut, MapPin } from "lucide-react"
import { useState } from "react"

function Badge({
  tone,
  icon,
  children,
}: {
  tone: "pending" | "locked" | "done"
  icon?: React.ReactNode
  children: React.ReactNode
}) {
  const toneClass =
    tone === "done"
      ? "bg-[var(--color-success-soft)] text-[var(--color-success)]"
      : tone === "pending"
        ? "bg-blue-50 text-[var(--color-brand-header)]"
        : "bg-[var(--color-slate-100)] text-[var(--color-text-muted)]"

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
  tone: "pending" | "active" | "locked" | "done"
  children: React.ReactNode
}) {
  const circleClass =
    tone === "done"
      ? "bg-[var(--color-success-soft)] text-[var(--color-success)]"
      : tone === "active" || tone === "pending"
        ? "bg-blue-50 text-[var(--color-brand-header)]"
        : "border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-subtle)]"

  return (
    <span className={`grid size-14 shrink-0 place-items-center rounded-full transition-colors ${circleClass}`}>
      {children}
    </span>
  )
}

function StepNumber({ tone, number }: { tone: "pending" | "active" | "locked" | "done"; number: number }) {
  const circleClass =
    tone === "done"
      ? "bg-[var(--color-success)] text-[var(--color-surface)]"
      : tone === "active" || tone === "pending"
        ? "bg-[var(--color-brand-header)] text-[var(--color-surface)]"
        : "bg-[var(--color-slate-300)] text-[var(--color-surface)]"

  return (
    <span
      className={`grid size-7 shrink-0 place-items-center rounded-full text-[length:var(--text-label)] font-bold transition-colors ${circleClass}`}
    >
      {number}
    </span>
  )
}

export function HousekeeperAttendanceSection() {
  const [isCheckedIn, setIsCheckedIn] = useState(false)
  const [isBranchCheckedIn, setIsBranchCheckedIn] = useState(false)
  const [checkedInAt, setCheckedInAt] = useState<string | null>(null)
  const [branchCheckedInAt, setBranchCheckedInAt] = useState<string | null>(null)

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
    setIsBranchCheckedIn(false)
    setCheckedInAt(null)
    setBranchCheckedInAt(null)
  }

  function checkInToBranch() {
    setBranchCheckedInAt(formatNow())
    setIsBranchCheckedIn(true)
  }

  function checkOutFromBranch() {
    setIsBranchCheckedIn(false)
    setBranchCheckedInAt(null)
  }

  return (
    <section className="px-4 pt-7" aria-labelledby="housekeeper-attendance-heading">
      <h2
        className="mb-3 text-[length:var(--text-h2)] font-bold text-[var(--color-text-muted)]"
        id="housekeeper-attendance-heading"
      >
        สถานะการทำงานวันนี้
      </h2>
      <div className="surface-card overflow-hidden rounded-[1.5rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
        <div className="grid grid-cols-[auto_1fr] gap-x-3">
          <div className="row-span-2 flex flex-col items-center">
            <div className="mt-[14px]">
              <StepNumber tone={isCheckedIn ? "done" : "active"} number={1} />
            </div>
            <div className="w-0 flex-1 border-l-2 border-dashed border-[var(--color-border)]" />
          </div>
          <div className="flex items-stretch gap-3 pb-5">
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
            className={`mt-1 flex min-h-12 w-full items-center justify-center gap-2 rounded-[var(--radius-btn)] px-4 text-[length:var(--text-lg)] font-bold text-[var(--color-surface)] shadow-sm outline-none transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)] ${
              isCheckedIn
                ? "bg-[var(--color-danger)] active:bg-[var(--color-red-800)]"
                : "bg-[var(--color-success)] active:bg-[var(--color-green-800)]"
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

          <div className="flex w-fit flex-col items-center self-start">
            <div className="h-[43px] w-0 border-l-2 border-dashed border-[var(--color-border)]" />
            <StepNumber tone={isBranchCheckedIn ? "done" : isCheckedIn ? "active" : "locked"} number={2} />
          </div>
          <div className="flex items-start gap-3 border-t border-[var(--color-border)] pt-4 mt-3">
            <StepIcon tone={isBranchCheckedIn ? "done" : isCheckedIn ? "active" : "locked"}>
              <MapPin aria-hidden="true" className="size-7" />
            </StepIcon>
            <div className="min-w-0 flex-1 pt-1">
              <p className="text-[1.125rem] font-bold leading-snug text-[var(--color-text-muted)]">เช็คอินสาขา</p>
              <p
                aria-live="polite"
                className="mt-0.5 flex items-center gap-1 text-[length:var(--text-label)] text-[var(--color-text-muted)]"
              >
                {isBranchCheckedIn && <Clock aria-hidden="true" className="size-3.5 shrink-0" />}
                {isBranchCheckedIn
                  ? `เช็คอินสาขาแล้วเมื่อ ${branchCheckedInAt} น.`
                  : isCheckedIn
                    ? "หากไม่ได้เข้าสาขา ไม่จำเป็นต้องเช็คอินส่วนนี้"
                    : "เปิดใช้หลังเช็คอินเข้างาน"}
              </p>
              {(isBranchCheckedIn || !isCheckedIn) && (
                <div className="mt-2">
                  {isBranchCheckedIn ? (
                    <Badge icon={<Check aria-hidden="true" className="size-3" />} tone="done">
                      เสร็จสิ้น
                    </Badge>
                  ) : (
                    <Badge icon={<Lock aria-hidden="true" className="size-3" />} tone="locked">
                      รอดำเนินการ
                    </Badge>
                  )}
                </div>
              )}
            </div>
          </div>

          {isCheckedIn && (
            <>
              <div />
              <div className="mt-4 flex gap-2">
                <button
                  className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-[var(--radius-btn)] bg-[var(--color-success)] px-4 text-[length:var(--text-lg)] font-bold text-[var(--color-surface)] shadow-sm outline-none transition-colors active:bg-[var(--color-green-800)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]"
                  onClick={checkInToBranch}
                  type="button"
                >
                  <MapPin aria-hidden="true" className="size-5" />
                  เช็คอินสาขา
                </button>
                <button
                  className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-[var(--radius-btn)] bg-[var(--color-danger)] px-4 text-[length:var(--text-lg)] font-bold text-[var(--color-surface)] shadow-sm outline-none transition-colors active:bg-[var(--color-red-800)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)] disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={!isBranchCheckedIn}
                  onClick={checkOutFromBranch}
                  type="button"
                >
                  <LogOut aria-hidden="true" className="size-5" />
                  เช็คเอาท์สาขา
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
