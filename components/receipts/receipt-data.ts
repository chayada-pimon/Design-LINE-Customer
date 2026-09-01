import { branches } from "@/components/branches/branch-data"

export type PaymentMethod = "transfer" | "cash" | "credit_card"

export type ReceiptLineItem = {
  name: string
  quantity: number
  unitPrice: number
}

export type Receipt = {
  id: string
  number: string
  paymentDate: string
  paymentMethod: PaymentMethod
  branchId: string
  payer: string
  invoiceRef?: string
  items: ReceiptLineItem[]
  discount?: number
  pdfUrl?: string
}

export const PAYMENT_METHOD_LABEL: Record<PaymentMethod, string> = {
  transfer: "โอนเงิน",
  cash: "เงินสด",
  credit_card: "บัตรเครดิต",
}

export function getBranchLabel(branchId: string) {
  const branch = branches.find((item) => item.id === branchId)
  return branch ? `${branch.name} (${branch.code})` : "ไม่ระบุสาขา"
}

export function getReceiptBranches(receiptList: Receipt[]) {
  const branchIds = new Set(receiptList.map((receipt) => receipt.branchId))
  return branches.filter((branch) => branchIds.has(branch.id))
}

const TAX_RATE = 0.07

export function getReceiptAmounts(receipt: Receipt) {
  const subtotal = receipt.items.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0,
  )
  const discount = receipt.discount ?? 0
  const taxableAmount = subtotal - discount
  const tax = Math.round(taxableAmount * TAX_RATE)
  const netTotal = taxableAmount + tax

  return { subtotal, discount, tax, netTotal }
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

export function getMonthKey(dateString: string) {
  return dateString.slice(0, 7)
}

export function formatThaiMonth(monthKey: string) {
  const date = new Date(`${monthKey}-01`)
  if (Number.isNaN(date.getTime())) return monthKey
  return date.toLocaleDateString("th-TH", { month: "long", year: "numeric" })
}

export const receipts: Receipt[] = [
  {
    id: "1",
    number: "RCPT-2026-0071",
    paymentDate: "2026-08-10",
    paymentMethod: "transfer",
    branchId: "3",
    payer: "บริษัท สุขใจ พร็อพเพอร์ตี้ จำกัด",
    invoiceRef: "INV-2026-0088",
    items: [{ name: "บริการทำความสะอาดรายเดือน", quantity: 1, unitPrice: 8500 }],
  },
  {
    id: "2",
    number: "RCPT-2026-0083",
    paymentDate: "2026-08-22",
    paymentMethod: "cash",
    branchId: "1",
    payer: "คุณภัทรวดี เอี่ยมสอาด",
    invoiceRef: "INV-2026-0113",
    items: [{ name: "บริการทำความสะอาดหลังการก่อสร้าง", quantity: 1, unitPrice: 12000 }],
    discount: 500,
  },
  {
    id: "3",
    number: "RCPT-2026-0059",
    paymentDate: "2026-07-15",
    paymentMethod: "credit_card",
    branchId: "2",
    payer: "คุณวรินทร์ ชัยเจริญ",
    invoiceRef: "INV-2026-0075",
    items: [
      { name: "บริการซ่อมเครื่องปรับอากาศ", quantity: 2, unitPrice: 1200 },
      { name: "ค่าอุปกรณ์", quantity: 1, unitPrice: 650 },
    ],
  },
  {
    id: "4",
    number: "RCPT-2026-0044",
    paymentDate: "2026-06-30",
    paymentMethod: "transfer",
    branchId: "1",
    payer: "บริษัท สุขใจ พร็อพเพอร์ตี้ จำกัด",
    invoiceRef: "INV-2026-0060",
    items: [{ name: "บริการทำความสะอาดรายเดือน", quantity: 1, unitPrice: 8500 }],
  },
]

export function getReceiptById(id: string) {
  return receipts.find((receipt) => receipt.id === id)
}
