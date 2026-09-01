import { HomeHeader } from "@/components/home/home-header"
import { HomeLayout } from "@/components/home/home-layout"
import { PageHeading } from "@/components/home/page-heading"
import { ReceiptList } from "@/components/receipts/receipt-list"

export default function ReceiptsPage() {
  return (
    <HomeLayout>
      <HomeHeader backHref="/" />
      <PageHeading>ใบเสร็จ</PageHeading>
      <section className="px-4 pt-5">
        <ReceiptList />
      </section>
    </HomeLayout>
  )
}
