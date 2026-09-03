"use client"

import Image from "next/image"
import { LogOut, Menu, X } from "lucide-react"
import { useEffect, useState } from "react"

import { ProfileCard } from "@/components/home/ProfileCard"

export function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [drawerClosing, setDrawerClosing] = useState(false)

  useEffect(() => {
    if (!drawerOpen) return

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setDrawerClosing(true)
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [drawerOpen])

  function closeDrawer() {
    setDrawerClosing(true)
  }

  return (
    <>
      <header className="relative z-0 overflow-hidden bg-[var(--color-brand-header)] px-4 pb-20">
        <div className="relative z-10 flex h-14 items-center justify-between">
          <span aria-hidden="true" className="size-10" />
          <span className="size-10 shrink-0">
            <Image
              alt="CodeClean"
              className="size-full object-contain"
              height={40}
              priority
              src="/logo.svg"
              width={40}
            />
          </span>
          <button
            aria-controls="main-drawer"
            aria-expanded={drawerOpen}
            aria-label="เปิดเมนู"
            className="icon-button grid size-10 shrink-0 place-items-center rounded-full text-white outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            onClick={() => {
              setDrawerClosing(false)
              setDrawerOpen(true)
            }}
            type="button"
          >
            <Menu aria-hidden="true" className="size-6" strokeWidth={1.75} />
          </button>
        </div>
        <div className="relative z-10 mt-3">
          <h1 className="mt-1 text-center text-[length:var(--text-lg)] leading-[var(--text-lg--line-height)] font-bold text-white">
            หน้าหลัก
          </h1>
        </div>
        <div className="relative z-10 mt-6">
          <ProfileCard />
        </div>
      </header>

      {drawerOpen ? (
        <div className="fixed inset-0 z-50 mx-auto max-w-[430px]" role="presentation">
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
            className={`absolute inset-y-0 right-0 flex w-[min(20rem,86vw)] flex-col bg-[var(--color-surface)] p-4 text-[var(--color-text)] shadow-xl ${
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
                className="grid min-h-[var(--spacing-tap)] min-w-[var(--spacing-tap)] place-items-center rounded-[var(--radius-btn)] text-[var(--color-brand-header)] outline-none focus-visible:outline-2 focus-visible:outline-[var(--color-focus)]"
                onClick={closeDrawer}
                type="button"
              >
                <X aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="mt-auto border-t border-[var(--color-border)] pt-4">
              <button
                className="flex min-h-[var(--spacing-tap)] w-full items-center gap-2 rounded-[var(--radius-btn)] px-4 text-left text-[length:var(--text-label)] font-bold text-[var(--color-checkout)] outline-none focus-visible:outline-2 focus-visible:outline-[var(--color-focus)]"
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
    </>
  )
}
