import { Header } from "@/components/home/Header"
import { HomeLayout } from "@/components/home/home-layout"
import { InvoiceList } from "@/components/invoices/invoice-list"

export default function InvoicesPage() {
  return (
    <HomeLayout>
      <Header backHref="/" showProfileCard={false} title="ใบแจ้งหนี้" />
      <section className="px-4 pt-5">
        <InvoiceList />
      </section>
    </HomeLayout>
  )
}
