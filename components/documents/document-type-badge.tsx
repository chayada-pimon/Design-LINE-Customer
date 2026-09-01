import { DOCUMENT_TYPE_LABEL, type DocumentType } from "@/components/documents/document-data"

const TYPE_CLASSES: Record<DocumentType, string> = {
  consent: "bg-violet-100 text-violet-700",
  response: "bg-amber-100 text-amber-700",
  notice: "bg-[var(--color-surface-sunken)] text-[var(--color-text-muted)]",
}

export function DocumentTypeBadge({ type }: { type: DocumentType }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-1 text-[length:var(--text-caption)] font-bold ${TYPE_CLASSES[type]}`}
    >
      {DOCUMENT_TYPE_LABEL[type]}
    </span>
  )
}
