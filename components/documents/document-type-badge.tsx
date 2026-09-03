import { Tag } from "@/components/ui/tag"
import { DOCUMENT_TYPE_LABEL, type DocumentType } from "@/components/documents/document-data"

const TYPE_CLASSES: Record<DocumentType, string> = {
  consent: "bg-violet-100 text-violet-700",
  response: "bg-amber-100 text-amber-700",
  notice: "bg-[var(--color-surface-sunken)] text-[var(--color-text-muted)]",
}

export function DocumentTypeBadge({ type }: { type: DocumentType }) {
  return <Tag className={TYPE_CLASSES[type]}>{DOCUMENT_TYPE_LABEL[type]}</Tag>
}
