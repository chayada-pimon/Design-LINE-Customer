"use client"

import { Calendar, Check, CheckCircle2, FileText, Loader2, Paperclip } from "lucide-react"
import { useEffect, useRef, useState } from "react"

import {
  CONFIRM_ACKNOWLEDGE_LABEL,
  CONFIRM_ACTION_LABEL,
  formatThaiDate,
  type CompanyDocument,
  type DocumentResponseStatus,
} from "@/components/documents/document-data"
import { DocumentResponseBadge } from "@/components/documents/document-response-badge"
import { DocumentTimeBadge } from "@/components/documents/document-time-badge"
import { loadDocumentResponse, saveDocumentResponse } from "@/lib/document-storage"

const CONFIRMED_STATUS: Record<CompanyDocument["type"], DocumentResponseStatus> = {
  consent: "consented",
  response: "responded",
  notice: "responded",
}

const CONFIRMED_LABEL: Record<CompanyDocument["type"], string> = {
  consent: "ยินยอมแล้ว",
  response: "ยืนยันแล้ว",
  notice: "รับทราบแล้ว",
}

type ButtonState = "idle" | "submitting" | "confirmed"

function useReadGate(enabled: boolean) {
  const [hasRead, setHasRead] = useState(!enabled)
  const sentinelRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!enabled) return
    const node = sentinelRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setHasRead(true)
          observer.disconnect()
        }
      },
      { threshold: 0 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [enabled])

  return { hasRead, sentinelRef }
}

export function DocumentDetail({ document: initialDocument }: { document: CompanyDocument }) {
  const [document, setDocument] = useState(initialDocument)
  const alreadyAnswered = document.responseStatus !== "pending"
  const { hasRead, sentinelRef } = useReadGate(!alreadyAnswered)
  const [buttonState, setButtonState] = useState<ButtonState>(alreadyAnswered ? "confirmed" : "idle")

  useEffect(() => {
    if (initialDocument.responseStatus !== "pending") return
    const stored = loadDocumentResponse(initialDocument.id)
    if (stored) {
      setDocument({ ...initialDocument, responseStatus: stored })
      setButtonState("confirmed")
    }
  }, [initialDocument])

  const hasDeadlineUrgency = Boolean(document.dueDate) && document.responseStatus === "pending"

  function handleConfirm() {
    if (buttonState !== "idle" || !hasRead) return
    setButtonState("submitting")
    window.setTimeout(() => {
      const status = CONFIRMED_STATUS[document.type]
      saveDocumentResponse(document.id, status)
      setDocument((current) => ({ ...current, responseStatus: status }))
      setButtonState("confirmed")
    }, 500)
  }

  return (
    <div className="space-y-4 px-4 pt-5">
      {/* การ์ดเดียว: หัวเรื่อง + สถานะ/กำหนดเวลา + เนื้อหาเอกสาร */}
      <section className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-[var(--shadow-card)]">
        {/* หัวเรื่อง + สถานะมุมขวาบน */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <span className="grid size-8 shrink-0 place-items-center rounded-full bg-blue-100 text-[var(--color-brand-header)]">
              <FileText aria-hidden="true" className="size-4" />
            </span>
            <h2 className="text-[length:var(--text-lg)] leading-6 font-bold text-[var(--color-brand-header)]">
              รายละเอียดเอกสาร
            </h2>
          </div>
          {hasDeadlineUrgency ? (
            <DocumentTimeBadge dueDate={document.dueDate as string} />
          ) : (
            <DocumentResponseBadge status={document.responseStatus} />
          )}
        </div>
        <p className="mt-4 text-[length:var(--text-caption)] font-semibold tracking-wide text-[var(--color-text-subtle)] uppercase">
          หัวข้อ
        </p>
        <h1 className="mt-1 line-clamp-2 text-[length:var(--text-base)] leading-6 font-bold text-[var(--color-text)]">
          {document.title}
        </h1>

        {/* เนื้อหาเอกสาร */}
        <div className="mt-3 border-t border-[var(--color-border)] pt-3">
          {document.format === "text" ? (
            <>
              <p className="text-[length:var(--text-caption)] font-semibold tracking-wide text-[var(--color-text-subtle)] uppercase">
                เนื้อหาเอกสาร
              </p>
              <p className="mt-1 text-[length:var(--text-base)] leading-6 break-words whitespace-pre-line text-[var(--color-text)]">
                {document.content}
              </p>
            </>
          ) : (
            <a
              className="flex items-center gap-2 rounded-[var(--radius-btn)] border border-[var(--color-border)] bg-[var(--color-surface-sunken)] px-3 py-2.5 text-[length:var(--text-label)] font-semibold text-[var(--color-text-muted)] outline-none hover:bg-[var(--color-surface)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]"
              href={document.fileUrl}
              rel="noreferrer"
              target="_blank"
            >
              <FileText aria-hidden="true" className="size-4 shrink-0" />
              <span className="min-w-0 flex-1 truncate">
                {document.fileSize ? `PDF · ${document.fileSize}` : "PDF"}
              </span>
            </a>
          )}
        </div>

        {/* ไฟล์แนบ */}
        {document.attachments && document.attachments.length > 0 ? (
          <div className="mt-3 space-y-2 border-t border-[var(--color-border)] pt-3">
            <p className="text-[length:var(--text-caption)] font-semibold tracking-wide text-[var(--color-text-subtle)] uppercase">
              ไฟล์แนบ
            </p>
            {document.attachments.map((attachment) => (
              <a
                className="flex items-center gap-2 rounded-[var(--radius-btn)] border border-[var(--color-border)] bg-[var(--color-surface-sunken)] px-3 py-2.5 text-[length:var(--text-label)] font-semibold text-[var(--color-text-muted)] outline-none hover:bg-[var(--color-surface)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]"
                href={attachment.url}
                key={attachment.url}
                rel="noreferrer"
                target="_blank"
              >
                <Paperclip aria-hidden="true" className="size-4 shrink-0" />
                <span className="min-w-0 flex-1 truncate">{attachment.name}</span>
                {attachment.size ? (
                  <span className="shrink-0 text-[length:var(--text-caption)] font-normal text-[var(--color-text-subtle)]">
                    {attachment.size}
                  </span>
                ) : null}
              </a>
            ))}
          </div>
        ) : null}

        {/* วันที่ */}
        <div className="mt-3 space-y-1.5 border-t border-[var(--color-border)] pt-3 text-[length:var(--text-label)] text-[var(--color-text-muted)]">
          <div className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-1.5">
              <Calendar aria-hidden="true" className="size-3.5 shrink-0 text-[var(--color-text-subtle)]" />
              เผยแพร่
            </span>
            <span className="text-[var(--color-text-muted)]">{formatThaiDate(document.publishedDate)}</span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-1.5">
              <Calendar aria-hidden="true" className="size-3.5 shrink-0 text-[var(--color-text-subtle)]" />
              ครบกำหนด
            </span>
            <span className="text-[var(--color-text-muted)]">
              {document.dueDate ? formatThaiDate(document.dueDate) : "ไม่จำกัดระยะเวลา"}
            </span>
          </div>
        </div>

        <div aria-hidden="true" ref={sentinelRef} />
      </section>

      {/* 4. ปุ่มยืนยัน — แยกจากสถานะด้านบนเสมอ */}
      <div className="space-y-2 border-t border-[var(--color-border)] pt-4">
        {buttonState === "confirmed" ? (
          <div className="flex min-h-[var(--spacing-tap)] w-full items-center justify-center gap-2 rounded-[var(--radius-btn)] border border-[var(--color-success)] bg-[var(--color-success-soft)] text-[length:var(--text-label)] font-bold text-[var(--color-success)]">
            <CheckCircle2 aria-hidden="true" className="size-5" />
            {CONFIRMED_LABEL[document.type]}
          </div>
        ) : (
          <>
            {hasRead ? (
              <p className="text-center text-[length:var(--text-label)] text-[var(--color-text-muted)]">
                {CONFIRM_ACKNOWLEDGE_LABEL[document.type]}
              </p>
            ) : null}
            <button
              className="primary-action flex min-h-[var(--spacing-tap)] w-full items-center justify-center gap-2 rounded-[var(--radius-btn)] border border-[var(--color-action)] bg-[var(--color-action)] text-[length:var(--text-label)] font-bold text-[var(--color-surface)] shadow-[var(--shadow-card)] outline-none disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]"
              disabled={!hasRead || buttonState === "submitting"}
              onClick={handleConfirm}
              type="button"
            >
              {buttonState === "submitting" ? (
                <Loader2 aria-hidden="true" className="size-5 animate-spin" />
              ) : (
                <Check aria-hidden="true" className="size-5" />
              )}
              {buttonState === "submitting" ? "กำลังส่ง..." : CONFIRM_ACTION_LABEL[document.type]}
            </button>
            {!hasRead ? (
              <p className="text-center text-[length:var(--text-h2)] text-[var(--color-text-subtle)]">
                เลื่อนอ่านให้ครบก่อนถึงจะกดยืนยันได้
              </p>
            ) : null}
          </>
        )}
      </div>
    </div>
  )
}
