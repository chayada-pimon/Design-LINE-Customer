import { Tag } from "@/components/ui/tag"
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
  return <Tag className={STATUS_CLASSES[status]}>{DOCUMENT_RESPONSE_STATUS_LABEL[status]}</Tag>
}
