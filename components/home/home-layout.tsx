import type { ReactNode } from "react"

type HomeLayoutProps = {
  children: ReactNode
}

export function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <main className="min-h-svh bg-[var(--color-bg)] text-[var(--color-text)]">
      <div className="mx-auto min-h-svh max-w-[430px] bg-[var(--color-bg)] pb-8">
        {children}
      </div>
    </main>
  )
}
