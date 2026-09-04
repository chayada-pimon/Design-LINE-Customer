"use client"

import Link from "next/link"
import { ChevronRight, FileText, Inbox } from "lucide-react"
import { useEffect, useMemo, useRef, useState } from "react"

import {
  formatCurrency,
  formatThaiDate,
  getBranchLabel,
  getInvoiceAmounts,
  getInvoiceBranches,
  invoices,
  type InvoiceStatus,
} from "@/components/invoices/invoice-data"
import { ALL_BRANCHES, InvoiceBranchFilter } from "@/components/invoices/invoice-branch-filter"
import { InvoiceStatusBadge } from "@/components/invoices/invoice-status-badge"
import { InvoiceSummaryBar } from "@/components/invoices/invoice-summary-bar"

type TabKey = "all" | InvoiceStatus | "unpaid"

const TABS: { key: "all" | InvoiceStatus; label: string }[] = [
  { key: "all", label: "ทั้งหมด" },
  { key: "pending", label: "รอชำระ" },
  { key: "paid", label: "ชำระแล้ว" },
  { key: "overdue", label: "เกินกำหนด" },
]

const TAB_SELECTED_CLASSES = "border-[var(--color-brand-header)] text-[var(--color-brand-header)]"
const TAB_UNSELECTED_CLASSES = "border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-brand-header)]/40"

function InvoiceListSkeleton() {
  return (
    <div aria-hidden="true" className="space-y-3">
      <div className="h-24 animate-pulse rounded-[var(--radius-card)] bg-[var(--color-surface-sunken)]" />
      <div className="flex flex-wrap gap-2">
        {TABS.map((tab) => (
          <div key={tab.key} className="h-7 w-16 animate-pulse rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]" />
        ))}
      </div>
      {[0, 1, 2].map((index) => (
        <div
          key={index}
          className="h-28 animate-pulse rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface-sunken)]"
        />
      ))}
    </div>
  )
}

export function InvoiceList() {
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<TabKey>("all")
  const [branchId, setBranchId] = useState<string>(ALL_BRANCHES)
  const filterSectionRef = useRef<HTMLDivElement>(null)

  const handleViewUnpaid = () => {
    setActiveTab("unpaid")
    filterSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(timer)
  }, [])

  const invoiceBranches = useMemo(() => getInvoiceBranches(invoices), [])

  const branchFiltered = useMemo(() => {
    if (branchId === ALL_BRANCHES) return invoices
    return invoices.filter((invoice) => invoice.branchId === branchId)
  }, [branchId])

  const filtered = useMemo(() => {
    if (activeTab === "all") return branchFiltered
    if (activeTab === "unpaid") return branchFiltered.filter((invoice) => invoice.status !== "paid")
    return branchFiltered.filter((invoice) => invoice.status === activeTab)
  }, [branchFiltered, activeTab])

  if (loading) {
    return <InvoiceListSkeleton />
  }

  return (
    <div className="space-y-4">
      <InvoiceSummaryBar invoices={branchFiltered} onViewUnpaid={handleViewUnpaid} />

      {invoiceBranches.length > 1 ? (
        <InvoiceBranchFilter branches={invoiceBranches} onChange={setBranchId} value={branchId} />
      ) : null}

      <div ref={filterSectionRef} className="flex gap-1.5 scroll-mt-4" role="tablist">
        {TABS.map((tab) => {
          const selected = activeTab === tab.key
          return (
            <button
              key={tab.key}
              aria-selected={selected}
              className={`flex-1 whitespace-nowrap rounded-full border-2 bg-[var(--color-surface)] px-2 py-1.5 text-center text-[length:var(--text-caption)] font-semibold outline-none transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)] ${
                selected ? TAB_SELECTED_CLASSES : TAB_UNSELECTED_CLASSES
              }`}
              onClick={() => setActiveTab(tab.key)}
              role="tab"
              type="button"
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-2 rounded-[var(--radius-card)] border border-dashed border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-10 text-center">
          <Inbox aria-hidden="true" className="size-8 text-[var(--color-text-subtle)]" />
          <p className="text-[length:var(--text-base)] font-semibold text-[var(--color-text)]">
            ไม่มีใบแจ้งหนี้
          </p>
          <p className="text-[length:var(--text-caption)] text-[var(--color-text-muted)]">
            ยังไม่มีรายการในหมวดนี้
          </p>
        </div>
      ) : (
        <ul className="space-y-3">
          {filtered.map((invoice) => {
            const { netTotal } = getInvoiceAmounts(invoice)
            return (
              <li key={invoice.id}>
                <Link
                  className="interactive-card block w-full rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-left shadow-[var(--shadow-card)] outline-none focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--color-focus)] active:bg-[var(--color-surface-sunken)]"
                  href={`/invoices/${invoice.id}`}
                >
                  <div className="flex items-start gap-3">
                    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-blue-100 text-[var(--color-brand-header)]">
                      <FileText aria-hidden="true" className="size-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="flex min-w-0 items-center gap-1 truncate text-[length:var(--text-label)] font-bold text-[var(--color-text)]">
                          <span className="truncate">{getBranchLabel(invoice.branchId)}</span>
                        </p>
                        <span className="shrink-0">
                          <InvoiceStatusBadge status={invoice.status} />
                        </span>
                      </div>
                      <p className="mt-1 text-[length:var(--text-h2)] text-[var(--color-text-muted)]">
                        {invoice.number}
                      </p>
                      <p className="mt-1 text-[length:var(--text-h2)] text-[var(--color-text-muted)]">
                        ออก {formatThaiDate(invoice.issueDate)} · ครบกำหนด {formatThaiDate(invoice.dueDate)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between border-t border-[var(--color-border)] pt-3">
                    <p className="text-[length:var(--text-base)] font-bold text-[var(--color-text)]">
                      {formatCurrency(netTotal)} <span className="text-[length:var(--text-caption)] font-normal text-[var(--color-text-muted)]">บาท</span>
                    </p>
                    <span className="flex items-center gap-1 text-[length:var(--text-caption)] text-[var(--color-text-subtle)]">
                      ดูรายละเอียด
                      <ChevronRight aria-hidden="true" className="size-5 shrink-0" />
                    </span>
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
