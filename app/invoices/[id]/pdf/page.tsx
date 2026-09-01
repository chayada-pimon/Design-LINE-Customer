import { notFound } from "next/navigation"
import { FileWarning } from "lucide-react"

import { HomeHeader } from "@/components/home/home-header"
import { HomeLayout } from "@/components/home/home-layout"
import { PageHeading } from "@/components/home/page-heading"
import { getInvoiceById } from "@/components/invoices/invoice-data"

export default async function InvoicePdfPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const invoice = getInvoiceById(id)

  if (!invoice) {
    notFound()
  }

  return (
    <HomeLayout>
      <HomeHeader backHref={`/invoices/${invoice.id}`} />
      <PageHeading>{invoice.number}</PageHeading>
      <div className="px-4 pt-5 pb-8">
        {invoice.pdfUrl ? (
          <iframe
            className="h-[75vh] w-full rounded-[var(--radius-card)] border border-[var(--color-border)] shadow-[var(--shadow-card)]"
            src={invoice.pdfUrl}
            title={`ใบแจ้งหนี้ ${invoice.number}`}
          />
        ) : (
          <div className="flex flex-col items-center gap-2 rounded-[var(--radius-card)] border border-dashed border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-16 text-center">
            <FileWarning aria-hidden="true" className="size-8 text-[var(--color-text-subtle)]" />
            <p className="text-[length:var(--text-base)] font-semibold text-[var(--color-text)]">
              ยังไม่มีไฟล์ PDF
            </p>
            <p className="text-[length:var(--text-caption)] text-[var(--color-text-muted)]">
              ไฟล์ใบแจ้งหนี้จะแสดงที่นี่เมื่อออกเอกสารแล้ว
            </p>
          </div>
        )}
      </div>
    </HomeLayout>
  )
}
