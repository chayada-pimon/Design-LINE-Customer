"use client"

import { Building2, Check, ChevronDown } from "lucide-react"
import { useEffect, useRef, useState } from "react"

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
  const containerRef = useRef<HTMLDivElement>(null)

  const selectedBranch = branches.find((branch) => branch.id === value)
  const label = selectedBranch ? `${selectedBranch.name} (${selectedBranch.code})` : "ทุกสาขา"

  useEffect(() => {
    if (!open) return

    function handlePointerDown(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false)
    }

    document.addEventListener("pointerdown", handlePointerDown)
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [open])

  function select(branchId: string) {
    onChange(branchId)
    setOpen(false)
  }

  return (
    <div className="relative" ref={containerRef}>
      <span className="mb-1.5 block text-[length:var(--text-caption)] font-bold text-[var(--color-text-muted)]">
        กรองตามสาขา
      </span>
      <button
        aria-expanded={open}
        aria-haspopup="listbox"
        className="flex w-full items-center gap-2 rounded-[var(--radius-btn)] border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-3.5 py-2.5 text-left outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]"
        onClick={() => setOpen((current) => !current)}
        type="button"
      >
        <span className="grid size-7 shrink-0 place-items-center rounded-full bg-blue-100 text-[var(--color-brand-header)]">
          <Building2 aria-hidden="true" className="size-4" />
        </span>
        <span className="min-w-0 flex-1 truncate text-[length:var(--text-base)] font-bold text-[var(--color-text)]">
          {label}
        </span>
        <ChevronDown
          aria-hidden="true"
          className={`size-4 shrink-0 text-[var(--color-text-subtle)] transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open ? (
        <ul
          className="absolute inset-x-0 top-[calc(100%+0.375rem)] z-10 overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-card)]"
          role="listbox"
        >
          <li>
            <button
              aria-selected={value === ALL_BRANCHES}
              className={`flex w-full items-center justify-between gap-2 px-4 py-2.5 text-left text-[length:var(--text-base)] font-semibold ${
                value === ALL_BRANCHES
                  ? "bg-blue-50 text-[var(--color-brand-header)]"
                  : "text-[var(--color-text)] active:bg-[var(--color-surface-sunken)]"
              }`}
              onClick={() => select(ALL_BRANCHES)}
              role="option"
              type="button"
            >
              ทุกสาขา
              {value === ALL_BRANCHES ? <Check aria-hidden="true" className="size-4" /> : null}
            </button>
          </li>
          {branches.map((branch) => (
            <li key={branch.id}>
              <button
                aria-selected={value === branch.id}
                className={`flex w-full items-center justify-between gap-2 border-t border-[var(--color-border)] px-4 py-2.5 text-left text-[length:var(--text-base)] font-semibold ${
                  value === branch.id
                    ? "bg-blue-50 text-[var(--color-brand-header)]"
                    : "text-[var(--color-text)] active:bg-[var(--color-surface-sunken)]"
                }`}
                onClick={() => select(branch.id)}
                role="option"
                type="button"
              >
                <span className="truncate">
                  {branch.name} <span className="font-normal text-[var(--color-text-muted)]">({branch.code})</span>
                </span>
                {value === branch.id ? <Check aria-hidden="true" className="size-4 shrink-0" /> : null}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
