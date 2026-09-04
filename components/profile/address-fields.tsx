import { useEffect, useMemo, useRef } from "react"
import { THAI_PROVINCES } from "@/lib/thai-provinces"
import {
  findDistrictsByProvince,
  findPostalCode,
  findSubdistrictsByDistrict,
} from "@/lib/thai-address-lookup"
import { fieldInputClass, fieldLockedClass, FormField } from "@/components/profile/form-field"
import { SearchSelect, type SearchSelectHandle } from "@/components/ui/search-select"

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

  const districtSelectRef = useRef<SearchSelectHandle>(null)
  const subdistrictSelectRef = useRef<SearchSelectHandle>(null)
  const addressTextareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const textarea = addressTextareaRef.current
    if (!textarea) return
    textarea.style.height = "auto"
    textarea.style.height = `${textarea.scrollHeight}px`
  }, [value.address])

  const districts = useMemo(() => findDistrictsByProvince(value.province), [value.province])
  const subdistrictMatches = useMemo(
    () => findSubdistrictsByDistrict(value.province, value.district),
    [value.province, value.district],
  )

  function handleProvinceChange(province: string) {
    onChange({ ...value, province, district: "", subdistrict: "", postalCode: "" })
  }

  function handleDistrictChange(district: string) {
    onChange({ ...value, district, subdistrict: "", postalCode: "" })
  }

  function handleSubdistrictChange(subdistrict: string) {
    const postalCode = findPostalCode(value.province, value.district, subdistrict)
    onChange({ ...value, subdistrict, postalCode })
  }

  return (
    <div className="flex flex-col gap-4">
      <FormField htmlFor={`${idPrefix}-province`} label="จังหวัด">
        <SearchSelect
          id={`${idPrefix}-province`}
          onChange={handleProvinceChange}
          onSelected={() => districtSelectRef.current?.open()}
          options={THAI_PROVINCES}
          placeholder="เลือกจังหวัด"
          searchPlaceholder="ค้นหาจังหวัด"
          value={value.province}
        />
      </FormField>

      <FormField htmlFor={`${idPrefix}-district`} label="อำเภอ/เขต">
        <SearchSelect
          disabled={!value.province}
          id={`${idPrefix}-district`}
          onChange={handleDistrictChange}
          onSelected={() => subdistrictSelectRef.current?.open()}
          options={districts}
          placeholder="เลือกอำเภอ/เขต"
          ref={districtSelectRef}
          searchPlaceholder="ค้นหาอำเภอ/เขต"
          value={value.district}
        />
      </FormField>

      <FormField htmlFor={`${idPrefix}-subdistrict`} label="ตำบล/แขวง">
        <SearchSelect
          disabled={!value.district}
          id={`${idPrefix}-subdistrict`}
          onChange={handleSubdistrictChange}
          options={subdistrictMatches.map((match) => match.subdistrict)}
          placeholder="เลือกตำบล/แขวง"
          ref={subdistrictSelectRef}
          searchPlaceholder="ค้นหาตำบล/แขวง"
          value={value.subdistrict}
        />
      </FormField>

      <FormField htmlFor={`${idPrefix}-postal-code`} label="รหัสไปรษณีย์">
        <span className={fieldLockedClass}>{value.postalCode || "-"}</span>
      </FormField>

      <FormField htmlFor={`${idPrefix}-address`} label="ที่อยู่">
        <textarea
          autoComplete="address-line1"
          className={`${fieldInputClass} min-h-20 resize-none overflow-hidden py-2.5`}
          id={`${idPrefix}-address`}
          onChange={(event) => set("address", event.target.value)}
          placeholder="บ้านเลขที่ หมู่บ้าน ถนน"
          ref={addressTextareaRef}
          value={value.address}
        />
      </FormField>
    </div>
  )
}
