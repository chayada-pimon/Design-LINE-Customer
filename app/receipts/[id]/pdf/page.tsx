import { notFound } from "next/navigation"
import { FileWarning } from "lucide-react"

import { Header } from "@/components/home/Header"
import { HomeLayout } from "@/components/home/home-layout"
import { getReceiptById } from "@/components/receipts/receipt-data"

export default async function ReceiptPdfPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const receipt = getReceiptById(id)

  if (!receipt) {
    notFound()
  }

  return (
    <HomeLayout>
      <Header backHref={`/receipts/${receipt.id}`} showProfileCard={false} title={receipt.number} />
      <div className="px-4 pt-5">
        {receipt.pdfUrl ? (
          <iframe
            className="h-[75vh] w-full rounded-[var(--radius-card)] border border-[var(--color-border)] shadow-[var(--shadow-card)]"
            src={receipt.pdfUrl}
            title={`ใบเสร็จ ${receipt.number}`}
          />
        ) : (
          <div className="flex flex-col items-center gap-2 rounded-[var(--radius-card)] border border-dashed border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-16 text-center">
            <FileWarning aria-hidden="true" className="size-8 text-[var(--color-text-subtle)]" />
            <p className="text-[length:var(--text-base)] font-semibold text-[var(--color-text)]">
              ยังไม่มีไฟล์ PDF
            </p>
            <p className="text-[length:var(--text-caption)] text-[var(--color-text-muted)]">
              ไฟล์ใบเสร็จจะแสดงที่นี่เมื่อออกเอกสารแล้ว
            </p>
          </div>
        )}
      </div>
    </HomeLayout>
  )
}
