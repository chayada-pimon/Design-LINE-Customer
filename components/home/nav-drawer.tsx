"use client"

import { LogOut, Menu, X } from "lucide-react"

type MenuButtonProps = {
  className?: string
  onClick: () => void
  open: boolean
}

export function MenuButton({ className = "", onClick, open }: MenuButtonProps) {
  return (
    <button
      aria-controls="main-drawer"
      aria-expanded={open}
      aria-label="เปิดเมนู"
      className={`icon-button grid size-11 shrink-0 place-items-center rounded-[9.6px] outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)] ${className}`}
      onClick={onClick}
      type="button"
    >
      <Menu aria-hidden="true" className="size-6" strokeWidth={2.5} />
    </button>
  )
}

type NavDrawerProps = {
  closing: boolean
  onAnimationEnd: () => void
  onClose: () => void
  open: boolean
}

export function NavDrawer({ closing, onAnimationEnd, onClose, open }: NavDrawerProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50" role="presentation">
      <button
        aria-label="ปิดเมนู"
        className={`drawer-backdrop absolute inset-0 bg-[var(--color-text)] opacity-40 ${
          closing ? "drawer-backdrop-closing" : ""
        }`}
        onClick={onClose}
        type="button"
      />
      <aside
        aria-label="เมนูหลัก"
        aria-modal="true"
        className={`absolute inset-y-0 right-0 flex w-[min(20rem,86vw)] flex-col bg-[var(--color-surface)] p-4 text-[var(--color-text)] shadow-[var(--shadow-card)] ${
          closing ? "drawer-closing" : "drawer-opening"
        }`}
        id="main-drawer"
        onAnimationEnd={onAnimationEnd}
        role="dialog"
      >
        <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-4">
          <p className="text-[length:var(--text-lg)] font-bold">เมนู</p>
          <button
            aria-label="ปิดเมนู"
            className="icon-button grid min-h-[var(--spacing-tap)] min-w-[var(--spacing-tap)] place-items-center rounded-[var(--radius-btn)] text-[var(--color-brand-header)] outline-none focus-visible:outline-2 focus-visible:outline-[var(--color-focus)]"
            onClick={onClose}
            type="button"
          >
            <X aria-hidden="true" className="size-6" />
          </button>
        </div>
        <div className="mt-auto border-t border-[var(--color-border)] pt-4">
          <button
            className="flex min-h-[var(--spacing-tap)] w-full items-center gap-2 rounded-[var(--radius-btn)] px-4 text-left text-[length:var(--text-label)] font-bold text-[var(--color-checkout)] outline-none focus-visible:outline-2 focus-visible:outline-[var(--color-focus)]"
            onClick={onClose}
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
  )
}
