"use client"

import Image from "next/image"
import { useState } from "react"
import {
  ChevronRight,
  LogOut,
  Menu,
  UsersRound,
  X,
  type LucideIcon,
} from "lucide-react"

type HomeHeaderProps = {
  showDrawer?: boolean
}

export function HomeHeader({ showDrawer = true }: HomeHeaderProps) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [drawerClosing, setDrawerClosing] = useState(false)

  function closeDrawer() {
    setDrawerClosing(true)
  }

  return (
    <header className="relative flex h-14 items-center justify-end bg-[#1C4ED8] px-2 text-[var(--color-surface)]">
      {showDrawer ? (
        <button
          aria-controls="main-drawer"
          aria-expanded={drawerOpen}
          aria-label="เปิดเมนู"
          className="icon-button grid size-11 place-items-center rounded-[9.6px] outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]"
          onClick={() => {
            setDrawerClosing(false)
            setDrawerOpen(true)
          }}
          type="button"
        >
          <Menu aria-hidden="true" className="size-6" strokeWidth={2.5} />
        </button>
      ) : null}
      <Image
        alt="CodeClean"
        className="absolute top-1/2 left-1/2 size-10 -translate-x-1/2 -translate-y-1/2 object-contain"
        height={40}
        priority
        src="/logo.svg"
        width={40}
      />

      {showDrawer && drawerOpen ? (
        <div
          className="fixed inset-0 z-20 mx-auto max-w-[430px]"
          role="presentation"
        >
          <button
            aria-label="ปิดเมนู"
            className={`drawer-backdrop absolute inset-0 bg-[var(--color-text)] opacity-40 ${
              drawerClosing ? "drawer-backdrop-closing" : ""
            }`}
            onClick={closeDrawer}
            type="button"
          />
          <aside
            aria-label="เมนูหลัก"
            aria-modal="true"
            className={`absolute inset-y-0 right-0 flex w-[min(20rem,86vw)] flex-col bg-[var(--color-surface)] p-4 text-[var(--color-text)] shadow-[var(--shadow-card)] ${
              drawerClosing ? "drawer-closing" : "drawer-opening"
            }`}
            id="main-drawer"
            onAnimationEnd={() => {
              if (drawerClosing) {
                setDrawerOpen(false)
                setDrawerClosing(false)
              }
            }}
            role="dialog"
          >
            <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-4">
              <p className="text-[length:var(--text-lg)] font-bold">เมนู</p>
              <button
                aria-label="ปิดเมนู"
                className="icon-button grid min-h-[var(--spacing-tap)] min-w-[var(--spacing-tap)] place-items-center rounded-[var(--radius-btn)] text-[var(--color-brand-header)]"
                onClick={closeDrawer}
                type="button"
              >
                <X aria-hidden="true" className="size-6" />
              </button>
            </div>
            <StaticDrawerItem icon={UsersRound} label="รายชื่อพนักงาน" />
            <div className="mt-auto border-t border-[var(--color-border)] pt-4">
              <button
                className="flex min-h-[var(--spacing-tap)] w-full items-center gap-2 rounded-[var(--radius-btn)] px-4 text-left text-[length:var(--text-label)] font-bold text-[var(--color-checkout)]"
                onClick={closeDrawer}
                type="button"
              >
                <LogOut aria-hidden="true" className="size-5" />
                ออกจากระบบ
              </button>
              <p className="mt-3 px-4 text-[length:var(--text-caption)] text-[var(--color-text-muted)]">
                เวอร์ชันแอป 1.0.0
              </p>
            </div>
          </aside>
        </div>
      ) : null}
    </header>
  )
}

function StaticDrawerItem({
  icon: Icon,
  label,
}: {
  icon: LucideIcon
  label: string
}) {
  return (
    <div className="drawer-item flex min-h-[3.25rem] w-full items-center justify-between border-b border-[var(--color-border)] px-3 text-[length:var(--text-label)] font-bold">
      <span className="flex items-center gap-2">
        <Icon
          aria-hidden="true"
          className="size-5 text-[var(--color-action)]"
        />
        {label}
      </span>
      <ChevronRight
        aria-hidden="true"
        className="size-5 text-[var(--color-text-muted)]"
      />
    </div>
  )
}
