import type { ReactNode } from "react"

type SectionCardProps = {
  step?: number
  title: string
  subtitle?: string
  children: ReactNode
}

export function SectionCard({ step, title, subtitle, children }: SectionCardProps) {
  return (
    <section className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-[var(--shadow-card)]">
      <div className="mb-4 flex items-start gap-2.5">
        {step ? (
          <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand-header)] text-[length:var(--text-h2)] font-bold text-[var(--color-surface)]">
            {step}
          </span>
        ) : null}
        <div className="flex flex-col gap-0.5">
          <h2 className="text-[length:var(--text-base)] font-bold text-[var(--color-brand-header)]">
            {title}
          </h2>
          {subtitle ? (
            <p className="text-[length:var(--text-h2)] text-[var(--color-text-subtle)]">
              {subtitle}
            </p>
          ) : null}
        </div>
      </div>
      <div className="flex flex-col gap-4">{children}</div>
    </section>
  )
}
