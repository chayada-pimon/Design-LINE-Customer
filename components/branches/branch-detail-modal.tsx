"use client"

import { Building2, Calendar, FileText, MapPin, Phone, X } from "lucide-react"
import { useEffect, useState } from "react"
import type { ReactNode } from "react"

import type { Branch } from "@/components/branches/branch-data"
import { Tag } from "@/components/ui/tag"

function getContractStatus(contractEnd?: string) {
  if (!contractEnd) return null
  const end = new Date(contractEnd)
  if (Number.isNaN(end.getTime())) return null
  const daysLeft = Math.ceil((end.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
  return { active: daysLeft >= 0, daysLeft }
}

function InfoValue({ value }: { value?: string }) {
  if (!value) {
    return (
      <Tag className="bg-[var(--color-warning-soft)] text-[var(--color-warning)]">รอระบุข้อมูล</Tag>
    )
  }

  return <span className="text-[length:var(--text-label)] font-semibold text-[var(--color-text)]">{value}</span>
}

function SectionCard({
  icon,
  title,
  action,
  children,
}: {
  icon: ReactNode
  title: string
  action?: ReactNode
  children: ReactNode
}) {
  return (
    <section className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="grid size-6 shrink-0 place-items-center rounded-full bg-blue-100 text-[var(--color-brand-header)]">
            {icon}
          </span>
          <h3 className="text-[length:var(--text-lg)] font-bold text-[var(--color-brand-header)]">{title}</h3>
        </div>
        {action}
      </div>
      <div className="divide-y divide-[var(--color-border)]">{children}</div>
    </section>
  )
}

function Row({ icon, label, value }: { icon: ReactNode; label: string; value?: string }) {
  return (
    <div className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
      <span className="flex items-center gap-2 text-[length:var(--text-label)] text-[var(--color-text-muted)]">
        <span aria-hidden="true" className="grid size-6 shrink-0 place-items-center text-[var(--color-text-subtle)]">
          {icon}
        </span>
        {label}
      </span>
      <InfoValue value={value} />
    </div>
  )
}

function StackedRow({ icon, label, value }: { icon: ReactNode; label: string; value?: string }) {
  return (
    <div className="space-y-1 py-3 first:pt-0 last:pb-0">
      <span className="flex items-center gap-2 text-[length:var(--text-label)] text-[var(--color-text-muted)]">
        <span aria-hidden="true" className="grid size-6 shrink-0 place-items-center text-[var(--color-text-subtle)]">
          {icon}
        </span>
        {label}
      </span>
      <InfoValue value={value} />
    </div>
  )
}

export function BranchDetailModal({
  branch,
  onClose,
}: {
  branch: Branch
  onClose: () => void
}) {
  const [closing, setClosing] = useState(false)

  function requestClose() {
    setClosing(true)
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") requestClose()
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  const contractStatus = getContractStatus(branch.contractEnd)

  return (
    <div className="fixed inset-0 z-50 mx-auto flex max-w-[430px] items-end" role="presentation">
      <button
        aria-label="ปิด"
        className={`drawer-backdrop absolute inset-0 bg-[var(--color-text)] opacity-40 ${
          closing ? "drawer-backdrop-closing" : ""
        }`}
        onClick={requestClose}
        type="button"
      />
      <div
        className={`relative flex max-h-[85vh] w-full flex-col overflow-hidden rounded-t-2xl bg-[var(--color-surface)] text-[var(--color-text)] shadow-[var(--shadow-card)] ${
          closing ? "sheet-closing" : "sheet-opening"
        }`}
        onAnimationEnd={() => {
          if (closing) onClose()
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="branch-detail-modal-title"
      >
        <div className="flex h-[68px] shrink-0 items-center justify-between border-b border-[var(--color-border)] px-5">
          <h2 id="branch-detail-modal-title" className="text-[length:var(--text-h1)] font-bold text-[var(--color-text)]">
            รายละเอียดงาน
          </h2>
          <button
            aria-label="ปิด"
            className="grid size-11 shrink-0 place-items-center rounded-full text-[var(--color-text-muted)] outline-none hover:bg-[var(--color-surface-sunken)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]"
            onClick={requestClose}
            type="button"
          >
            <X aria-hidden="true" className="size-5" />
          </button>
        </div>

        <div className="space-y-4 overflow-y-auto px-5 pt-3 pb-6">
          <section className="flex items-center gap-4 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-gradient-to-br from-blue-50 to-[var(--color-surface)] p-4">
            <span className="grid size-16 shrink-0 place-items-center rounded-full bg-blue-100 text-[var(--color-brand-header)] ring-4 ring-[var(--color-surface)]">
              <Building2 aria-hidden="true" className="size-8" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[length:var(--text-lg)] font-bold text-[var(--color-text)]">{branch.name}</p>
              <div className="mt-1.5 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-[length:var(--text-h2)] font-bold text-[var(--color-brand-header)]">
                  รหัส {branch.code}
                </span>
              </div>
            </div>
          </section>

          <SectionCard
            icon={<MapPin aria-hidden="true" className="size-3.5" />}
            title="ที่ตั้งและการติดต่อ"
            action={
              branch.address ? (
                <a
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-blue-50 px-3.5 py-2 text-[length:var(--text-h2)] font-semibold text-[var(--color-brand-header)] outline-none hover:bg-blue-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]"
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(branch.address)}`}
                  rel="noreferrer"
                  target="_blank"
                >
                  <MapPin aria-hidden="true" className="size-3.5" />
                  แผนที่
                </a>
              ) : null
            }
          >
            <StackedRow icon={<MapPin aria-hidden="true" className="size-3.5" />} label="ที่อยู่" value={branch.address} />
            <Row icon={<Phone aria-hidden="true" className="size-3.5" />} label="เบอร์โทรศัพท์" value={branch.phone} />
          </SectionCard>

          <SectionCard
            icon={<FileText aria-hidden="true" className="size-3.5" />}
            title="สัญญา"
            action={
              contractStatus ? (
                <span
                  className={
                    contractStatus.active
                      ? "inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[var(--color-success-soft)] px-2 py-0.5 text-[length:var(--text-h2)] font-semibold text-[var(--color-success)]"
                      : "inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[var(--color-danger-soft)] px-2 py-0.5 text-[length:var(--text-h2)] font-semibold text-[var(--color-danger)]"
                  }
                >
                  <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-current" />
                  {contractStatus.active
                    ? contractStatus.daysLeft === 0
                      ? "หมดสัญญาวันนี้"
                      : `เหลืออีก ${contractStatus.daysLeft} วัน`
                    : `หมดสัญญาแล้ว ${Math.abs(contractStatus.daysLeft)} วัน`}
                </span>
              ) : null
            }
          >
            <Row
              icon={<Calendar aria-hidden="true" className="size-3.5" />}
              label="วันเริ่มสัญญา"
              value={branch.contractStart}
            />
            <Row
              icon={<Calendar aria-hidden="true" className="size-3.5" />}
              label="วันสิ้นสุดสัญญา"
              value={branch.contractEnd}
            />
          </SectionCard>
        </div>
      </div>
    </div>
  )
}
