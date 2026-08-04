import {
  CalendarDays,
  FileText,
  Megaphone,
  ReceiptText,
  type LucideIcon,
} from "lucide-react"

const serviceMenuItems: Array<{
  label: string
  description: string
  icon: LucideIcon
}> = [
  { label: "ประกาศจากบริษัท", description: "ข่าวสารล่าสุด", icon: Megaphone },
  { label: "วันหยุด", description: "ดูปฏิทินวันหยุด", icon: CalendarDays },
  { label: "แจ้งลา", description: "ส่งคำขอลางาน", icon: FileText },
  {
    label: "สลิปเงินเดือนของฉัน",
    description: "ดูเอกสารเงินเดือน",
    icon: ReceiptText,
  },
]

export function EmployeeServicesSection() {
  return (
    <section className="px-4 pt-7" aria-labelledby="services-heading">
      <h2
        className="text-[length:var(--text-h2)] font-bold text-[var(--color-text-muted)]"
        id="services-heading"
      >
        บริการพนักงาน
      </h2>
      <div className="mt-3 grid grid-cols-2 gap-3">
        {serviceMenuItems.map(({ icon: Icon, label, description }) => (
          <div
            className="interactive-card flex min-h-32 flex-col items-center rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-4 text-center"
            key={label}
          >
            <span className="grid size-11 place-items-center rounded-full bg-blue-100 text-[var(--color-action)]">
              <Icon aria-hidden="true" className="size-6" />
            </span>
            <span className="mt-3 text-[length:var(--text-label)] font-bold">
              {label}
            </span>
            <span className="mt-1 text-[length:var(--text-caption)] text-[var(--color-text-muted)]">
              {description}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
