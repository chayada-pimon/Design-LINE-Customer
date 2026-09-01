"use client"

import Link from "next/link"
import { ChevronRight, Inbox, Receipt as ReceiptIcon } from "lucide-react"
import { useEffect, useMemo, useState } from "react"

import {
  formatCurrency,
  formatThaiDate,
  getReceiptAmounts,
  getMonthKey,
  receipts,
} from "@/components/receipts/receipt-data"
import { ALL_MONTHS, ReceiptMonthFilter } from "@/components/receipts/receipt-month-filter"
import { ReceiptSummaryBar } from "@/components/receipts/receipt-summary-bar"

function ReceiptListSkeleton() {
  return (
    <div aria-hidden="true" className="space-y-3">
      <div className="h-24 animate-pulse rounded-[var(--radius-card)] bg-[var(--color-surface-sunken)]" />
      <div className="h-16 animate-pulse rounded-[var(--radius-card)] bg-[var(--color-surface-sunken)]" />
      {[0, 1, 2].map((index) => (
        <div
          key={index}
          className="h-24 animate-pulse rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface-sunken)]"
        />
      ))}
    </div>
  )
}

export function ReceiptList() {
  const [loading, setLoading] = useState(true)
  const [monthKey, setMonthKey] = useState<string>(ALL_MONTHS)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(timer)
  }, [])

  const months = useMemo(() => {
    const keys = new Set(receipts.map((receipt) => getMonthKey(receipt.paymentDate)))
    return Array.from(keys).sort((a, b) => b.localeCompare(a))
  }, [])

  const filtered = useMemo(() => {
    if (monthKey === ALL_MONTHS) return receipts
    return receipts.filter((receipt) => getMonthKey(receipt.paymentDate) === monthKey)
  }, [monthKey])

  const sorted = useMemo(
    () => [...filtered].sort((a, b) => b.paymentDate.localeCompare(a.paymentDate)),
    [filtered],
  )

  if (loading) {
    return <ReceiptListSkeleton />
  }

  return (
    <div className="space-y-4">
      <ReceiptSummaryBar receipts={filtered} />

      {months.length > 1 ? (
        <ReceiptMonthFilter months={months} onChange={setMonthKey} value={monthKey} />
      ) : null}

      {sorted.length === 0 ? (
        <div className="flex flex-col items-center gap-2 rounded-[var(--radius-card)] border border-dashed border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-10 text-center">
          <Inbox aria-hidden="true" className="size-8 text-[var(--color-text-subtle)]" />
          <p className="text-[length:var(--text-base)] font-semibold text-[var(--color-text)]">
            ไม่มีใบเสร็จ
          </p>
          <p className="text-[length:var(--text-caption)] text-[var(--color-text-muted)]">
            ยังไม่มีประวัติการชำระเงินในช่วงที่เลือก
          </p>
        </div>
      ) : (
        <ul className="space-y-3">
          {sorted.map((receipt) => {
            const { netTotal } = getReceiptAmounts(receipt)
            return (
              <li key={receipt.id}>
                <Link
                  className="interactive-card block w-full rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-left shadow-[var(--shadow-card)] outline-none focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--color-focus)] active:bg-[var(--color-surface-sunken)]"
                  href={`/receipts/${receipt.id}`}
                >
                  <div className="flex items-start gap-3">
                    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-blue-100 text-[var(--color-brand-header)]">
                      <ReceiptIcon aria-hidden="true" className="size-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="truncate text-[length:var(--text-label)] font-bold text-[var(--color-text)]">
                          {receipt.number}
                        </p>
                        <ChevronRight
                          aria-hidden="true"
                          className="size-5 shrink-0 text-[var(--color-text-subtle)]"
                        />
                      </div>
                      <p className="mt-1 text-[length:var(--text-caption)] text-[var(--color-text-muted)]">
                        ชำระเมื่อ {formatThaiDate(receipt.paymentDate)}
                      </p>
                      <p className="mt-1 truncate text-[length:var(--text-caption)] text-[var(--color-text-subtle)]">
                        {receipt.items[0]?.name}
                        {receipt.items.length > 1 ? ` และอีก ${receipt.items.length - 1} รายการ` : ""}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between border-t border-[var(--color-border)] pt-3">
                    <p className="text-[length:var(--text-lg)] font-bold text-[var(--color-text)]">
                      {formatCurrency(netTotal)} <span className="text-[length:var(--text-caption)] font-normal text-[var(--color-text-muted)]">บาท</span>
                    </p>
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
