"use client"

import { Check, Pencil } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

import { EMPTY_ADDRESS, type AddressData } from "@/components/profile/address-fields"
import type { PersonalInfoData } from "@/components/profile/personal-info-section"
import { SectionCard } from "@/components/profile/section-card"
import { THAI_MONTHS } from "@/lib/thai-provinces"
import { loadProfile } from "@/lib/profile-storage"

const EMPTY_PERSONAL_INFO: PersonalInfoData = {
  fullName: "สมชาย ใจดี",
  taxId: "1234567890123",
  nickname: "",
  birthDay: "",
  birthMonth: "",
  birthYear: "",
  mobilePhone: "",
  phone: "",
  email: "",
  occupation: "",
  occupationOther: "",
}

function formatTaxId(taxId: string) {
  const groups = [1, 4, 5, 2, 1]
  let index = 0
  const parts: string[] = []
  for (const groupLength of groups) {
    parts.push(taxId.slice(index, index + groupLength))
    index += groupLength
  }
  return parts.filter(Boolean).join("-")
}

function formatBirthDate(personalInfo: PersonalInfoData) {
  const { birthDay, birthMonth, birthYear } = personalInfo
  if (!birthDay || !birthMonth || !birthYear) return "-"
  const monthName = THAI_MONTHS[Number(birthMonth) - 1] ?? birthMonth
  return `${birthDay} ${monthName} ${birthYear}`
}

function formatAddress(address: AddressData) {
  const { address: line, subdistrict, district, province, postalCode } = address
  const parts = [line, subdistrict, district, province, postalCode].filter(Boolean)
  return parts.length > 0 ? parts.join(" ") : "-"
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[length:var(--text-h2)] text-[var(--color-text-subtle)]">
        {label}
      </span>
      <span className="text-[length:var(--text-label)] font-bold text-[var(--color-text)]">
        {value || "-"}
      </span>
    </div>
  )
}

export function ProfileView() {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfoData>(EMPTY_PERSONAL_INFO)
  const [shippingAddress, setShippingAddress] = useState<AddressData>(EMPTY_ADDRESS)
  const [taxAddress, setTaxAddress] = useState<AddressData>(EMPTY_ADDRESS)
  const [taxSameAsShipping, setTaxSameAsShipping] = useState(true)

  useEffect(() => {
    const stored = loadProfile()
    if (!stored) return

    setPersonalInfo(stored.personalInfo)
    setShippingAddress(stored.shippingAddress)
    setTaxAddress(stored.taxAddress)
    setTaxSameAsShipping(stored.taxSameAsShipping)
  }, [])

  const occupationLabel =
    personalInfo.occupation === "อื่นๆ" ? personalInfo.occupationOther : personalInfo.occupation

  return (
    <div className="flex flex-col gap-4 px-4 pt-5">
      <SectionCard title="ข้อมูลส่วนตัว">
        <Row label="ชื่อ-นามสกุล/บริษัท" value={personalInfo.fullName} />
        <Row label="ชื่อเล่น" value={personalInfo.nickname} />
        <Row label="วัน/เดือน/ปีเกิด" value={formatBirthDate(personalInfo)} />
        <Row label="เบอร์มือถือ" value={personalInfo.mobilePhone} />
        <Row label="เบอร์โทรศัพท์" value={personalInfo.phone} />
        <Row label="อีเมล" value={personalInfo.email} />
        <Row label="อาชีพ" value={occupationLabel} />
        <Row label="เลขประจำตัวผู้เสียภาษี" value={formatTaxId(personalInfo.taxId)} />
      </SectionCard>

      <SectionCard title="ที่อยู่สำหรับจัดส่งเอกสาร">
        <Row label="ที่อยู่" value={formatAddress(shippingAddress)} />
      </SectionCard>

      <SectionCard title="ที่อยู่สำหรับใบกำกับภาษี">
        <Row
          label="ที่อยู่"
          value={taxSameAsShipping ? formatAddress(shippingAddress) : formatAddress(taxAddress)}
        />
        {taxSameAsShipping ? (
          <span className="text-[length:var(--text-h2)] text-[var(--color-text-subtle)]">
            ใช้ที่อยู่เดียวกับที่อยู่สำหรับจัดส่งเอกสาร
          </span>
        ) : null}
      </SectionCard>

      <div className="flex flex-col gap-2.5">
        <Link
          className="primary-action flex min-h-[var(--spacing-tap)] w-full items-center justify-center gap-2 rounded-[var(--radius-btn)] bg-[var(--color-action)] text-[length:var(--text-label)] font-bold text-[var(--color-surface)] active:bg-[var(--color-action-active)]"
          href="/"
        >
          <Check aria-hidden="true" className="size-4" />
          ยืนยัน
        </Link>
        <Link
          className="flex min-h-[var(--spacing-tap)] w-full items-center justify-center gap-2 rounded-[var(--radius-btn)] border border-[var(--color-border)] bg-[var(--color-surface)] text-[length:var(--text-label)] font-bold text-[var(--color-text)] active:bg-[var(--color-surface-sunken)]"
          href="/profile/edit"
        >
          <Pencil aria-hidden="true" className="size-4" />
          แก้ไขโปรไฟล์
        </Link>
      </div>
    </div>
  )
}
