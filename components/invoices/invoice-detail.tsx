import {
  Briefcase,
  Building2,
  Calendar,
  FileText,
  History,
  MessageCircle,
  Receipt,
  User,
} from "lucide-react"

import Link from "next/link"
import type { ReactNode } from "react"

import {
  formatCurrency,
  formatThaiDate,
  getBranchLabel,
  getInvoiceAmounts,
  type Invoice,
} from "@/components/invoices/invoice-data"
import { InvoiceStatusBadge } from "@/components/invoices/invoice-status-badge"

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
      <div className="mb-4 flex items-center gap-2.5">
        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-blue-100 text-[var(--color-brand-header)]">
          {icon}
        </span>
        <h2 className="text-[length:var(--text-base)] leading-5 font-bold text-[var(--color-brand-header)]">
          {title}
        </h2>
      </div>
      <div className="divide-y divide-[var(--color-border)]">{children}</div>
    </section>
  )
}

function Row({
  icon,
  label,
  value,
}: {
  icon: ReactNode
  label: string
  value: string
}) {
  return (
    <div className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
      <span className="flex items-center gap-2 text-[length:var(--text-label)] leading-5 text-[var(--color-text-muted)]">
        <span aria-hidden="true" className="text-[var(--color-text-subtle)]">
          {icon}
        </span>
        {label}
      </span>
      <span className="truncate text-right text-[length:var(--text-label)] leading-5 font-semibold text-[var(--color-text)]">
        {value}
      </span>
    </div>
  )
}

export function InvoiceDetail({ invoice }: { invoice: Invoice }) {
  const { subtotal, discount, tax, netTotal, paidAmount, remaining } =
    getInvoiceAmounts(invoice)

  return (
    <div className="space-y-4 px-4 pt-5">
      <section className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-gradient-to-br from-blue-50 to-[var(--color-surface)] p-4 shadow-[var(--shadow-card)]">
        <div className="flex items-center justify-between gap-2">
          <p className="truncate text-[length:var(--text-lg)] leading-6 font-bold text-[var(--color-text)]">
            {invoice.number}
          </p>
          <InvoiceStatusBadge status={invoice.status} />
        </div>
      </section>

      <SectionCard
        icon={<Calendar aria-hidden="true" className="size-4" />}
        title="ข้อมูลทั่วไป"
      >
        <Row
          icon={<Building2 aria-hidden="true" className="size-3.5" />}
          label="สาขา"
          value={getBranchLabel(invoice.branchId)}
        />
        <Row
          icon={<Calendar aria-hidden="true" className="size-3.5" />}
          label="วันที่ออก"
          value={formatThaiDate(invoice.issueDate)}
        />
        <Row
          icon={<Calendar aria-hidden="true" className="size-3.5" />}
          label="วันครบกำหนด"
          value={formatThaiDate(invoice.dueDate)}
        />
        <Row
          icon={<User aria-hidden="true" className="size-3.5" />}
          label="ผู้รับ"
          value={invoice.recipient}
        />
        {invoice.department ? (
          <Row
            icon={<User aria-hidden="true" className="size-3.5" />}
            label="แผนก"
            value={invoice.department}
          />
        ) : null}
        {invoice.jobRef ? (
          <Row
            icon={<Briefcase aria-hidden="true" className="size-3.5" />}
            label="อ้างอิงงาน"
            value={invoice.jobRef}
          />
        ) : null}
      </SectionCard>

      <section className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-[var(--shadow-card)]">
        <div className="mb-4 flex items-center gap-2.5">
          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-blue-100 text-[var(--color-brand-header)]">
            <Receipt aria-hidden="true" className="size-4" />
          </span>
          <h2 className="text-[length:var(--text-base)] leading-5 font-bold text-[var(--color-brand-header)]">
            รายการ
          </h2>
        </div>
        <ul className="divide-y divide-[var(--color-border)]">
          {invoice.items.map((item, index) => (
            <li
              key={index}
              className="flex items-center justify-between gap-3 py-2.5 first:pt-0 last:pb-0"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate text-[length:var(--text-label)] leading-5 font-semibold text-[var(--color-text)]">
                  {item.name}
                </p>
                <p className="text-[length:var(--text-h2)] leading-4 text-[var(--color-text-muted)]">
                  {item.quantity} x {formatCurrency(item.unitPrice)} บาท
                </p>
              </div>
              <p className="shrink-0 text-[length:var(--text-label)] leading-5 font-bold text-[var(--color-text)]">
                {formatCurrency(item.quantity * item.unitPrice)} บาท
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-[var(--shadow-card)]">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[length:var(--text-label)] leading-5 text-[var(--color-text-muted)]">
            <span>ยอดรวมก่อนภาษี</span>
            <span>{formatCurrency(subtotal)} บาท</span>
          </div>
          {discount > 0 ? (
            <div className="flex items-center justify-between text-[length:var(--text-label)] leading-5 text-[var(--color-text-muted)]">
              <span>ส่วนลด</span>
              <span>-{formatCurrency(discount)} บาท</span>
            </div>
          ) : null}
          <div className="flex items-center justify-between text-[length:var(--text-label)] leading-5 text-[var(--color-text-muted)]">
            <span>ภาษีมูลค่าเพิ่ม 7%</span>
            <span>{formatCurrency(tax)} บาท</span>
          </div>
          <div className="flex items-center justify-between border-t border-[var(--color-border)] pt-2.5 text-[length:var(--text-base)] leading-6 font-bold text-[var(--color-text)]">
            <span>ยอดสุทธิ</span>
            <span>{formatCurrency(netTotal)} บาท</span>
          </div>
        </div>
      </section>

      {invoice.status !== "paid" || paidAmount > 0 ? (
        <SectionCard
          icon={<Receipt aria-hidden="true" className="size-4" />}
          title="สถานะการชำระ"
        >
          <Row
            icon={<Receipt aria-hidden="true" className="size-3.5" />}
            label="ชำระแล้ว"
            value={`${formatCurrency(paidAmount)} บาท`}
          />
          <Row
            icon={<Receipt aria-hidden="true" className="size-3.5" />}
            label="คงเหลือ"
            value={`${formatCurrency(remaining)} บาท`}
          />
        </SectionCard>
      ) : null}

      {invoice.history && invoice.history.length > 0 ? (
        <SectionCard
          icon={<History aria-hidden="true" className="size-4" />}
          title="ประวัติ"
        >
          {invoice.history.map((entry, index) => (
            <Row
              key={index}
              icon={<Calendar aria-hidden="true" className="size-3.5" />}
              label={formatThaiDate(entry.date)}
              value={entry.message}
            />
          ))}
        </SectionCard>
      ) : null}

      <div className="space-y-2.5">
        <Link
          className="primary-action flex min-h-[var(--spacing-tap)] w-full items-center justify-center gap-2 rounded-[var(--radius-btn)] border border-[var(--color-action)] bg-[var(--color-action)] text-[length:var(--text-label)] font-bold text-[var(--color-surface)] shadow-[var(--shadow-card)] outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]"
          href={`/invoices/${invoice.id}/pdf`}
        >
          <FileText aria-hidden="true" className="size-5" />
          ดูใบแจ้งหนี้ (PDF)
        </Link>
        <button
          className="flex min-h-[var(--spacing-tap)] w-full items-center justify-center gap-2 rounded-[var(--radius-btn)] border border-[var(--color-border)] bg-[var(--color-surface)] text-[length:var(--text-label)] font-bold text-[var(--color-text-muted)] outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]"
          type="button"
        >
          <MessageCircle aria-hidden="true" className="size-5" />
          ติดต่อสอบถาม
        </button>
      </div>
    </div>
  )
}
