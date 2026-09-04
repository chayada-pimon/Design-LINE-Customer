import type { ReactNode } from "react"

type HomeLayoutProps = {
  children: ReactNode
}

export function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <main className="bg-[var(--color-bg)] text-[var(--color-text)]">
      <div className="isolate bg-[var(--color-bg)] pb-8">{children}</div>
    </main>
  )
}
