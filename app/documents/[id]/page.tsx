import { notFound } from "next/navigation"

import { HomeHeader } from "@/components/home/home-header"
import { HomeLayout } from "@/components/home/home-layout"
import { PageHeading } from "@/components/home/page-heading"
import { DocumentDetail } from "@/components/documents/document-detail"
import { getDocumentById } from "@/components/documents/document-data"

export default async function DocumentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const document = getDocumentById(id)

  if (!document) {
    notFound()
  }

  return (
    <HomeLayout>
      <HomeHeader backHref="/documents" />
      <PageHeading>รายละเอียดเอกสาร</PageHeading>
      <DocumentDetail document={document} />
    </HomeLayout>
  )
}
