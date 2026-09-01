"use client"

import { Copy, Pencil, UserRound } from "lucide-react"
import Link from "next/link"

const employee = {
  id: "U63612e8f9c1a4b2d8e6f0a1b2c3ddb65",
  name: "โยธากานต์ พานภูมิ",
  occupation: "",
}

function truncateId(id: string) {
  if (id.length <= 12) return id
  return `${id.slice(0, 8)}...${id.slice(-4)}`
}

export function ProfileCard() {
  return (
    <section
      aria-label="ข้อมูลผู้ใช้งาน"
      className="relative mt-1 min-h-72 overflow-hidden rounded-2xl bg-gradient-to-br from-yellow-300 via-amber-100 via-40% to-white p-5 shadow-[var(--shadow-card)]"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 -left-16 size-48 rounded-full bg-gradient-to-br from-white/60 to-transparent blur-2xl"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-14 -bottom-14 size-44 rounded-full bg-gradient-to-tr from-blue-200/50 via-blue-100/30 to-transparent blur-xl"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-6 right-8 size-3 rounded-full bg-white/70"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-8 left-6 size-2 rounded-full bg-amber-200/70"
      />
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -right-6 -bottom-6 size-28 text-blue-300/25"
        fill="none"
        viewBox="0 0 112 112"
      >
        <circle cx="56" cy="56" r="55" stroke="currentColor" strokeWidth="1" />
        <circle cx="56" cy="56" r="40" stroke="currentColor" strokeWidth="1" />
      </svg>
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 h-16 w-full text-white/40"
        fill="currentColor"
        preserveAspectRatio="none"
        viewBox="0 0 400 60"
      >
        <path d="M0 0 H400 V24 C300 48 100 8 0 32 Z" />
      </svg>
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 size-full text-white/50"
        fill="currentColor"
      >
        <circle cx="12%" cy="22%" opacity="0.8" r="4" />
        <circle cx="22%" cy="12%" opacity="0.5" r="2.5" />
        <circle cx="34%" cy="30%" opacity="0.6" r="3" />
        <circle cx="8%" cy="55%" opacity="0.4" r="2" />
        <circle cx="46%" cy="16%" opacity="0.4" r="1.5" />
        <circle cx="60%" cy="72%" opacity="0.5" r="3" />
        <circle cx="70%" cy="55%" opacity="0.4" r="2" />
        <circle cx="80%" cy="30%" opacity="0.5" r="2.5" />
        <circle cx="90%" cy="65%" opacity="0.35" r="1.5" />
        <circle cx="18%" cy="80%" opacity="0.35" r="1.5" />
      </svg>
      <div className="relative mt-4 ml-6 flex items-start gap-3 text-left">
        <span
          aria-label={`รูปโปรไฟล์ของ ${employee.name}`}
          className="grid size-20 shrink-0 place-items-center rounded-full bg-white p-[2px] shadow-[var(--shadow-card)] sm:size-24"
          role="img"
        >
          <span className="grid size-full place-items-center rounded-full bg-white text-blue-600">
            <UserRound aria-hidden="true" className="size-10 sm:size-12" strokeWidth={1.5} />
          </span>
        </span>
        <div className="min-w-0">
          <p className="truncate text-[length:var(--text-lg)] font-extrabold text-[var(--color-text)]">
            {employee.name}
          </p>
          <button
            className="mt-0.5 inline-flex w-fit origin-left scale-75 items-center gap-1 text-[10px] leading-4 font-medium text-[var(--color-text-muted)] outline-none"
            onClick={() => navigator.clipboard.writeText(employee.id)}
            type="button"
          >
            รหัส {truncateId(employee.id)}
            <Copy aria-hidden="true" className="size-2.5" />
          </button>
          <div className="mt-0.5 flex flex-wrap items-center gap-2">
            <Link
              className="flex min-h-[var(--spacing-tap)] w-fit items-center gap-1.5 text-[length:var(--text-label)] font-semibold text-blue-600 outline-none"
              href="/profile/edit"
            >
              <Pencil aria-hidden="true" className="size-4" />
              แก้ไขโปรไฟล์
            </Link>
            {employee.occupation ? (
              <span className="inline-flex w-fit items-center rounded-full bg-[var(--color-surface-sunken)] px-2.5 py-1 text-[length:var(--text-caption)] font-bold text-[var(--color-text-muted)]">
                {employee.occupation}
              </span>
            ) : (
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[var(--color-warning-soft)] px-2.5 py-1 text-[length:var(--text-caption)] font-bold text-[var(--color-warning)]">
                <span
                  aria-hidden="true"
                  className="size-1.5 shrink-0 rounded-full bg-current"
                />
                ยังไม่ได้ระบุ
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export function ProfileCardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="relative mt-1 flex items-center gap-4 rounded-2xl bg-[var(--color-surface)] p-5 shadow-[var(--shadow-card)]"
    >
      <span className="size-16 shrink-0 animate-pulse rounded-full bg-slate-200" />
      <div className="min-w-0 flex-1 space-y-2.5">
        <span className="block h-5 w-40 animate-pulse rounded-full bg-slate-200" />
        <span className="block h-3 w-32 animate-pulse rounded-full bg-slate-100" />
        <span className="block h-3 w-28 animate-pulse rounded-full bg-slate-100" />
      </div>
    </div>
  )
}
