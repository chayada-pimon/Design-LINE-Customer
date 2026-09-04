import { notFound } from "next/navigation"

import { BranchDetail } from "@/components/branches/branch-detail"
import { getBranchById } from "@/components/branches/branch-data"
import { Header } from "@/components/home/Header"
import { HomeLayout } from "@/components/home/home-layout"

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
      <Header backHref="/branches" showProfileCard={false} title="รายละเอียดสาขา" />
      <BranchDetail branch={branch} />
    </HomeLayout>
  )
}
