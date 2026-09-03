"use client"

import { ChevronRight, FileText, Inbox } from "lucide-react"
import Link from "next/link"
import { useEffect, useMemo, useState } from "react"

import {
  DOCUMENT_TYPE_LABEL,
  documents,
  formatThaiDate,
  getUrgencyGroup,
  type CompanyDocument,
  type DocumentUrgencyGroup,
} from "@/components/documents/document-data"
import { ALL_DATES, parseDateRange } from "@/components/documents/document-date-filter"
import { loadDocumentResponse } from "@/lib/document-storage"
import { Tag } from "@/components/ui/tag"

function withStoredStatus(document: CompanyDocument): CompanyDocument {
  const stored = loadDocumentResponse(document.id)
  return stored ? { ...document, responseStatus: stored } : document
}

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

const STATUS_TAG: Record<DocumentUrgencyGroup, { label: string; classes: string }> = {
  overdue: { label: "เกินกำหนด", classes: "bg-[var(--color-danger-soft)] text-[var(--color-danger)]" },
  needsResponse: { label: "รอตอบ", classes: "bg-amber-100 text-amber-700" },
  general: { label: "", classes: "bg-[var(--color-success-soft)] text-[var(--color-success)]" },
}

function getStatusTag(document: CompanyDocument, group: DocumentUrgencyGroup) {
  if (group !== "general") return STATUS_TAG[group]
  const label = "ยินยอม"
  return { label, classes: STATUS_TAG.general.classes }
}

function DocumentCard({ document }: { document: CompanyDocument }) {
  const group = getUrgencyGroup(document)
  const statusTag = getStatusTag(document, group)

  return (
    <Link
      className="interactive-card block w-full rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-left shadow-[var(--shadow-card)] outline-none focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--color-focus)] active:bg-[var(--color-surface-sunken)]"
      href={`/documents/${document.id}`}
    >
      <div className="flex items-start gap-3">
        <span
          className={`grid size-11 shrink-0 place-items-center rounded-full ${
            group === "overdue" ? "bg-[var(--color-danger-soft)] text-[var(--color-danger)]" : "bg-blue-100 text-[var(--color-brand-header)]"
          }`}
        >
          <FileText aria-hidden="true" className="size-5" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <p className="truncate text-[length:var(--text-label)] font-bold text-[var(--color-text)]">
              {document.title}
            </p>
            <Tag className={statusTag.classes}>{statusTag.label}</Tag>
          </div>
          <p className="mt-1 text-[length:var(--text-h2)] text-[var(--color-text-muted)]">
            {DOCUMENT_TYPE_LABEL[document.type]}
          </p>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-[var(--color-border)] pt-3">
        <div className="space-y-0.5 text-[length:var(--text-h2)] text-[var(--color-text-muted)]">
          <p>เผยแพร่ {formatThaiDate(document.publishedDate)}</p>
          {document.dueDate ? <p>ครบกำหนด {formatThaiDate(document.dueDate)}</p> : null}
        </div>
        <ChevronRight aria-hidden="true" className="size-5 shrink-0 text-[var(--color-text-subtle)]" />
      </div>
    </Link>
  )
}

export function DocumentList({ dateKey }: { dateKey: string }) {
  const [loading, setLoading] = useState(true)
  const [liveDocuments, setLiveDocuments] = useState(documents)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600)
    setLiveDocuments(documents.map(withStoredStatus))
    return () => clearTimeout(timer)
  }, [])

  const filtered = useMemo(() => {
    if (dateKey === ALL_DATES) return liveDocuments
    const { start, end } = parseDateRange(dateKey)
    if (!start) return liveDocuments
    return liveDocuments.filter((document) => document.publishedDate >= start && document.publishedDate <= (end ?? start))
  }, [dateKey, liveDocuments])

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
              <h2 className="flex items-center gap-1.5 text-[length:var(--text-label)] font-bold text-[var(--color-text)]">
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
