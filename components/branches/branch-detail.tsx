import Link from "next/link"
import { Building2, Calendar, FileText, MapPin, Phone } from "lucide-react"
import type { ReactNode } from "react"

import type { Branch } from "@/components/branches/branch-data"
import { Tag } from "@/components/ui/tag"

function InfoValue({ value }: { value?: string }) {
  if (!value) {
    return (
      <Tag className="bg-[var(--color-warning-soft)] text-[var(--color-warning)]">รอระบุข้อมูล</Tag>
    )
  }

  return (
    <span className="text-[length:var(--text-label)] font-semibold text-[var(--color-text)]">
      {value}
    </span>
  )
}

function SectionCard({
  icon,
  title,
  children,
}: {
  icon: ReactNode
  title: string
  children: ReactNode
}) {
  return (
    <section className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-[var(--shadow-card)]">
      <div className="mb-1 flex items-center gap-2.5">
        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-blue-100 text-[var(--color-brand-header)]">
          {icon}
        </span>
        <h2 className="text-[length:var(--text-lg)] font-bold text-[var(--color-brand-header)]">
          {title}
        </h2>
      </div>
      <div className="divide-y divide-[var(--color-border)]">{children}</div>
    </section>
  )
}

function Row({ icon, label, value }: { icon: ReactNode; label: string; value?: string }) {
  return (
    <div className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
      <span className="flex items-center gap-2 text-[length:var(--text-label)] text-[var(--color-text-muted)]">
        <span aria-hidden="true" className="text-[var(--color-text-subtle)]">
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
        <span aria-hidden="true" className="text-[var(--color-text-subtle)]">
          {icon}
        </span>
        {label}
      </span>
      <InfoValue value={value} />
    </div>
  )
}

export function BranchDetail({ branch }: { branch: Branch }) {
  return (
    <div className="space-y-4 px-4 pt-5">
      <section className="flex items-center gap-4 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-gradient-to-br from-blue-50 to-[var(--color-surface)] p-4 shadow-[var(--shadow-card)]">
        <span className="grid size-16 shrink-0 place-items-center rounded-full bg-blue-100 text-[var(--color-brand-header)] ring-4 ring-[var(--color-surface)]">
          <Building2 aria-hidden="true" className="size-8" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[length:var(--text-lg)] font-bold text-[var(--color-text)]">
            {branch.name}
          </p>
          <span className="mt-1.5 inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-[length:var(--text-h2)] font-bold text-[var(--color-brand-header)]">
            รหัส {branch.code}
          </span>
        </div>
      </section>

      <SectionCard icon={<MapPin aria-hidden="true" className="size-4" />} title="ที่ตั้งและการติดต่อ">
        <StackedRow icon={<MapPin aria-hidden="true" className="size-3.5" />} label="ที่อยู่" value={branch.address} />
        <Row icon={<Phone aria-hidden="true" className="size-3.5" />} label="เบอร์โทรศัพท์" value={branch.phone} />
      </SectionCard>

      <SectionCard icon={<FileText aria-hidden="true" className="size-4" />} title="สัญญา">
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

      <Link
        className="flex min-h-[var(--spacing-tap)] w-full items-center justify-center rounded-[var(--radius-btn)] border border-[var(--color-border)] bg-[var(--color-surface)] text-[length:var(--text-label)] font-bold text-[var(--color-brand-header)] shadow-[var(--shadow-card)]"
        href="/branches"
      >
        กลับหน้าสาขาของคุณ
      </Link>
    </div>
  )
}
