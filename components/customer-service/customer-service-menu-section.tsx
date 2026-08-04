import { CircleHelp } from "lucide-react"

import { RoleMenuSection } from "@/components/home/role-menu-section"

const customerServiceMenuItems = [
  {
    label: "แจ้งปัญหา",
    description: "รับและจัดการปัญหาลูกค้า",
    icon: CircleHelp,
  },
]

export function CustomerServiceMenuSection() {
  return (
      <RoleMenuSection
        featured
        heading="เมนู Customer Service"
        items={customerServiceMenuItems}
      />
  )
}
