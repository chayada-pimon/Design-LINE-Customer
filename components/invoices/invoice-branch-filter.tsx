"use client"

import { Building2, Check, X } from "lucide-react"
import { useEffect, useState } from "react"

import type { Branch } from "@/components/branches/branch-data"

const ALL_BRANCHES = "all"

export { ALL_BRANCHES }

export function InvoiceBranchFilter({
  branches,
  value,
  onChange,
}: {
  branches: Branch[]
  value: string
  onChange: (branchId: string) => void
}) {
  const [open, setOpen] = useState(false)
  const [visible, setVisible] = useState(false)

  const selectedBranch = branches.find((branch) => branch.id === value)
  const label = selectedBranch ? `สาขา ${selectedBranch.name} (${selectedBranch.code})` : "ทุกสาขา"

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = "hidden"
    const raf = requestAnimationFrame(() => setVisible(true))

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") close()
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.body.style.overflow = ""
      cancelAnimationFrame(raf)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [open])

  function close() {
    setVisible(false)
    setTimeout(() => setOpen(false), 200)
  }

  function select(branchId: string) {
    onChange(branchId)
    close()
  }

  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-[length:var(--text-caption)] font-bold text-[var(--color-text-muted)]">
        กรองตามสาขา
      </span>
      <button
        aria-expanded={open}
        aria-haspopup="dialog"
        className="inline-flex max-w-[65%] items-center gap-1.5 rounded-full border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-3.5 py-2 text-left outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]"
        onClick={() => setOpen(true)}
        type="button"
      >
        <Building2 aria-hidden="true" className="size-4 shrink-0 text-[var(--color-brand-header)]" />
        <span className="min-w-0 truncate text-[length:var(--text-h2)] font-bold text-[var(--color-text)]">
          {label}
        </span>
      </button>

      {open ? (
        <div aria-modal="true" className="fixed inset-0 z-50" role="dialog">
          <div
            className={`absolute inset-0 bg-black/50 transition-opacity duration-200 ${
              visible ? "opacity-100" : "opacity-0"
            }`}
            onClick={close}
          />
          <div
            className={`absolute inset-x-0 bottom-0 max-h-[85vh] rounded-t-[var(--radius-card)] bg-[var(--color-surface)] shadow-[var(--shadow-card)] transition-transform duration-200 ${
              visible ? "translate-y-0" : "translate-y-full"
            } flex flex-col`}
          >
            <div className="flex shrink-0 items-center justify-between border-b border-[var(--color-border)] px-4 py-3">
              <p className="text-[length:var(--text-base)] font-bold text-[var(--color-text)]">
                กรองตามสาขา
              </p>
              <button
                aria-label="ปิด"
                className="grid size-8 place-items-center rounded-full text-[var(--color-text-subtle)] active:bg-[var(--color-surface-sunken)]"
                onClick={close}
                type="button"
              >
                <X aria-hidden="true" className="size-5" />
              </button>
            </div>

            <ul className="min-h-0 flex-1 overflow-y-auto px-2 py-2" role="listbox">
              <li>
                <button
                  aria-selected={value === ALL_BRANCHES}
                  className={`flex w-full items-center justify-between gap-2 rounded-[var(--radius-btn)] border px-2.5 py-2.5 text-left text-[length:var(--text-label)] font-semibold ${
                    value === ALL_BRANCHES
                      ? "border-[var(--color-brand-header)] bg-blue-50 text-[var(--color-brand-header)]"
                      : "border-transparent text-[var(--color-text)] active:bg-[var(--color-surface-sunken)]"
                  }`}
                  onClick={() => select(ALL_BRANCHES)}
                  role="option"
                  type="button"
                >
                  ทุกสาขา
                  {value === ALL_BRANCHES ? <Check aria-hidden="true" className="size-4 shrink-0 text-[var(--color-brand-header)]" /> : null}
                </button>
              </li>
              {branches.map((branch) => (
                <li key={branch.id}>
                  <button
                    aria-selected={value === branch.id}
                    className={`flex w-full items-center justify-between gap-2 rounded-[var(--radius-btn)] border px-2.5 py-2.5 text-left text-[length:var(--text-label)] font-semibold ${
                      value === branch.id
                        ? "border-[var(--color-brand-header)] bg-blue-50 text-[var(--color-brand-header)]"
                        : "border-transparent text-[var(--color-text)] active:bg-[var(--color-surface-sunken)]"
                    }`}
                    onClick={() => select(branch.id)}
                    role="option"
                    type="button"
                  >
                    <span className="flex min-w-0 items-center gap-1.5">
                      <span className="truncate">สาขา {branch.name}</span>
                      <span className="shrink-0 rounded-full bg-blue-100 px-1.5 py-0.5 text-[length:var(--text-h2)] font-bold text-[var(--color-brand-header)]">
                        {branch.code}
                      </span>
                    </span>
                    {value === branch.id ? (
                      <Check aria-hidden="true" className="size-4 shrink-0 text-[var(--color-brand-header)]" />
                    ) : null}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  )
}
