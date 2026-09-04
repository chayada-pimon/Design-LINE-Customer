import { notFound } from "next/navigation"

import { Header } from "@/components/home/Header"
import { HomeLayout } from "@/components/home/home-layout"
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
      <Header backHref="/documents" showProfileCard={false} title="รายละเอียดเอกสาร" />
      <DocumentDetail document={document} />
    </HomeLayout>
  )
}
