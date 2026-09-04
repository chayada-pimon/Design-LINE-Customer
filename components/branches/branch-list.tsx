"use client"

import { Building2, ChevronRight, MapPin, Phone, Search } from "lucide-react"
import { useMemo, useState } from "react"

import { BranchDetailModal } from "@/components/branches/branch-detail-modal"
import { branches, type Branch } from "@/components/branches/branch-data"
import { Tag } from "@/components/ui/tag"

export function BranchList() {
  const [query, setQuery] = useState("")
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return branches
    return branches.filter(({ name, code, address }) =>
      [name, code, address].some((value) => value?.toLowerCase().includes(q))
    )
  }, [query])

  return (
    <div className="space-y-4">
      <label className="relative block">
        <span className="sr-only">ค้นหาสาขา</span>
        <Search
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-[var(--color-text-subtle)]"
        />
        <input
          className="w-full rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] py-2.5 pr-4 pl-10 text-[length:var(--text-base)] text-[var(--color-text)] outline-none placeholder:text-[var(--color-text-subtle)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]"
          onChange={(event) => setQuery(event.target.value)}
          placeholder="ค้นหาชื่อ รหัส หรือที่อยู่สาขา"
          type="search"
          value={query}
        />
      </label>

      {filtered.length === 0 ? (
        <p className="rounded-[var(--radius-card)] border border-dashed border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-6 text-center text-[length:var(--text-base)] text-[var(--color-text-muted)]">
          ไม่พบสาขาที่ค้นหา
        </p>
      ) : (
        <ul className="space-y-3">
          {filtered.map((branch) => {
            const { id, name, code, address, phone } = branch
            const hasIncompleteInfo =
              !address?.trim() ||
              !phone?.trim() ||
              !branch.contractStart ||
              !branch.contractEnd
            return (
              <li key={id}>
                <button
                  className="interactive-card block w-full rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-left shadow-[var(--shadow-card)] outline-none focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--color-focus)] active:bg-[var(--color-surface-sunken)]"
                  onClick={() => setSelectedBranch(branch)}
                  type="button"
                >
                  <div className="flex items-start gap-3">
                    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-blue-100 text-[var(--color-brand-header)]">
                      <Building2 aria-hidden="true" className="size-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className="truncate text-[length:var(--text-label)] font-bold text-[var(--color-text)]">
                          {name}
                        </p>
                        {hasIncompleteInfo ? (
                          <Tag className="bg-[var(--color-warning-soft)] text-[var(--color-warning)]">
                            รอระบุข้อมูล
                          </Tag>
                        ) : null}
                      </div>
                      <div className="mt-1.5 flex flex-wrap items-center gap-2">
                        <span className="inline-flex shrink-0 items-center rounded-full bg-blue-100 px-2 py-0.5 text-[length:var(--text-h2)] font-bold text-[var(--color-brand-header)]">
                          รหัส {code}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 space-y-1.5 border-t border-[var(--color-border)] pt-3">
                    <p className="flex items-start gap-2 text-[length:var(--text-h2)] text-[var(--color-text-muted)]">
                      <MapPin
                        aria-hidden="true"
                        className="mt-0.5 size-3.5 shrink-0 text-[var(--color-text-subtle)]"
                      />
                      <span>{address}</span>
                    </p>
                    <div className="flex items-center justify-between gap-2">
                      <p className="flex items-center gap-2 text-[length:var(--text-h2)] text-[var(--color-text-muted)]">
                        <Phone
                          aria-hidden="true"
                          className="size-3.5 shrink-0 text-[var(--color-text-subtle)]"
                        />
                        <span>{phone ?? "ไม่พบข้อมูล"}</span>
                      </p>
                      <span className="flex items-center gap-1 text-[length:var(--text-caption)] text-[var(--color-text-subtle)]">
                        <ChevronRight aria-hidden="true" className="size-5 shrink-0" />
                      </span>
                    </div>
                  </div>
                </button>
              </li>
            )
          })}
        </ul>
      )}

      {selectedBranch ? (
        <BranchDetailModal
          branch={selectedBranch}
          onClose={() => setSelectedBranch(null)}
        />
      ) : null}
    </div>
  )
}
