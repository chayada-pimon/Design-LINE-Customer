import { notFound } from "next/navigation"

import { Header } from "@/components/home/Header"
import { HomeLayout } from "@/components/home/home-layout"
import { ReceiptDetail } from "@/components/receipts/receipt-detail"
import { getReceiptById } from "@/components/receipts/receipt-data"

export default async function ReceiptDetailPage({
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
      <Header backHref="/receipts" showProfileCard={false} title="รายละเอียดใบเสร็จ" />
      <ReceiptDetail receipt={receipt} />
    </HomeLayout>
  )
}
