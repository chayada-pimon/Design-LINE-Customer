import { AddressFields, type AddressData } from "@/components/profile/address-fields"
import { SectionCard } from "@/components/profile/section-card"

type ShippingAddressSectionProps = {
  value: AddressData
  onChange: (value: AddressData) => void
}

export function ShippingAddressSection({ value, onChange }: ShippingAddressSectionProps) {
  return (
    <SectionCard
      step={2}
      subtitle="ใช้สำหรับจัดส่งเอกสารและพัสดุถึงคุณ"
      title="ที่อยู่สำหรับจัดส่งเอกสาร"
    >
      <AddressFields idPrefix="shipping" onChange={onChange} value={value} />
    </SectionCard>
  )
}
