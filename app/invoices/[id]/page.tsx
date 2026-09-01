import { notFound } from "next/navigation"

import { HomeHeader } from "@/components/home/home-header"
import { HomeLayout } from "@/components/home/home-layout"
import { PageHeading } from "@/components/home/page-heading"
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
      <HomeHeader backHref="/invoices" />
      <PageHeading>รายละเอียดใบแจ้งหนี้</PageHeading>
      <InvoiceDetail invoice={invoice} />
    </HomeLayout>
  )
}
