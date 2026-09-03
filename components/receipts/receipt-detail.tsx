import {
  Building2,
  Calendar,
  CreditCard,
  FileText,
  Receipt as ReceiptIcon,
  User,
} from "lucide-react"

import Link from "next/link"
import type { ReactNode } from "react"

import {
  PAYMENT_METHOD_LABEL,
  formatCurrency,
  formatThaiDate,
  getBranchLabel,
  getReceiptAmounts,
  type Receipt,
} from "@/components/receipts/receipt-data"

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
        <h2 className="text-[length:var(--text-lg)] leading-6 font-bold text-[var(--color-brand-header)]">
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

export function ReceiptDetail({ receipt }: { receipt: Receipt }) {
  const { netTotal } = getReceiptAmounts(receipt)

  return (
    <div className="space-y-4 px-4 pt-5 pb-8">
      <section className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-gradient-to-br from-blue-50 to-[var(--color-surface)] p-4 shadow-[var(--shadow-card)]">
        <p className="truncate text-[length:var(--text-lg)] leading-6 font-bold text-[var(--color-text)]">
          {receipt.number}
        </p>
        <p className="mt-1 text-[length:var(--text-label)] leading-5 text-[var(--color-text-muted)]">
          ชำระเมื่อ {formatThaiDate(receipt.paymentDate)}
        </p>
      </section>

      <SectionCard
        icon={<Calendar aria-hidden="true" className="size-4" />}
        title="ข้อมูลทั่วไป"
      >
        <Row
          icon={<Building2 aria-hidden="true" className="size-3.5" />}
          label="สาขา"
          value={getBranchLabel(receipt.branchId)}
        />
        <Row
          icon={<Calendar aria-hidden="true" className="size-3.5" />}
          label="วันที่ชำระ"
          value={formatThaiDate(receipt.paymentDate)}
        />
        <Row
          icon={<CreditCard aria-hidden="true" className="size-3.5" />}
          label="วิธีชำระ"
          value={PAYMENT_METHOD_LABEL[receipt.paymentMethod]}
        />
        <Row
          icon={<User aria-hidden="true" className="size-3.5" />}
          label="ผู้ชำระ"
          value={receipt.payer}
        />
        {receipt.invoiceRef ? (
          <Row
            icon={<FileText aria-hidden="true" className="size-3.5" />}
            label="อ้างอิงใบแจ้งหนี้"
            value={receipt.invoiceRef}
          />
        ) : null}
      </SectionCard>

      <section className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-[var(--shadow-card)]">
        <div className="mb-4 flex items-center gap-2.5">
          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-blue-100 text-[var(--color-brand-header)]">
            <ReceiptIcon aria-hidden="true" className="size-4" />
          </span>
          <h2 className="text-[length:var(--text-lg)] leading-6 font-bold text-[var(--color-brand-header)]">
            รายการ
          </h2>
        </div>
        <ul className="divide-y divide-[var(--color-border)]">
          {receipt.items.map((item, index) => (
            <li
              key={index}
              className="flex items-end justify-between gap-3 py-2.5 first:pt-0 last:pb-0"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate text-[length:var(--text-label)] leading-5 font-semibold text-[var(--color-text)]">
                  {item.name}
                </p>
                <p className="text-[length:var(--text-label)] leading-5 text-[var(--color-text-muted)]">
                  {item.quantity} x {formatCurrency(item.unitPrice)} บาท
                </p>
              </div>
              <p className="shrink-0 text-[length:var(--text-base)] leading-6 font-bold text-[var(--color-text)]">
                {formatCurrency(item.quantity * item.unitPrice)} บาท
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-[var(--shadow-card)]">
        <div className="flex items-center justify-between text-[length:var(--text-base)] leading-6 font-bold text-[var(--color-text)]">
          <span>ยอดสุทธิ</span>
          <span>{formatCurrency(netTotal)} บาท</span>
        </div>
      </section>

      <div className="space-y-2.5">
        <Link
          className="primary-action flex min-h-[var(--spacing-tap)] w-full items-center justify-center gap-2 rounded-[var(--radius-btn)] border border-[var(--color-action)] bg-[var(--color-action)] text-[length:var(--text-label)] font-bold text-[var(--color-surface)] shadow-[var(--shadow-card)] outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]"
          href={`/receipts/${receipt.id}/pdf`}
        >
          <FileText aria-hidden="true" className="size-5" />
          ดูใบเสร็จ (PDF)
        </Link>
      </div>
    </div>
  )
}
