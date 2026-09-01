import { AddressFields, type AddressData } from "@/components/profile/address-fields"
import { SectionCard } from "@/components/profile/section-card"

type TaxInvoiceAddressSectionProps = {
  sameAsShipping: boolean
  onSameAsShippingChange: (sameAsShipping: boolean) => void
  value: AddressData
  onChange: (value: AddressData) => void
}

export function TaxInvoiceAddressSection({
  sameAsShipping,
  onSameAsShippingChange,
  value,
  onChange,
}: TaxInvoiceAddressSectionProps) {
  return (
    <SectionCard
      step={3}
      subtitle="ใช้สำหรับออกใบกำกับภาษีเต็มรูปแบบ"
      title="ที่อยู่สำหรับใบกำกับภาษี"
    >
      <label className="flex cursor-pointer items-center gap-2.5 rounded-[var(--radius-btn)] bg-[var(--color-surface-sunken)] px-3.5 py-3">
        <input
          checked={sameAsShipping}
          className="size-5 shrink-0 rounded border-[var(--color-border-strong)] text-[var(--color-action)] accent-[var(--color-action)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]"
          onChange={(event) => onSameAsShippingChange(event.target.checked)}
          type="checkbox"
        />
        <span className="text-[length:var(--text-label)] font-bold text-[var(--color-text)]">
          ใช้ที่อยู่เดียวกับที่อยู่สำหรับจัดส่งเอกสาร
        </span>
      </label>

      {sameAsShipping ? null : (
        <AddressFields idPrefix="tax-invoice" onChange={onChange} value={value} />
      )}
    </SectionCard>
  )
}
