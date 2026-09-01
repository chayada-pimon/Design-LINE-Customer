import { Header } from "@/components/home/Header"
import { HomeLayout } from "@/components/home/home-layout"
import { MenuList } from "@/components/home/MenuList"

export default function HomePage() {
  return (
    <HomeLayout>
      <Header />
      <div
        className="relative z-20 -mt-48 flex min-h-[calc(100svh-19rem)] flex-col bg-[var(--color-bg)] pt-4"
        style={{
          paddingLeft: "max(1rem, env(safe-area-inset-left))",
          paddingRight: "max(1rem, env(safe-area-inset-right))",
          paddingBottom: "max(1rem, env(safe-area-inset-bottom))",
        }}
      >
        <div className="mb-3 flex items-end justify-between gap-4 px-1">
          <div>
            <h2 className="mt-0.5 text-[length:var(--text-lg)] font-extrabold text-[var(--color-text)]">
              เมนูบริการ
            </h2>
          </div>
          <span className="pb-0.5 text-[length:var(--text-caption)] text-[var(--color-text-muted)]">
            เลือกรายการ
          </span>
        </div>
        <MenuList />
      </div>
    </HomeLayout>
  )
}
