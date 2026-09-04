import { FileCheck2, FileText, MapPin, Receipt, type LucideIcon } from "lucide-react"

import { branches } from "@/components/branches/branch-data"
import { MenuCard, MenuCardSkeleton } from "@/components/home/MenuCard"

type MenuItem = {
  href: string
  title: string
  subtitle: string
  icon: LucideIcon
  variant?: "default" | "hero"
  badge?: string
}

const menuItems: MenuItem[] = [
  {
    href: "/branches",
    title: "สาขาของคุณ",
    subtitle: `${branches.length} สาขา`,
    icon: MapPin,
    variant: "hero",
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

type MenuListProps = {
  loading?: boolean
}

export function MenuList({ loading = false }: MenuListProps) {
  if (loading) {
    return (
      <div aria-label="เมนูหลัก" className="grid grid-cols-1 gap-3">
        {menuItems.map((item) => (
          <MenuCardSkeleton key={item.href} />
        ))}
      </div>
    )
  }

  return (
    <div aria-label="เมนูหลัก" className="grid grid-cols-1 gap-3">
      {menuItems.map(({ href, title, subtitle, icon, variant, badge }) => (
        <MenuCard
          badge={badge}
          href={href}
          icon={icon}
          key={href}
          subtitle={subtitle}
          title={title}
          variant={variant}
        />
      ))}
    </div>
  )
}
