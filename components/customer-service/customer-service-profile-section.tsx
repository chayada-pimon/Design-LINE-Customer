"use client"

import { ChevronDown } from "lucide-react"
import { useState } from "react"

const employee = {
  initials: "YP",
  name: "โยธากานต์ พานภูมิ",
}

const profileDetails = [
  ["แผนก", "Customer Service"],
  ["รหัสพนักงาน", "189"],
  ["เบอร์ที่ทำงาน", "064 313 2610"],
  ["เบอร์มือถือ", "-"],
  ["อีเมล", "teejayh1z1@gmail.com"],
]

export function CustomerServiceProfileSection() {
  const [isExpanded, setIsExpanded] = useState(false)
  const detailsId = "customer-service-profile-contact-details"

  return (
    <section className="px-4 pt-5">
      <div className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="flex items-center gap-4 p-4">
          <div
            aria-label={`รูปโปรไฟล์ของ ${employee.name}`}
            className="grid size-12 shrink-0 place-items-center rounded-full bg-[var(--color-accent-soft)] text-[length:var(--text-lg)] font-extrabold text-[var(--color-brand-header)]"
            role="img"
          >
            {employee.initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[length:var(--text-lg)] font-extrabold">
              {employee.name}
            </p>
            <p className="mt-1 inline-flex rounded-[var(--radius-btn)] bg-[var(--color-accent-soft)] px-2 py-1 text-[length:var(--text-caption)] font-bold">
              Customer Service
            </p>
          </div>
          <button
            aria-controls={detailsId}
            aria-expanded={isExpanded}
            aria-label={isExpanded ? "ซ่อนข้อมูลพนักงาน" : "แสดงข้อมูลพนักงาน"}
            className="inline-flex min-h-9 shrink-0 items-center gap-1 rounded-[var(--radius-btn)] px-2 text-[length:var(--text-caption)] font-bold text-[var(--color-action)] outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]"
            onClick={() => setIsExpanded((expanded) => !expanded)}
            type="button"
          >
            <ChevronDown
              aria-hidden="true"
              className={`size-4 transition-transform ${isExpanded ? "rotate-180" : ""}`}
            />
          </button>
        </div>
        <div
          aria-hidden={!isExpanded}
          className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none ${
            isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
          id={detailsId}
          inert={!isExpanded}
        >
          <div className="min-h-0 overflow-hidden">
            <div className="px-4 pb-4">
              <h2 className="mb-3 text-[length:var(--text-h2)] font-bold text-[var(--color-text-muted)]">
                ข้อมูลติดต่อ
              </h2>
              <dl className="divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
                {profileDetails.map(([label, value]) => (
                  <div
                    className="grid grid-cols-[7.75rem_1fr] gap-3 py-3 text-[length:var(--text-label)]"
                    key={label}
                  >
                    <dt className="font-bold">{label}:</dt>
                    <dd className="min-w-0 break-words text-[var(--color-text-muted)]">
                      {label === "อีเมล" ? (
                        <a
                          className="text-[var(--color-action)] underline"
                          href={`mailto:${value}`}
                        >
                          {value}
                        </a>
                      ) : (
                        value
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
