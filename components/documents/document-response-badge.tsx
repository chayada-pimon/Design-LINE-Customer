import {
  DOCUMENT_RESPONSE_STATUS_LABEL,
  type DocumentResponseStatus,
} from "@/components/documents/document-data"

const STATUS_CLASSES: Record<DocumentResponseStatus, string> = {
  pending: "bg-amber-100 text-amber-700",
  responded: "bg-[var(--color-success-soft)] text-[var(--color-success)]",
  consented: "bg-[var(--color-success-soft)] text-[var(--color-success)]",
}

export function DocumentResponseBadge({ status }: { status: DocumentResponseStatus }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[length:var(--text-caption)] font-bold ${STATUS_CLASSES[status]}`}
    >
      <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
      {DOCUMENT_RESPONSE_STATUS_LABEL[status]}
    </span>
  )
}
