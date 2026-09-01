import { INVOICE_STATUS_LABEL, type InvoiceStatus } from "@/components/invoices/invoice-data"

const STATUS_CLASSES: Record<InvoiceStatus, string> = {
  paid: "bg-[var(--color-success-soft)] text-[var(--color-success)]",
  pending: "bg-amber-100 text-amber-700",
  overdue: "bg-[var(--color-danger-soft)] text-[var(--color-danger)]",
}

export function InvoiceStatusBadge({ status }: { status: InvoiceStatus }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[length:var(--text-caption)] font-bold ${STATUS_CLASSES[status]}`}
    >
      <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
      {INVOICE_STATUS_LABEL[status]}
    </span>
  )
}
