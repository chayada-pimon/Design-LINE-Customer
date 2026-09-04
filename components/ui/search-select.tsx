"use client"

import { Check, ChevronDown, Search, X } from "lucide-react"
import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react"

import { fieldInputClass } from "@/components/profile/form-field"

export type SearchSelectOption = {
  value: string
  label: string
}

export type SearchSelectHandle = {
  open: () => void
}

type SearchSelectProps = {
  id?: string
  value: string
  options: readonly SearchSelectOption[] | readonly string[]
  onChange: (value: string) => void
  placeholder: string
  searchPlaceholder?: string
  emptyLabel?: string
  disabled?: boolean
  /** Fires once the sheet has fully closed after the user picked an option (not on dismiss). */
  onSelected?: () => void
}

function normalizeOptions(options: readonly SearchSelectOption[] | readonly string[]): SearchSelectOption[] {
  return options.map((option) => (typeof option === "string" ? { value: option, label: option } : option))
}

// Older iOS Safari (pre-15.4) doesn't understand the `dvh` unit and drops the
// declaration entirely, leaving the sheet with no height cap on small screens.
const supportsDvh =
  typeof CSS !== "undefined" && typeof CSS.supports === "function" && CSS.supports("height", "1dvh")

export const SearchSelect = forwardRef<SearchSelectHandle, SearchSelectProps>(function SearchSelect(
  { id, value, options, onChange, placeholder, searchPlaceholder = "ค้นหา", emptyLabel = "ไม่พบข้อมูล", disabled, onSelected },
  ref,
) {
  const [open, setOpen] = useState(false)
  const [closing, setClosing] = useState(false)
  const [query, setQuery] = useState("")
  const [viewportRect, setViewportRect] = useState<{ top: number; height: number } | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const closedViaSelectRef = useRef(false)
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const normalized = useMemo(() => normalizeOptions(options), [options])
  const selected = normalized.find((option) => option.value === value)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return normalized
    return normalized.filter((option) => option.label.toLowerCase().includes(q))
  }, [normalized, query])

  function openSheet() {
    if (disabled) return
    setQuery("")
    setClosing(false)
    setOpen(true)
  }

  function requestClose(viaSelect = false) {
    closedViaSelectRef.current = viaSelect
    setClosing(true)
  }

  function handleSelect(optionValue: string) {
    onChange(optionValue)
    requestClose(true)
  }

  function finishClosing() {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
    setOpen(false)
    setClosing(false)
    setViewportRect(null)
    if (closedViaSelectRef.current) {
      closedViaSelectRef.current = false
      onSelected?.()
    }
  }

  useImperativeHandle(ref, () => ({ open: openSheet }))

  // Safety net: if the sheet-exit animationend never fires (backgrounded tab,
  // interrupted animation, etc.), force the sheet closed so the body scroll
  // lock and full-screen overlay don't get stuck forever.
  useEffect(() => {
    if (!closing) return
    closeTimeoutRef.current = setTimeout(finishClosing, 500)
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current)
        closeTimeoutRef.current = null
      }
    }
  }, [closing])

  useEffect(() => {
    if (!open) return
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") requestClose()
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [open])

  // Don't autofocus while the sheet is still sliding in: focusing mid-animation
  // (the sheet is transform: translateY at that point) makes iOS Safari
  // miscompute the caret position it needs to scroll into view, which shows up
  // as the page zooming in instead of the keyboard opening cleanly. Focus only
  // once the sheet-enter animation has settled (see onAnimationEnd below).

  useEffect(() => {
    if (!open) return
    const { style } = document.body
    const previousOverflow = style.overflow
    style.overflow = "hidden"
    return () => {
      style.overflow = previousOverflow
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const viewport = window.visualViewport
    if (viewport) {
      const updateRect = () => setViewportRect({ top: viewport.offsetTop, height: viewport.height })
      updateRect()
      viewport.addEventListener("resize", updateRect)
      viewport.addEventListener("scroll", updateRect)
      return () => {
        viewport.removeEventListener("resize", updateRect)
        viewport.removeEventListener("scroll", updateRect)
      }
    }
    // Fallback for old iOS Safari, which lacks the visualViewport API: use
    // window.innerHeight so the sheet still gets an explicit height instead
    // of depending on vh/dvh units that misbehave with the on-screen chrome.
    const updateRect = () => setViewportRect({ top: 0, height: window.innerHeight })
    updateRect()
    window.addEventListener("resize", updateRect)
    window.addEventListener("orientationchange", updateRect)
    return () => {
      window.removeEventListener("resize", updateRect)
      window.removeEventListener("orientationchange", updateRect)
    }
  }, [open])

  return (
    <>
      <button
        aria-haspopup="dialog"
        className={`${fieldInputClass} flex items-center justify-between gap-2 text-left disabled:cursor-not-allowed disabled:opacity-60`}
        disabled={disabled}
        id={id}
        onClick={openSheet}
        type="button"
      >
        <span className={`truncate ${selected ? "text-[var(--color-text)]" : "text-[var(--color-text-subtle)]"}`}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown aria-hidden="true" className="size-4 shrink-0 text-[var(--color-text-subtle)]" />
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center"
          role="presentation"
          style={viewportRect ? { top: viewportRect.top, height: viewportRect.height } : undefined}
        >
          <button
            aria-label="ปิด"
            className={`drawer-backdrop absolute inset-0 bg-[var(--color-text)] opacity-40 ${
              closing ? "drawer-backdrop-closing" : ""
            }`}
            onClick={() => requestClose()}
            type="button"
          />
          <div
            aria-modal="true"
            className={`relative flex h-[95%] w-full flex-col overflow-hidden rounded-t-2xl bg-[var(--color-surface)] text-[var(--color-text)] shadow-[var(--shadow-card)] ${
              closing ? "sheet-closing" : "sheet-opening"
            }`}
            style={!viewportRect ? { height: supportsDvh ? "95dvh" : "95vh" } : undefined}
            onAnimationEnd={() => {
              if (closing) finishClosing()
              else inputRef.current?.focus()
            }}
            role="dialog"
          >
            <div className="flex h-[68px] shrink-0 items-center justify-between border-b border-[var(--color-border)] px-5">
              <h2 className="text-[length:var(--text-h1)] font-bold text-[var(--color-text)]">{placeholder}</h2>
              <button
                aria-label="ปิด"
                className="grid size-11 shrink-0 place-items-center rounded-full text-[var(--color-text-muted)] outline-none hover:bg-[var(--color-surface-sunken)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]"
                onClick={() => requestClose()}
                type="button"
              >
                <X aria-hidden="true" className="size-5" />
              </button>
            </div>

            <div className="shrink-0 border-b border-[var(--color-border)] px-5 py-3">
              <div className="relative">
                <Search
                  aria-hidden="true"
                  className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[var(--color-text-subtle)]"
                />
                <input
                  className={`${fieldInputClass} pl-9`}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={searchPlaceholder}
                  ref={inputRef}
                  value={query}
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto overscroll-contain py-2">
              {filtered.length === 0 ? (
                <p className="px-5 py-6 text-center text-[length:var(--text-label)] text-[var(--color-text-subtle)]">
                  {emptyLabel}
                </p>
              ) : (
                <ul>
                  {filtered.map((option) => (
                    <li key={option.value}>
                      <button
                        className="flex w-full items-center justify-between gap-2 px-5 py-3 text-left text-[length:var(--text-label)] text-[var(--color-text)] outline-none hover:bg-[var(--color-surface-sunken)] focus-visible:bg-[var(--color-surface-sunken)]"
                        onClick={() => handleSelect(option.value)}
                        type="button"
                      >
                        <span className="truncate">{option.label}</span>
                        {option.value === value ? (
                          <Check aria-hidden="true" className="size-4 shrink-0 text-[var(--color-brand-header)]" />
                        ) : null}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
})
