import { Megaphone } from "lucide-react"
import type { ReactNode } from "react"

export function AnnouncementCard({
  action,
  label = "ประกาศทั้งหมด",
  count = "5 รายการ",
}: {
  action?: ReactNode
  label?: string
  count?: string
}) {
  return (
    <div className="flex w-full items-center gap-3 rounded-2xl border border-blue-100 bg-blue-50/70 px-4 py-3 max-[360px]:gap-2 max-[360px]:px-3">
      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white text-[var(--color-action)] shadow-[var(--shadow-card)] max-[360px]:size-9">
        <Megaphone aria-hidden="true" className="size-5 max-[360px]:size-4" strokeWidth={1.75} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[length:var(--text-caption)] text-[var(--color-text-muted)]">
          {label}
        </span>
        <span className="mt-0.5 block truncate text-[length:var(--text-lg)] font-extrabold text-[var(--color-text)]">
          {count}
        </span>
      </span>
      {action ? <span className="min-w-0 shrink">{action}</span> : null}
    </div>
  )
}
