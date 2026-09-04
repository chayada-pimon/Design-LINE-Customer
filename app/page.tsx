import { Header } from "@/components/home/Header"
import { HomeLayout } from "@/components/home/home-layout"
import { MenuList } from "@/components/home/MenuList"

export default function HomePage() {
  return (
    <HomeLayout>
      <Header />
      <div className="relative left-1/2 z-20 -mt-28 w-screen -translate-x-1/2 bg-[var(--color-bg)]">
        <img
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-full -z-10 w-full select-none"
          src="/images/BG.svg"
        />
        <div
          className="mx-auto flex min-h-[calc(100svh-19rem)] max-w-[430px] flex-col pt-4"
          style={{
            paddingLeft: "max(1rem, env(safe-area-inset-left))",
            paddingRight: "max(1rem, env(safe-area-inset-right))",
            paddingBottom: "max(1rem, env(safe-area-inset-bottom))",
          }}
        >
          <div className="mb-3 flex items-end justify-between gap-4">
            <div>
              <h2 className="mt-0.5 text-[length:var(--text-base)] font-bold text-[var(--color-text)]">
                เมนูบริการ
              </h2>
            </div>
          </div>
          <MenuList />
        </div>
      </div>
    </HomeLayout>
  )
}
