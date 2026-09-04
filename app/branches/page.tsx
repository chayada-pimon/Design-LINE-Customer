import { BranchList } from "@/components/branches/branch-list"
import { Header } from "@/components/home/Header"
import { HomeLayout } from "@/components/home/home-layout"

export default function BranchesPage() {
  return (
    <HomeLayout>
      <Header backHref="/" showProfileCard={false} title="สาขาของคุณ" />
      <section className="px-4 pt-5">
        <BranchList />
      </section>
    </HomeLayout>
  )
}
