import { notFound } from "next/navigation"

import { BranchDetail } from "@/components/branches/branch-detail"
import { getBranchById } from "@/components/branches/branch-data"
import { HomeHeader } from "@/components/home/home-header"
import { HomeLayout } from "@/components/home/home-layout"
import { PageHeading } from "@/components/home/page-heading"

export default async function BranchDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const branch = getBranchById(id)

  if (!branch) {
    notFound()
  }

  return (
    <HomeLayout>
      <HomeHeader backHref="/branches" />
      <PageHeading>รายละเอียดสาขา</PageHeading>
      <BranchDetail branch={branch} />
    </HomeLayout>
  )
}
