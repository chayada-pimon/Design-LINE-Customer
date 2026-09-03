"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import { EMPTY_ADDRESS, type AddressData } from "@/components/profile/address-fields"
import {
  PersonalInfoSection,
  type PersonalInfoData,
} from "@/components/profile/personal-info-section"
import { ShippingAddressSection } from "@/components/profile/shipping-address-section"
import { TaxInvoiceAddressSection } from "@/components/profile/tax-invoice-address-section"
import { loadProfile, saveProfile } from "@/lib/profile-storage"

const INITIAL_PERSONAL_INFO: PersonalInfoData = {
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

export function ProfileEditForm() {
  const router = useRouter()
  const [personalInfo, setPersonalInfo] = useState<PersonalInfoData>(INITIAL_PERSONAL_INFO)
  const [shippingAddress, setShippingAddress] = useState<AddressData>(EMPTY_ADDRESS)
  const [taxSameAsShipping, setTaxSameAsShipping] = useState(true)
  const [taxAddress, setTaxAddress] = useState<AddressData>(EMPTY_ADDRESS)

  useEffect(() => {
    const stored = loadProfile()
    if (!stored) return

    setPersonalInfo(stored.personalInfo)
    setShippingAddress(stored.shippingAddress)
    setTaxAddress(stored.taxAddress)
    setTaxSameAsShipping(stored.taxSameAsShipping)
  }, [])

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()

    saveProfile({ personalInfo, shippingAddress, taxAddress, taxSameAsShipping })

    router.push("/profile")
  }

  return (
    <form className="flex flex-col gap-4 px-4 pt-5" onSubmit={handleSubmit}>
      <PersonalInfoSection onChange={setPersonalInfo} value={personalInfo} />
      <ShippingAddressSection onChange={setShippingAddress} value={shippingAddress} />
      <TaxInvoiceAddressSection
        onChange={setTaxAddress}
        onSameAsShippingChange={setTaxSameAsShipping}
        sameAsShipping={taxSameAsShipping}
        value={taxAddress}
      />

      <div className="sticky bottom-0 -mx-4 mt-2 border-t border-[var(--color-border)] bg-[var(--color-bg)]/95 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur">
        <button
          className="primary-action min-h-[var(--spacing-tap)] w-full rounded-[var(--radius-btn)] bg-[var(--color-action)] text-[length:var(--text-label)] font-bold text-[var(--color-surface)] active:bg-[var(--color-action-active)]"
          type="submit"
        >
          บันทึกข้อมูล
        </button>
      </div>
    </form>
  )
}
