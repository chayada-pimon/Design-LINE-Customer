export type DocumentType = "consent" | "response" | "notice"

export type DocumentResponseStatus = "pending" | "responded" | "consented"

export type CompanyDocument = {
  id: string
  title: string
  type: DocumentType
  publishedDate: string
  dueDate?: string
  responseStatus: DocumentResponseStatus
}

export const DOCUMENT_TYPE_LABEL: Record<DocumentType, string> = {
  consent: "ต้องยินยอม",
  response: "ต้องตอบกลับ",
  notice: "แจ้งให้ทราบ",
}

export const DOCUMENT_RESPONSE_STATUS_LABEL: Record<DocumentResponseStatus, string> = {
  pending: "รอตอบ",
  responded: "ตอบแล้ว",
  consented: "ยินยอมแล้ว",
}

export type DocumentUrgencyGroup = "overdue" | "needsResponse" | "general"

export function getDaysRemaining(dueDate: string, now: Date = new Date()) {
  const due = new Date(dueDate)
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const startOfDue = new Date(due.getFullYear(), due.getMonth(), due.getDate())
  const msPerDay = 1000 * 60 * 60 * 24
  return Math.round((startOfDue.getTime() - startOfToday.getTime()) / msPerDay)
}

export function getUrgencyGroup(document: CompanyDocument, now: Date = new Date()): DocumentUrgencyGroup {
  if (document.responseStatus !== "pending") return "general"
  if (!document.dueDate) return "general"
  return getDaysRemaining(document.dueDate, now) < 0 ? "overdue" : "needsResponse"
}

export function formatThaiDate(dateString: string) {
  const date = new Date(dateString)
  if (Number.isNaN(date.getTime())) return dateString
  return date.toLocaleDateString("th-TH", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

export function getMonthKey(dateString: string) {
  return dateString.slice(0, 7)
}

export function formatThaiMonth(monthKey: string) {
  const date = new Date(`${monthKey}-01`)
  if (Number.isNaN(date.getTime())) return monthKey
  return date.toLocaleDateString("th-TH", { month: "long", year: "numeric" })
}

export const documents: CompanyDocument[] = [
  {
    id: "1",
    title: "แจ้งปรับปรุงข้อกำหนดการให้บริการ",
    type: "consent",
    publishedDate: "2026-08-10",
    dueDate: "2026-08-25",
    responseStatus: "pending",
  },
  {
    id: "2",
    title: "แบบสำรวจความพึงพอใจการใช้งานระบบ",
    type: "response",
    publishedDate: "2026-08-20",
    dueDate: "2026-08-30",
    responseStatus: "pending",
  },
  {
    id: "3",
    title: "ขอความยินยอมใช้ข้อมูลส่วนบุคคล (PDPA)",
    type: "consent",
    publishedDate: "2026-08-24",
    dueDate: "2026-09-07",
    responseStatus: "pending",
  },
  {
    id: "4",
    title: "แบบยืนยันข้อมูลสาขาประจำไตรมาส",
    type: "response",
    publishedDate: "2026-08-27",
    dueDate: "2026-09-03",
    responseStatus: "pending",
  },
  {
    id: "5",
    title: "ประกาศวันหยุดทำการช่วงเทศกาล",
    type: "notice",
    publishedDate: "2026-08-15",
    responseStatus: "responded",
  },
  {
    id: "6",
    title: "นโยบายความปลอดภัยในการทำงาน ฉบับปรับปรุง",
    type: "consent",
    publishedDate: "2026-07-05",
    dueDate: "2026-07-20",
    responseStatus: "consented",
  },
  {
    id: "7",
    title: "คู่มือการใช้งานแอปพลิเคชันสำหรับพนักงาน",
    type: "notice",
    publishedDate: "2026-06-12",
    responseStatus: "responded",
  },
]

export function getDocumentById(id: string) {
  return documents.find((document) => document.id === id)
}
