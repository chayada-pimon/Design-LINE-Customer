import { Tag } from "@/components/ui/tag"
import { INVOICE_STATUS_LABEL, type InvoiceStatus } from "@/components/invoices/invoice-data"

const STATUS_CLASSES: Record<InvoiceStatus, string> = {
  paid: "bg-[var(--color-success-soft)] text-[var(--color-success)]",
  pending: "bg-[var(--color-warning-soft)] text-[var(--color-warning)]",
  overdue: "bg-[var(--color-danger-soft)] text-[var(--color-danger)]",
}

export function InvoiceStatusBadge({ status }: { status: InvoiceStatus }) {
  return <Tag className={STATUS_CLASSES[status]}>{INVOICE_STATUS_LABEL[status]}</Tag>
}
