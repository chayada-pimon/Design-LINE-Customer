import type { ReactNode } from "react"

export function Tag({
  children,
  className = "",
  dot = true,
}: {
  children: ReactNode
  className?: string
  dot?: boolean
}) {
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[length:var(--text-h2)] font-bold ${className}`}
    >
      {dot ? <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-current" /> : null}
      {children}
    </span>
  )
}
