import type { AddressData } from "@/components/profile/address-fields"
import type { PersonalInfoData } from "@/components/profile/personal-info-section"

export type StoredProfile = {
  personalInfo: PersonalInfoData
  shippingAddress: AddressData
  taxAddress: AddressData
  taxSameAsShipping: boolean
}

const STORAGE_KEY = "profile-edit-data"

export function loadProfile(): StoredProfile | null {
  if (typeof window === "undefined") return null

  const raw = window.sessionStorage.getItem(STORAGE_KEY)
  if (!raw) return null

  try {
    return JSON.parse(raw) as StoredProfile
  } catch {
    return null
  }
}

export function saveProfile(data: StoredProfile) {
  window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}
