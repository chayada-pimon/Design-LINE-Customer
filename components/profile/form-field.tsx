import { ChevronDown } from "lucide-react"
import type { ReactNode, SelectHTMLAttributes } from "react"

type FormFieldProps = {
  label: ReactNode
  htmlFor?: string
  required?: boolean
  hint?: string
  children: ReactNode
}

export function FormField({ label, htmlFor, required, hint, children }: FormFieldProps) {
  return (
    <label className="flex flex-col gap-1.5" htmlFor={htmlFor}>
      <span className="text-[length:var(--text-label)] font-bold text-[var(--color-text)]">
        {label}
        {required ? <span className="ml-0.5 text-[var(--color-danger)]">*</span> : null}
      </span>
      {children}
      {hint ? (
        <span className="text-[length:var(--text-caption)] text-[var(--color-text-subtle)]">
          {hint}
        </span>
      ) : null}
    </label>
  )
}

export const fieldInputClass =
  "min-h-[var(--spacing-tap)] w-full rounded-[var(--radius-btn)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3.5 text-[length:var(--text-label)] text-[var(--color-text)] outline-none placeholder:text-[var(--color-text-subtle)] focus-visible:border-[var(--color-focus)] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--color-focus)]"

export const fieldSelectClass = `${fieldInputClass} appearance-none pr-10`

export const fieldLockedClass =
  "min-h-[var(--spacing-tap)] w-full rounded-[var(--radius-btn)] border border-[var(--color-border)] bg-[var(--color-surface-sunken)] px-3.5 text-[length:var(--text-label)] text-[var(--color-text-muted)] flex items-center"

export function Select({
  className,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative">
      <select className={`${fieldSelectClass} ${className ?? ""}`} {...props} />
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-[var(--color-text-subtle)]"
      />
    </div>
  )
}
