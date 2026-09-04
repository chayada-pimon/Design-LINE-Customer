"use client"

import { useEffect, useState } from "react"

export function useNavDrawer() {
  const [open, setOpen] = useState(false)
  const [closing, setClosing] = useState(false)

  useEffect(() => {
    if (!open) return

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setClosing(true)
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [open])

  function openDrawer() {
    setClosing(false)
    setOpen(true)
  }

  function closeDrawer() {
    setClosing(true)
  }

  function handleAnimationEnd() {
    if (closing) {
      setOpen(false)
      setClosing(false)
    }
  }

  return { open, closing, openDrawer, closeDrawer, handleAnimationEnd }
}
