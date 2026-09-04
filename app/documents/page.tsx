"use client"

import { useMemo, useState } from "react"

import { AnnouncementCard } from "@/components/home/AnnouncementCard"
import { Header } from "@/components/home/Header"
import { HomeLayout } from "@/components/home/home-layout"
import { documents } from "@/components/documents/document-data"
import { ALL_DATES, DocumentDateFilter } from "@/components/documents/document-date-filter"
import { DocumentList } from "@/components/documents/document-list"

export default function DocumentsPage() {
  const [dateKey, setDateKey] = useState<string>(ALL_DATES)
  const markedDates = useMemo(() => documents.map((document) => document.publishedDate), [])

  return (
    <HomeLayout>
      <Header backHref="/" showProfileCard={false} title="เอกสาร" />
      <section className="px-4 pt-5">
        <div className="mb-4">
          <AnnouncementCard
            action={<DocumentDateFilter markedDates={markedDates} onChange={setDateKey} value={dateKey} />}
            count={`${documents.length} รายการ`}
            label="เอกสารทั้งหมด"
          />
        </div>
        <DocumentList dateKey={dateKey} />
      </section>
    </HomeLayout>
  )
}
