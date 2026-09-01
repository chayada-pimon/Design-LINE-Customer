import { BranchList } from "@/components/branches/branch-list"
import { HomeHeader } from "@/components/home/home-header"
import { HomeLayout } from "@/components/home/home-layout"
import { PageHeading } from "@/components/home/page-heading"

export default function BranchesPage() {
  return (
    <HomeLayout>
      <HomeHeader backHref="/" />
      <PageHeading>สาขาของคุณ</PageHeading>
      <section className="px-4 pt-5">
        <BranchList />
      </section>
    </HomeLayout>
  )
}
