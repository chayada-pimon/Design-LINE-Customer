import { Header } from "@/components/home/Header"
import { HomeLayout } from "@/components/home/home-layout"
import { ReceiptList } from "@/components/receipts/receipt-list"

export default function ReceiptsPage() {
  return (
    <HomeLayout>
      <Header backHref="/" showProfileCard={false} title="ใบเสร็จ" />
      <section className="px-4 pt-5">
        <ReceiptList />
      </section>
    </HomeLayout>
  )
}
