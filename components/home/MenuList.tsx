import { menuItems } from "@/components/home/menu-items"
import { MenuCard, MenuCardSkeleton } from "@/components/home/MenuCard"

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
