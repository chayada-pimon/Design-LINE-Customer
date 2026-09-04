import { Wallet } from "lucide-react"
import type { KeyboardEvent } from "react"

import { formatCurrency, getReceiptAmounts, type Receipt } from "@/components/receipts/receipt-data"

export function ReceiptSummaryBar({
  receipts,
  onViewAll,
}: {
  receipts: Receipt[]
  onViewAll?: () => void
}) {
  const totalPaid = receipts.reduce((sum, receipt) => sum + getReceiptAmounts(receipt).netTotal, 0)

  return (
    <section
      className={`rounded-[var(--radius-card)] border border-[var(--color-border)] bg-gradient-to-br from-blue-50 to-[var(--color-surface)] p-4 shadow-[var(--shadow-card)] ${
        onViewAll
          ? "cursor-pointer text-left transition-colors duration-150 hover:from-blue-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]"
          : ""
      }`}
      {...(onViewAll
        ? {
            "aria-label": "ดูรายการใบเสร็จทั้งหมด",
            onClick: onViewAll,
            role: "button",
            tabIndex: 0,
            onKeyDown: (event: KeyboardEvent) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault()
                onViewAll()
              }
            },
          }
        : {})}
    >
      <div className="flex items-center gap-3">
        <span className="grid size-11 shrink-0 place-items-center rounded-full bg-blue-100 text-[var(--color-brand-header)]">
          <Wallet aria-hidden="true" className="size-5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[length:var(--text-caption)] text-[var(--color-text-muted)]">
            ยอดชำระรวมในช่วงนี้
          </p>
          <p className="text-[length:var(--text-h1)] font-bold text-[var(--color-text)]">
            {formatCurrency(totalPaid)} <span className="text-[length:var(--text-label)] font-semibold text-[var(--color-text-muted)]">บาท</span>
          </p>
        </div>
        <span className="inline-flex shrink-0 items-center rounded-full bg-blue-100 px-2.5 py-1 text-[length:var(--text-h2)] font-bold text-[var(--color-brand-header)]">
          {receipts.length} ใบ
        </span>
      </div>
    </section>
  )
}
