import type { ReactNode } from "react"

type PageHeadingProps = {
  children: ReactNode
}

export function PageHeading({ children }: PageHeadingProps) {
  return (
    <div className="flex h-14 items-center justify-center bg-[linear-gradient(0deg,#FEEF85_0%,rgba(254,239,133,0)_100%)]">
      <h1 className="text-center text-xl leading-7 font-bold text-[#314158]">
        {children}
      </h1>
    </div>
  )
}
