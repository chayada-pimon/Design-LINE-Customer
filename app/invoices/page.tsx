import { HomeHeader } from "@/components/home/home-header"
import { HomeLayout } from "@/components/home/home-layout"
import { PageHeading } from "@/components/home/page-heading"
import { InvoiceList } from "@/components/invoices/invoice-list"

export default function InvoicesPage() {
  return (
    <HomeLayout>
      <HomeHeader backHref="/" />
      <PageHeading>ใบแจ้งหนี้</PageHeading>
      <section className="px-4 pt-5">
        <InvoiceList />
      </section>
    </HomeLayout>
  )
}
