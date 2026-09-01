"use client"

import { AlertTriangle, FileText, Inbox } from "lucide-react"
import { useEffect, useMemo, useState } from "react"

import {
  documents,
  formatThaiDate,
  getUrgencyGroup,
  type CompanyDocument,
  type DocumentUrgencyGroup,
} from "@/components/documents/document-data"
import { ALL_DATES } from "@/components/documents/document-date-filter"
import { DocumentResponseBadge } from "@/components/documents/document-response-badge"
import { DocumentTimeBadge } from "@/components/documents/document-time-badge"
import { DocumentTypeBadge } from "@/components/documents/document-type-badge"

const GROUP_ORDER: DocumentUrgencyGroup[] = ["overdue", "needsResponse", "general"]

const GROUP_LABEL: Record<DocumentUrgencyGroup, string> = {
  overdue: "เลยกำหนดแล้ว",
  needsResponse: "ต้องตอบกลับ",
  general: "ทั่วไป",
}

function DocumentListSkeleton() {
  return (
    <div aria-hidden="true" className="space-y-5">
      {[0, 1].map((section) => (
        <div className="space-y-3" key={section}>
          <div className="h-5 w-28 animate-pulse rounded-full bg-[var(--color-surface-sunken)]" />
          {[0, 1].map((index) => (
            <div
              key={index}
              className="h-24 animate-pulse rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface-sunken)]"
            />
          ))}
        </div>
      ))}
    </div>
  )
}

function DocumentCard({ document }: { document: CompanyDocument }) {
  const group = getUrgencyGroup(document)

  return (
    <div className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-[var(--shadow-card)]">
      <div className="flex items-start gap-3">
        <span
          className={`grid size-11 shrink-0 place-items-center rounded-full ${
            group === "overdue" ? "bg-[var(--color-danger-soft)] text-[var(--color-danger)]" : "bg-blue-100 text-[var(--color-brand-header)]"
          }`}
        >
          {group === "overdue" ? (
            <AlertTriangle aria-hidden="true" className="size-5" />
          ) : (
            <FileText aria-hidden="true" className="size-5" />
          )}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[length:var(--text-label)] font-bold text-[var(--color-text)]">
            {document.title}
          </p>
          <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
            <DocumentTypeBadge type={document.type} />
            <DocumentResponseBadge status={document.responseStatus} />
            {document.dueDate && document.responseStatus === "pending" ? (
              <DocumentTimeBadge dueDate={document.dueDate} />
            ) : null}
          </div>
        </div>
      </div>

      <div className="mt-3 space-y-0.5 border-t border-[var(--color-border)] pt-3 text-[length:var(--text-caption)] text-[var(--color-text-muted)]">
        <p>เผยแพร่ {formatThaiDate(document.publishedDate)}</p>
        {document.dueDate ? <p>ครบกำหนดตอบกลับ {formatThaiDate(document.dueDate)}</p> : null}
      </div>
    </div>
  )
}

export function DocumentList({ dateKey }: { dateKey: string }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(timer)
  }, [])

  const filtered = useMemo(() => {
    if (dateKey === ALL_DATES) return documents
    return documents.filter((document) => document.publishedDate === dateKey)
  }, [dateKey])

  const grouped = useMemo(() => {
    const groups: Record<DocumentUrgencyGroup, CompanyDocument[]> = {
      overdue: [],
      needsResponse: [],
      general: [],
    }
    for (const document of filtered) {
      groups[getUrgencyGroup(document)].push(document)
    }
    return groups
  }, [filtered])

  if (loading) {
    return <DocumentListSkeleton />
  }

  return (
    <div className="space-y-5">
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-2 rounded-[var(--radius-card)] border border-dashed border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-10 text-center">
          <Inbox aria-hidden="true" className="size-8 text-[var(--color-text-subtle)]" />
          <p className="text-[length:var(--text-base)] font-semibold text-[var(--color-text)]">
            ไม่มีเอกสาร
          </p>
          <p className="text-[length:var(--text-caption)] text-[var(--color-text-muted)]">
            ยังไม่มีเอกสารในช่วงเวลาที่เลือก
          </p>
        </div>
      ) : (
        GROUP_ORDER.map((group) => {
          const items = grouped[group]
          if (items.length === 0) return null

          return (
            <section className="space-y-3" key={group}>
              <h2
                className={`flex items-center gap-1.5 text-[length:var(--text-label)] font-bold ${
                  group === "overdue" ? "text-[var(--color-danger)]" : "text-[var(--color-text)]"
                }`}
              >
                {group === "overdue" ? <AlertTriangle aria-hidden="true" className="size-4" /> : null}
                {GROUP_LABEL[group]}
              </h2>
              <ul className="space-y-3">
                {items.map((document) => (
                  <li key={document.id}>
                    <DocumentCard document={document} />
                  </li>
                ))}
              </ul>
            </section>
          )
        })
      )}
    </div>
  )
}
