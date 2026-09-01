import { HomeHeader } from "@/components/home/home-header"
import { HomeLayout } from "@/components/home/home-layout"
import { PageHeading } from "@/components/home/page-heading"

export default function DocumentsPage() {
  return (
    <HomeLayout>
      <HomeHeader />
      <PageHeading>เอกสาร</PageHeading>
    </HomeLayout>
  )
}
