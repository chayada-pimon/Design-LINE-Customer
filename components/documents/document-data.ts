export type DocumentType = "consent" | "response" | "notice"

export type DocumentResponseStatus = "pending" | "responded" | "consented"

export type DocumentFormat = "text" | "file"

export type DocumentAttachment = {
  name: string
  url: string
  size?: string
}

export type CompanyDocument = {
  id: string
  title: string
  type: DocumentType
  format: DocumentFormat
  description: string
  /** Full body text, present when format is "text". */
  content?: string
  /** PDF reference, present when format is "file". */
  fileUrl?: string
  fileSize?: string
  /** Extra files attached to the document, regardless of format. */
  attachments?: DocumentAttachment[]
  publishedDate: string
  dueDate?: string
  responseStatus: DocumentResponseStatus
}

export const CONFIRM_ACTION_LABEL: Record<DocumentType, string> = {
  consent: "ยินยอม",
  response: "ยืนยัน",
  notice: "รับทราบ",
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
    format: "text",
    description: "บริษัทขอแจ้งปรับปรุงข้อกำหนดการให้บริการ กรุณาอ่านและยืนยันความยินยอมภายในกำหนด",
    content:
      "บริษัทฯ ปรับปรุงข้อกำหนดการให้บริการ เปลี่ยนแปลงขอบเขตความรับผิดชอบ ระยะเวลาการให้บริการ และช่องทางติดต่อสื่อสาร กรุณาอ่านให้ครบถ้วนก่อนกดยืนยันความยินยอม ข้อกำหนดมีผลบังคับใช้ทันทีหลังยืนยัน หากมีข้อสงสัยติดต่อฝ่ายทรัพยากรบุคคล",
    attachments: [
      { name: "ข้อกำหนดการให้บริการฉบับปรับปรุง.pdf", url: "/documents/terms-of-service.pdf", size: "820 KB" },
    ],
    publishedDate: "2026-08-10",
    dueDate: "2026-08-25",
    responseStatus: "consented",
  },
  {
    id: "2",
    title: "แบบสำรวจความพึงพอใจการใช้งานระบบ",
    type: "response",
    format: "text",
    description: "แบบสำรวจความคิดเห็นเกี่ยวกับการใช้งานระบบพนักงาน กรุณาตอบรับเพื่อเข้าร่วมแบบสำรวจ",
    content:
      "ฝ่ายพัฒนาระบบขอความร่วมมือพนักงานทุกท่านเข้าร่วมแบบสำรวจความพึงพอใจต่อการใช้งานระบบพนักงานประจำปี เพื่อนำผลไปปรับปรุงการให้บริการและฟีเจอร์ให้ตอบโจทย์มากยิ่งขึ้น กรุณากดยืนยันเพื่อเข้าร่วม จะมีแบบฟอร์มคำถามส่งให้ตอบเพิ่มเติมภายหลัง",
    attachments: [
      { name: "แบบสำรวจความพึงพอใจ.pdf", url: "/documents/satisfaction-survey.pdf", size: "540 KB" },
    ],
    publishedDate: "2026-08-20",
    dueDate: "2026-08-30",
    responseStatus: "responded",
  },
  {
    id: "3",
    title: "ขอความยินยอมใช้ข้อมูลส่วนบุคคล (PDPA)",
    type: "consent",
    format: "file",
    description: "เอกสารขอความยินยอมในการเก็บ ใช้ และเปิดเผยข้อมูลส่วนบุคคลตาม พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล",
    fileUrl: "/documents/pdpa-consent.pdf",
    fileSize: "1.4 MB",
    publishedDate: "2026-08-24",
    dueDate: "2026-09-07",
    responseStatus: "pending",
  },
  {
    id: "4",
    title: "แบบยืนยันข้อมูลสาขาประจำไตรมาส",
    type: "response",
    format: "text",
    description: "กรุณาตรวจสอบและยืนยันความถูกต้องของข้อมูลสาขาประจำไตรมาสนี้",
    content:
      "ฝ่ายปฏิบัติการขอให้พนักงานประจำสาขาตรวจสอบความถูกต้องของข้อมูลสาขา ได้แก่ ที่อยู่ เบอร์ติดต่อ และเวลาทำการที่แสดงในระบบ ณ ปัจจุบัน หากข้อมูลถูกต้องครบถ้วนแล้วกรุณากดยืนยัน หากพบข้อมูลไม่ถูกต้องกรุณาติดต่อฝ่ายปฏิบัติการก่อนกดยืนยัน",
    attachments: [
      { name: "ข้อมูลสาขาปัจจุบัน.xlsx", url: "/documents/branch-info-q3.xlsx", size: "156 KB" },
      { name: "ข้อมูลสาขาปัจจุบัน.pdf", url: "/documents/branch-info-q3.pdf", size: "210 KB" },
    ],
    publishedDate: "2026-08-27",
    dueDate: "2026-09-03",
    responseStatus: "pending",
  },
  {
    id: "5",
    title: "ประกาศวันหยุดทำการช่วงเทศกาล",
    type: "notice",
    format: "text",
    description: "ประกาศกำหนดวันหยุดทำการช่วงเทศกาล ประจำปีนี้",
    content:
      "บริษัทฯ ขอแจ้งกำหนดการวันหยุดทำการในช่วงเทศกาลประจำปี เพื่อให้พนักงานวางแผนการทำงานและการลาได้ล่วงหน้า รายละเอียดวันหยุดจะประกาศผ่านช่องทางการสื่อสารภายในองค์กรอีกครั้ง กรุณากดรับทราบเพื่อยืนยันว่าท่านได้อ่านประกาศฉบับนี้แล้ว",
    attachments: [
      { name: "ประกาศวันหยุดทำการ.pdf", url: "/documents/holiday-notice.pdf", size: "300 KB" },
    ],
    publishedDate: "2026-08-15",
    responseStatus: "pending",
  },
  {
    id: "6",
    title: "นโยบายความปลอดภัยในการทำงาน ฉบับปรับปรุง",
    type: "consent",
    format: "file",
    description: "นโยบายความปลอดภัยในการทำงานฉบับปรับปรุง กรุณาอ่านและยินยอมปฏิบัติตาม",
    fileUrl: "/documents/safety-policy.pdf",
    fileSize: "2.1 MB",
    publishedDate: "2026-07-05",
    dueDate: "2026-07-20",
    responseStatus: "consented",
  },
  {
    id: "7",
    title: "คู่มือการใช้งานแอปพลิเคชันสำหรับพนักงาน",
    type: "notice",
    format: "file",
    description: "คู่มือแนะนำการใช้งานแอปพลิเคชันสำหรับพนักงานฉบับล่าสุด",
    fileUrl: "/documents/employee-app-guide.pdf",
    fileSize: "3.8 MB",
    publishedDate: "2026-06-12",
    responseStatus: "pending",
  },
  {
    id: "8",
    title: "แบบยืนยันการเข้าร่วมอบรมความปลอดภัยประจำปี",
    type: "response",
    format: "text",
    description: "กรุณายืนยันการเข้าร่วมอบรมความปลอดภัยประจำปี ก่อนวันที่กำหนด",
    content:
      "ฝ่ายทรัพยากรบุคคลขอให้พนักงานทุกท่านยืนยันการเข้าร่วมอบรมความปลอดภัยประจำปี ซึ่งเป็นข้อกำหนดบังคับสำหรับพนักงานทุกตำแหน่ง กรุณากดยืนยันโดยเร็วที่สุด เนื่องจากพ้นกำหนดเวลาตอบรับแล้ว",
    attachments: [
      { name: "กำหนดการอบรมความปลอดภัย.pdf", url: "/documents/safety-training-schedule.pdf", size: "410 KB" },
    ],
    publishedDate: "2026-08-05",
    dueDate: "2026-08-20",
    responseStatus: "pending",
  },
  {
    id: "9",
    title: "ขอความยินยอมใช้ข้อมูลเพื่อการประกันกลุ่ม",
    type: "consent",
    format: "file",
    description: "เอกสารขอความยินยอมใช้ข้อมูลส่วนบุคคลเพื่อดำเนินการประกันกลุ่มพนักงาน",
    fileUrl: "/documents/group-insurance-consent.pdf",
    fileSize: "980 KB",
    publishedDate: "2026-08-12",
    dueDate: "2026-08-28",
    responseStatus: "pending",
  },
]

export function getDocumentById(id: string) {
  return documents.find((document) => document.id === id)
}
