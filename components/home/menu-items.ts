import { FileCheck2, FileText, MapPin, Receipt, type LucideIcon } from "lucide-react"

import { branches } from "@/components/branches/branch-data"

export type MenuItem = {
  href: string
  title: string
  subtitle: string
  icon: LucideIcon
  variant?: "default" | "hero"
  badge?: string
}

export const menuItems: MenuItem[] = [
  {
    href: "/branches",
    title: "สาขาของคุณ",
    subtitle: `${branches.length} สาขา`,
    icon: MapPin,
    variant: "hero",
    badge: "รอระบุข้อมูล",
  },
  {
    href: "/invoices",
    title: "ใบแจ้งหนี้",
    subtitle: "ดูรายการและสถานะการชำระเงิน",
    icon: FileText,
  },
  {
    href: "/receipts",
    title: "ใบเสร็จ",
    subtitle: "ดูใบเสร็จการชำระเงินย้อนหลัง",
    icon: Receipt,
  },
  {
    href: "/documents",
    title: "เอกสาร",
    subtitle: "เอกสารเพื่อการพิจารณาและยืนยัน",
    icon: FileCheck2,
  },
]
