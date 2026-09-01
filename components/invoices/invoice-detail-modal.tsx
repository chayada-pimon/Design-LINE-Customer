"use client"

import { X } from "lucide-react"
import { useEffect, useState } from "react"

import { InvoiceDetail } from "@/components/invoices/invoice-detail"
import type { Invoice } from "@/components/invoices/invoice-data"

export function InvoiceDetailModal({
  invoice,
  onClose,
}: {
  invoice: Invoice
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
        aria-labelledby="invoice-detail-modal-title"
      >
        <div className="mx-auto mt-2 h-1.5 w-10 shrink-0 rounded-full bg-[var(--color-border)]" />

        <div className="flex items-center justify-between px-5 pt-3 pb-1">
          <h2 id="invoice-detail-modal-title" className="text-[length:var(--text-lg)] font-bold text-[var(--color-text)]">
            รายละเอียดใบแจ้งหนี้
          </h2>
          <button
            aria-label="ปิด"
            className="grid size-8 shrink-0 place-items-center rounded-lg border border-[var(--color-border)] text-[var(--color-text-muted)] hover:bg-[var(--color-surface-sunken)]"
            onClick={requestClose}
            type="button"
          >
            <X aria-hidden="true" className="size-4" />
          </button>
        </div>

        <div className="overflow-y-auto">
          <InvoiceDetail invoice={invoice} />
        </div>
      </div>
    </div>
  )
}
