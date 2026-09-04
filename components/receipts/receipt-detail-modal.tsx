"use client"

import { X } from "lucide-react"
import { useEffect, useState } from "react"

import { ReceiptDetail } from "@/components/receipts/receipt-detail"
import type { Receipt } from "@/components/receipts/receipt-data"

export function ReceiptDetailModal({
  receipt,
  onClose,
}: {
  receipt: Receipt
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
    <div className="fixed inset-0 z-50 flex items-end justify-center" role="presentation">
      <button
        aria-label="ปิด"
        className={`drawer-backdrop absolute inset-0 bg-[var(--color-text)] opacity-40 ${
          closing ? "drawer-backdrop-closing" : ""
        }`}
        onClick={requestClose}
        type="button"
      />
      <div
        className={`relative flex h-[85vh] w-full flex-col overflow-hidden rounded-t-2xl bg-[var(--color-surface)] text-[var(--color-text)] shadow-[var(--shadow-card)] ${
          closing ? "sheet-closing" : "sheet-opening"
        }`}
        onAnimationEnd={() => {
          if (closing) onClose()
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="receipt-detail-modal-title"
      >
        <div className="mx-auto mt-2 h-1.5 w-10 shrink-0 rounded-full bg-[var(--color-border)]" />

        <div className="flex items-center justify-between px-5 pt-3 pb-1">
          <h2 id="receipt-detail-modal-title" className="text-[length:var(--text-lg)] font-bold text-[var(--color-text)]">
            รายละเอียดใบเสร็จ
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
          <ReceiptDetail receipt={receipt} />
        </div>
      </div>
    </div>
  )
}
