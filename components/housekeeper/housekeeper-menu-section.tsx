import { Sparkles } from "lucide-react"

import { RoleMenuSection } from "@/components/home/role-menu-section"

const housekeeperMenuItems = [
  {
    label: "งานพ่อบ้าน",
    description: "ดูและจัดการงานพ่อบ้าน",
    icon: Sparkles,
  },
]

export function HousekeeperMenuSection() {
  return <RoleMenuSection featured heading="เมนูงานพ่อบ้าน" items={housekeeperMenuItems} />
}
