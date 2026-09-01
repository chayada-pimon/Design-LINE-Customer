"use client"

import { Copy, Pencil, UserRound } from "lucide-react"
import Link from "next/link"

const employee = {
  name: "โยธากานต์ พานภูมิ",
  code: "Uc9fcc3e7a2b4d1f8e6ac8d9",
}

function maskCode(code: string) {
  return `${code.slice(0, 8)}...${code.slice(-4)}`
}

export function ProfileCard() {
  return (
    <section
      aria-label="ข้อมูลผู้ใช้งาน"
      className="relative mt-1 min-h-72 overflow-hidden rounded-2xl bg-gradient-to-br from-amber-50 via-amber-50 to-yellow-100 p-5 shadow-[var(--shadow-card)]"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-8 -bottom-8 size-28 rounded-full bg-white/40"
      />
      <div className="relative flex items-center gap-4">
        <span
          aria-label={`รูปโปรไฟล์ของ ${employee.name}`}
          className="grid size-16 shrink-0 place-items-center rounded-full bg-white text-[var(--color-action)] shadow-[var(--shadow-card)]"
          role="img"
        >
          <UserRound aria-hidden="true" className="size-8" strokeWidth={1.5} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[length:var(--text-lg)] font-extrabold text-[var(--color-text)]">
            {employee.name}
          </p>
          <div className="mt-1">
            <button
              className="flex items-center gap-1 text-[length:var(--text-caption)] leading-none text-[var(--color-text-subtle)] outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]"
              onClick={() => {
                navigator.clipboard.writeText(employee.code)
              }}
              type="button"
            >
              รหัส {maskCode(employee.code)}
              <Copy aria-hidden="true" className="size-3" />
              <span className="sr-only">คัดลอกรหัส</span>
            </button>
            <Link
              className="mt-1 flex min-h-[var(--spacing-tap)] w-fit items-center gap-1.5 text-[length:var(--text-label)] font-semibold text-[var(--color-action)] outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]"
              href="/profile/edit"
            >
              <Pencil aria-hidden="true" className="size-4" />
              แก้ไขโปรไฟล์
            </Link>
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
