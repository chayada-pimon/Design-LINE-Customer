import { ChevronRight, type LucideIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

type MenuCardProps = {
  href: string
  icon: LucideIcon
  title: string
  subtitle: string
  variant?: "default" | "hero"
  badge?: string
}

function BranchIllustration() {
  return (
    <Image
      alt=""
      aria-hidden="true"
      className="shrink-0 object-contain"
      height={56}
      src="/branch-illustration.png"
      width={74}
    />
  )
}

export function MenuCard({ href, icon: Icon, title, subtitle, variant = "default", badge }: MenuCardProps) {
  const isHero = variant === "hero"

  return (
    <Link
      className={`interactive-card flex w-full items-center gap-3 rounded-2xl px-4 outline-none focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--color-focus)] ${
        isHero
          ? "border border-blue-300 bg-blue-50/60 py-3 shadow-[var(--shadow-card)] active:bg-blue-100/60"
          : "py-4 bg-[var(--color-surface)] shadow-[var(--shadow-card)] active:bg-[var(--color-surface-sunken)]"
      }`}
      href={href}
    >
      <span
        className={`grid shrink-0 place-items-center rounded-full text-[var(--color-action)] ${
          isHero ? "size-10 bg-white shadow-[var(--shadow-card)]" : "size-11 bg-blue-50"
        }`}
      >
        <Icon aria-hidden="true" className="size-5" strokeWidth={1.75} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[length:var(--text-label)] font-bold text-[var(--color-text)]">
          {title}
        </span>
        <span className="mt-0.5 flex min-w-0 items-center gap-2">
          <span className="truncate text-[length:var(--text-caption)] text-slate-500">
            {subtitle}
          </span>
          {badge ? (
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[var(--color-warning-soft)] px-2 py-0.5 text-[length:var(--text-caption)] font-semibold text-[var(--color-warning)]">
              <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-current" />
              {badge}
            </span>
          ) : null}
        </span>
      </span>
      {isHero ? <BranchIllustration /> : null}
      <ChevronRight aria-hidden="true" className="size-5 shrink-0 text-slate-300" />
    </Link>
  )
}

export function MenuCardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="flex w-full items-center gap-3 rounded-2xl bg-[var(--color-surface)] px-4 py-4 shadow-[var(--shadow-card)]"
    >
      <span className="size-11 shrink-0 animate-pulse rounded-full bg-slate-200" />
      <span className="min-w-0 flex-1 space-y-2">
        <span className="block h-3.5 w-2/5 animate-pulse rounded-full bg-slate-200" />
        <span className="block h-3 w-3/5 animate-pulse rounded-full bg-slate-100" />
      </span>
    </div>
  )
}
