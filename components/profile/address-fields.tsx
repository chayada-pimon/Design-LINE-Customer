import { THAI_PROVINCES } from "@/lib/thai-provinces"
import { fieldInputClass, FormField, Select } from "@/components/profile/form-field"

export type AddressData = {
  address: string
  subdistrict: string
  district: string
  province: string
  postalCode: string
}

export const EMPTY_ADDRESS: AddressData = {
  address: "",
  subdistrict: "",
  district: "",
  province: "",
  postalCode: "",
}

type AddressFieldsProps = {
  idPrefix: string
  value: AddressData
  onChange: (value: AddressData) => void
}

export function AddressFields({ idPrefix, value, onChange }: AddressFieldsProps) {
  function set<K extends keyof AddressData>(key: K, fieldValue: AddressData[K]) {
    onChange({ ...value, [key]: fieldValue })
  }

  return (
    <div className="flex flex-col gap-4">
      <FormField htmlFor={`${idPrefix}-address`} label="ที่อยู่">
        <textarea
          autoComplete="address-line1"
          className={`${fieldInputClass} min-h-20 resize-none py-2.5`}
          id={`${idPrefix}-address`}
          onChange={(event) => set("address", event.target.value)}
          placeholder="บ้านเลขที่ หมู่บ้าน ถนน"
          value={value.address}
        />
      </FormField>

      <div className="grid grid-cols-2 gap-3">
        <FormField htmlFor={`${idPrefix}-subdistrict`} label="ตำบล/แขวง">
          <input
            autoComplete="address-level4"
            className={fieldInputClass}
            id={`${idPrefix}-subdistrict`}
            onChange={(event) => set("subdistrict", event.target.value)}
            placeholder="เช่น สุเทพ"
            type="text"
            value={value.subdistrict}
          />
        </FormField>

        <FormField htmlFor={`${idPrefix}-district`} label="อำเภอ/เขต">
          <input
            autoComplete="address-level3"
            className={fieldInputClass}
            id={`${idPrefix}-district`}
            onChange={(event) => set("district", event.target.value)}
            placeholder="เช่น เมืองเชียงใหม่"
            type="text"
            value={value.district}
          />
        </FormField>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <FormField htmlFor={`${idPrefix}-province`} label="จังหวัด">
          <Select
            autoComplete="address-level1"
            id={`${idPrefix}-province`}
            onChange={(event) => set("province", event.target.value)}
            value={value.province}
          >
            <option value="">เลือกจังหวัด</option>
            {THAI_PROVINCES.map((province) => (
              <option key={province} value={province}>
                {province}
              </option>
            ))}
          </Select>
        </FormField>

        <FormField htmlFor={`${idPrefix}-postal-code`} label="รหัสไปรษณีย์">
          <input
            autoComplete="postal-code"
            className={fieldInputClass}
            id={`${idPrefix}-postal-code`}
            inputMode="numeric"
            maxLength={5}
            onChange={(event) => set("postalCode", event.target.value.replace(/\D/g, ""))}
            placeholder="ตัวเลข 5 หลัก"
            type="text"
            value={value.postalCode}
          />
        </FormField>
      </div>
    </div>
  )
}
