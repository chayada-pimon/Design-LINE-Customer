import { branches } from "@/components/branches/branch-data"

export type InvoiceStatus = "pending" | "paid" | "overdue"

export type InvoiceLineItem = {
  name: string
  quantity: number
  unitPrice: number
}

export type InvoiceHistoryEntry = {
  date: string
  message: string
}

export type Invoice = {
  id: string
  number: string
  issueDate: string
  dueDate: string
  status: InvoiceStatus
  branchId: string
  recipient: string
  department?: string
  jobRef?: string
  items: InvoiceLineItem[]
  discount?: number
  paidAmount?: number
  history?: InvoiceHistoryEntry[]
  pdfUrl?: string
}

export function getBranchLabel(branchId: string) {
  const branch = branches.find((item) => item.id === branchId)
  return branch ? `${branch.name} (${branch.code})` : "ไม่ระบุสาขา"
}

export function getInvoiceBranches(invoiceList: Invoice[]) {
  const branchIds = new Set(invoiceList.map((invoice) => invoice.branchId))
  return branches.filter((branch) => branchIds.has(branch.id))
}

export const INVOICE_STATUS_LABEL: Record<InvoiceStatus, string> = {
  pending: "รอชำระ",
  paid: "ชำระแล้ว",
  overdue: "เกินกำหนด",
}

const TAX_RATE = 0.07

export function getInvoiceAmounts(invoice: Invoice) {
  const subtotal = invoice.items.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0,
  )
  const discount = invoice.discount ?? 0
  const taxableAmount = subtotal - discount
  const tax = Math.round(taxableAmount * TAX_RATE)
  const netTotal = taxableAmount + tax
  const paidAmount = invoice.paidAmount ?? 0
  const remaining = netTotal - paidAmount

  return { subtotal, discount, tax, netTotal, paidAmount, remaining }
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("th-TH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
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

export const invoices: Invoice[] = [
  {
    id: "1",
    number: "INV-2026-0091",
    issueDate: "2026-08-05",
    dueDate: "2026-08-20",
    status: "overdue",
    branchId: "1",
    recipient: "บริษัท สุขใจ พร็อพเพอร์ตี้ จำกัด",
    department: "ฝ่ายบัญชี",
    jobRef: "JOB-2208",
    items: [
      { name: "บริการทำความสะอาดรายเดือน", quantity: 1, unitPrice: 8500 },
      { name: "บริการซักผ้าม่าน", quantity: 4, unitPrice: 350 },
    ],
    paidAmount: 0,
    history: [
      { date: "2026-08-05", message: "ออกใบแจ้งหนี้" },
      { date: "2026-08-21", message: "แจ้งเตือนเกินกำหนดชำระ" },
    ],
  },
  {
    id: "2",
    number: "INV-2026-0102",
    issueDate: "2026-08-18",
    dueDate: "2026-09-02",
    status: "pending",
    branchId: "2",
    recipient: "คุณวรินทร์ ชัยเจริญ",
    department: "แผนกซ่อมบำรุง",
    jobRef: "JOB-2231",
    items: [
      { name: "บริการซ่อมเครื่องปรับอากาศ", quantity: 2, unitPrice: 1200 },
      { name: "ค่าอุปกรณ์", quantity: 1, unitPrice: 650 },
    ],
    discount: 100,
    paidAmount: 0,
    history: [{ date: "2026-08-18", message: "ออกใบแจ้งหนี้" }],
  },
  {
    id: "3",
    number: "INV-2026-0088",
    issueDate: "2026-07-28",
    dueDate: "2026-08-12",
    status: "paid",
    branchId: "3",
    recipient: "บริษัท สุขใจ พร็อพเพอร์ตี้ จำกัด",
    department: "ฝ่ายบัญชี",
    items: [{ name: "บริการทำความสะอาดรายเดือน", quantity: 1, unitPrice: 8500 }],
    paidAmount: 9095,
    history: [
      { date: "2026-07-28", message: "ออกใบแจ้งหนี้" },
      { date: "2026-08-10", message: "ได้รับการชำระเงินครบถ้วน" },
    ],
  },
  {
    id: "4",
    number: "INV-2026-0113",
    issueDate: "2026-08-25",
    dueDate: "2026-09-09",
    status: "pending",
    branchId: "1",
    recipient: "คุณภัทรวดี เอี่ยมสอาด",
    jobRef: "JOB-2255",
    items: [{ name: "บริการทำความสะอาดหลังการก่อสร้าง", quantity: 1, unitPrice: 12000 }],
    paidAmount: 6000,
  },
]

export function getInvoiceById(id: string) {
  return invoices.find((invoice) => invoice.id === id)
}
