"use client"

import Image from "next/image"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

import { MenuButton, NavDrawer } from "@/components/home/nav-drawer"
import { ProfileCard } from "@/components/home/ProfileCard"
import { useNavDrawer } from "@/components/home/use-nav-drawer"

type HeaderProps = {
  backHref?: string
  showProfileCard?: boolean
  title?: string
}

export function Header({ backHref, showProfileCard = true, title = "หน้าหลัก" }: HeaderProps) {
  const { closing, handleAnimationEnd, open, openDrawer, closeDrawer } = useNavDrawer()

  return (
    <>
      <header className="relative left-1/2 z-0 w-screen -translate-x-1/2 overflow-hidden bg-[var(--color-brand-header)] px-4">
        <div className="relative z-10 mx-auto flex h-14 max-w-[430px] items-center justify-between">
          {backHref ? (
            <Link
              aria-label="ย้อนกลับ"
              className="icon-button grid size-11 shrink-0 place-items-center rounded-[9.6px] text-white outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]"
              href={backHref}
            >
              <ChevronLeft aria-hidden="true" className="size-6" strokeWidth={2.5} />
            </Link>
          ) : (
            <span aria-hidden="true" className="size-11" />
          )}
          <span className="size-10 shrink-0">
            <Image
              alt="CodeClean"
              className="size-full object-contain"
              height={40}
              priority
              src="/logo.svg"
              width={40}
            />
          </span>
          <MenuButton className="text-white" onClick={openDrawer} open={open} />
        </div>
        <div className="relative z-10 mx-auto mt-3 max-w-[430px]">
          <h1 className="mt-1 text-center text-[length:var(--text-lg)] leading-[var(--text-lg--line-height)] font-bold text-white">
            {title}
          </h1>
        </div>
        {showProfileCard ? (
          <div className="relative z-10 mx-auto mt-6 max-w-[430px]">
            <ProfileCard />
          </div>
        ) : (
          <span aria-hidden="true" className="relative z-10 mx-auto block max-w-[430px] pb-6" />
        )}
      </header>

      <NavDrawer closing={closing} onAnimationEnd={handleAnimationEnd} onClose={closeDrawer} open={open} />
    </>
  )
}
