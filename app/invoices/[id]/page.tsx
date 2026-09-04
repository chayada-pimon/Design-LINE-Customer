import { notFound } from "next/navigation"

import { Header } from "@/components/home/Header"
import { HomeLayout } from "@/components/home/home-layout"
import { InvoiceDetail } from "@/components/invoices/invoice-detail"
import { getInvoiceById } from "@/components/invoices/invoice-data"

export default async function InvoiceDetailPage({
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
      <Header backHref="/invoices" showProfileCard={false} title="รายละเอียดใบแจ้งหนี้" />
      <InvoiceDetail invoice={invoice} />
    </HomeLayout>
  )
}
