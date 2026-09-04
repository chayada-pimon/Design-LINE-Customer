import { Lock } from "lucide-react"

import { OCCUPATIONS, THAI_MONTHS } from "@/lib/thai-provinces"
import {
  fieldInputClass,
  fieldLockedClass,
  FormField,
  Select,
} from "@/components/profile/form-field"
import { SectionCard } from "@/components/profile/section-card"

const currentBuddhistYear = new Date().getFullYear() + 543
const BIRTH_YEARS = Array.from({ length: 100 }, (_, index) => currentBuddhistYear - index)
const BIRTH_DAYS = Array.from({ length: 31 }, (_, index) => index + 1)

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

export type PersonalInfoData = {
  fullName: string
  taxId: string
  nickname: string
  birthDay: string
  birthMonth: string
  birthYear: string
  mobilePhone: string
  phone: string
  email: string
  occupation: string
  occupationOther: string
}

type PersonalInfoSectionProps = {
  value: PersonalInfoData
  onChange: (value: PersonalInfoData) => void
}

function LockedBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-border)] px-2.5 py-1 text-[length:var(--text-h2)] font-normal text-[var(--color-text-muted)]">
      <Lock className="size-3" />
      แก้ไขไม่ได้
    </span>
  )
}

export function PersonalInfoSection({ value, onChange }: PersonalInfoSectionProps) {
  function set<K extends keyof PersonalInfoData>(key: K, fieldValue: PersonalInfoData[K]) {
    onChange({ ...value, [key]: fieldValue })
  }

  return (
    <SectionCard step={1} title="ข้อมูลส่วนตัว">
      <FormField
        hint="หากต้องการเปลี่ยนชื่อ กรุณาติดต่อทีมงาน"
        label={
          <span className="inline-flex items-center gap-2">
            ชื่อ-นามสกุล/บริษัท
            <LockedBadge />
          </span>
        }
      >
        <span className={fieldLockedClass}>{value.fullName}</span>
      </FormField>

      <FormField htmlFor="nickname" label="ชื่อเล่น">
        <input
          autoComplete="nickname"
          className={fieldInputClass}
          id="nickname"
          onChange={(event) => set("nickname", event.target.value)}
          placeholder="เช่น สมชาย"
          type="text"
          value={value.nickname}
        />
      </FormField>

      <FormField label="วัน/เดือน/ปีเกิด">
        <div className="grid grid-cols-[0.85fr_1.3fr_1fr] gap-2 max-[360px]:gap-1.5">
          <div className="min-w-0">
            <Select
              aria-label="วันเกิด"
              onChange={(event) => set("birthDay", event.target.value)}
              value={value.birthDay}
            >
              <option value="">วัน</option>
              {BIRTH_DAYS.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </Select>
          </div>

          <div className="min-w-0">
            <Select
              aria-label="เดือนเกิด"
              onChange={(event) => set("birthMonth", event.target.value)}
              value={value.birthMonth}
            >
              <option value="">เดือน</option>
              {THAI_MONTHS.map((month, index) => (
                <option key={month} value={index + 1}>
                  {month}
                </option>
              ))}
            </Select>
          </div>

          <div className="min-w-0">
            <Select
              aria-label="ปีเกิด"
              onChange={(event) => set("birthYear", event.target.value)}
              value={value.birthYear}
            >
              <option value="">ปี พ.ศ.</option>
              {BIRTH_YEARS.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </Select>
          </div>
        </div>
      </FormField>

      <FormField htmlFor="mobile-phone" label="เบอร์มือถือ">
        <input
          autoComplete="tel-national"
          className={fieldInputClass}
          id="mobile-phone"
          inputMode="numeric"
          maxLength={10}
          onChange={(event) => set("mobilePhone", event.target.value.replace(/\D/g, ""))}
          placeholder="0891234567"
          type="tel"
          value={value.mobilePhone}
        />
      </FormField>

      <FormField htmlFor="phone" label="เบอร์โทรศัพท์">
        <input
          autoComplete="tel"
          className={fieldInputClass}
          id="phone"
          inputMode="numeric"
          maxLength={10}
          onChange={(event) => set("phone", event.target.value.replace(/\D/g, ""))}
          placeholder="021234567"
          type="tel"
          value={value.phone}
        />
      </FormField>

      <FormField htmlFor="email" label="อีเมล" required>
        <input
          autoComplete="email"
          className={fieldInputClass}
          id="email"
          onChange={(event) => set("email", event.target.value)}
          placeholder="example@email.com"
          required
          type="email"
          value={value.email}
        />
      </FormField>

      <FormField htmlFor="occupation" label="อาชีพ">
        <Select
          id="occupation"
          onChange={(event) => set("occupation", event.target.value)}
          value={value.occupation}
        >
          <option value="">เลือกอาชีพ</option>
          {OCCUPATIONS.map((occupation) => (
            <option key={occupation} value={occupation}>
              {occupation}
            </option>
          ))}
        </Select>
      </FormField>

      {value.occupation === "อื่นๆ" ? (
        <FormField htmlFor="occupation-other" label="ระบุอาชีพ" required>
          <input
            className={fieldInputClass}
            id="occupation-other"
            onChange={(event) => set("occupationOther", event.target.value)}
            required
            type="text"
            value={value.occupationOther}
          />
        </FormField>
      ) : null}

      <FormField
        label={
          <span className="inline-flex items-center gap-2">
            เลขประจำตัวผู้เสียภาษี
            <LockedBadge />
          </span>
        }
      >
        <span className={fieldLockedClass}>{formatTaxId(value.taxId)}</span>
      </FormField>
    </SectionCard>
  )
}
