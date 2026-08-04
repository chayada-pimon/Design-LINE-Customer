import { Bike, Wrench } from "lucide-react"

import { RoleMenuSection } from "@/components/home/role-menu-section"

const technicianMenuItems = [
  {
    label: "งานช่าง / Logistics",
    description: "จัดการงานช่างและขนส่ง",
    icon: Wrench,
    color: "var(--color-action)",
  },
  {
    label: "งานไรเดอร์",
    description: "ดูและรับงานจัดส่ง",
    icon: Bike,
    color: "var(--color-yellow-400)",
    textColor: "var(--color-slate-900)",
  },
]

export function TechnicianMenuSection() {
  return <RoleMenuSection featured heading="เมนูงานช่าง" items={technicianMenuItems} />
}
