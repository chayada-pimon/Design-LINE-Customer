import { notFound } from "next/navigation"

import { HomeHeader } from "@/components/home/home-header"
import { HomeLayout } from "@/components/home/home-layout"
import { PageHeading } from "@/components/home/page-heading"
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
      <HomeHeader backHref="/receipts" />
      <PageHeading>รายละเอียดใบเสร็จ</PageHeading>
      <ReceiptDetail receipt={receipt} />
    </HomeLayout>
  )
}
