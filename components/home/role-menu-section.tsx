import { Plus, type LucideIcon } from "lucide-react"

type RoleMenuItem = {
  label: string
  description: string
  icon: LucideIcon
  color?: string
  textColor?: string
}

type RoleMenuSectionProps = {
  featured?: boolean
  heading: string
  items: RoleMenuItem[]
}

export function RoleMenuSection({
  featured = false,
  heading,
  items,
}: RoleMenuSectionProps) {
  return (
    <section className="px-4 pt-7" aria-labelledby="role-services-heading">
      <h2
        className="text-[length:var(--text-h2)] font-bold text-[var(--color-text-muted)]"
        id="role-services-heading"
      >
        {heading}
      </h2>
      <div className={`mt-3 grid gap-3 max-[360px]:gap-2 ${featured ? "grid-cols-1" : "grid-cols-2"}`}>
        {items.map(({ icon: Icon, label, description, color, textColor }) => {
          const resolvedTextColor = textColor ?? "var(--color-surface)"
          const className = `interactive-card flex w-full items-center rounded-[var(--radius-card)] px-4 text-left max-[360px]:px-3 ${
            featured
              ? `min-h-20 gap-4 max-[360px]:gap-3 ${color ? "" : "bg-[var(--color-action)] text-[var(--color-surface)] active:bg-[var(--color-action-active)]"}`
              : "min-h-32 flex-col border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-4 text-center active:bg-[var(--color-surface-sunken)] max-[360px]:min-h-28 max-[360px]:py-3"
          }`
          const style =
            featured && color ? { backgroundColor: color, color: resolvedTextColor } : undefined
          const content = (
            <>
            <span
              className={`grid size-11 shrink-0 place-items-center max-[360px]:size-9 ${
                featured
                  ? "rounded-full bg-current/15 text-current"
                  : "text-[var(--color-action)]"
              }`}
            >
              <Icon aria-hidden="true" className="size-6 max-[360px]:size-5" />
            </span>
            <span className={featured ? "min-w-0" : "min-w-0 contents"}>
              <span className={featured ? "block truncate text-[length:var(--text-lg)] font-bold" : "mt-3 line-clamp-1 text-[length:var(--text-label)] font-bold"}>
                {label}
              </span>
              <span
                className={
                  featured
                    ? "mt-1 block truncate text-[length:var(--text-label)] text-current/85"
                    : "mt-1 line-clamp-2 text-[length:var(--text-h2)] text-[var(--color-text-muted)]"
                }
              >
                {description}
              </span>
            </span>
            {featured ? <Plus aria-hidden="true" className="ml-auto size-5 shrink-0" /> : null}
            </>
          )

          return featured ? (
            <button
              className={`${className} outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]`}
              key={label}
              style={style}
              type="button"
            >
              {content}
            </button>
          ) : (
            <div className={className} key={label}>
              {content}
            </div>
          )
        })}
      </div>
    </section>
  )
}
