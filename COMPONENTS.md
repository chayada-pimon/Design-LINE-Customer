# Component Catalog — CodeClean Employee (LINE LIFF)

> **อ่านคู่กับ:** `codeclean-tokens.css` (สี/spacing/radius) · `AGENTS.md` (โครงสร้าง/คำสั่ง) · `docs/design/CODECLEAN-1650-design.md` (brief, menu matrix, ปัญหา P1–P10)

> ⚠️ **สถานะไฟล์นี้ = SPEC ไม่ใช่ CATALOG**
> โปรเจกต์ยังไม่มีโค้ดจริง ไฟล์นี้คือ **ข้อตกลงว่าจะสร้าง component อะไรบ้าง** เมื่อเขียนจริงแล้วให้กลับมาแก้ไฟล์นี้ให้ตรงกับของที่มี แล้วลบกล่องนี้ทิ้ง
> **สมมติฐาน tech stack:** React + TypeScript + Tailwind + lucide-react — **ยังไม่ยืนยันกับพี่ทิว** ถ้าของจริงเป็น Odoo QWeb template ต้องแปลง component เหล่านี้เป็น template + CSS class แทน โครงสร้างและกฎยังใช้ได้เหมือนเดิม

การนำเข้าใช้ alias `@/` เสมอ เช่น `import { MenuCard } from "@/components/ui/menu-card"`

---

## 0. กฎ 6 ข้อก่อนเขียน component ใหม่

1. **ประกอบก่อนเขียน** — ทุกกลุ่มเมนูห่อด้วย `<Section>`, หัวข้อกลุ่มใช้ `<SectionHeader>`, ปุ่มเมนูใช้ `<MenuCard>` ไม่ทำ markup พวกนี้เอง
2. **Token เท่านั้น** — สี/ระยะ/รัศมี ทุกจุดผ่านตัวแปรใน `codeclean-tokens.css` (`var(--color-action)`, `bg-brand`, …) **ห้าม HEX ในไฟล์ component**
3. **Icon = lucide-react เท่านั้น** — ห้ามเพิ่ม icon library ตัวที่สอง และ **ทุกไอคอนต้องมี label ข้อความกำกับ** (ผู้ใช้หน้างานหลายคนไม่คุ้นไอคอน)
4. **Mobile-only mindset** — ออกแบบที่ 320–430px เท่านั้น ไม่มี desktop breakpoint · touch target ≥ 44px (`--tap-min`) · ห้ามใช้ hover เป็นช่องทางเดียวในการสื่อสาร
5. **ไม่มี animation library** — งานนี้เป็น utility app ใช้ CSS transition สั้น ๆ (≤200ms) พอ ทุก transition ต้องมี `@media (prefers-reduced-motion: reduce)` fallback
6. **สิทธิ์เมนูอยู่ที่เดียว** — logic ว่าใครเห็นเมนูอะไร อยู่ใน `lib/menu-config.ts` เท่านั้น **ห้ามเขียน `if (role === …)` กระจายใน component** (ดู §6)

---

## 1. Layout primitives (`components/ui/`)

### `<AppShell>` — เปลือกของทุกหน้าจอ
`components/ui/app-shell.tsx`

รวม `<AppHeader>` + `<main>` + `<MenuDrawer>` เข้าด้วยกัน จัด `min-height` ให้เต็ม viewport ของ LIFF และกัน safe-area ล่างของ iPhone **ทุกหน้าจอเริ่มจากตัวนี้**

```tsx
import { AppShell } from "@/components/ui/app-shell"

<AppShell title="โปรไฟล์พนักงาน">
  {/* เนื้อหาหน้าจอ */}
</AppShell>
```
Props: `title` (ข้อความบนแถบเหลือง), `showDrawer?` (default `true`), `children`

### `<AppHeader>` — แถบน้ำเงินบนสุด
`components/ui/app-header.tsx`

โลโก้ CodeClean กลาง + ปุ่มแฮมเบอร์เกอร์ขวา พื้น `--color-brand-header-bg` ปุ่มแฮมเบอร์เกอร์ต้องมี `aria-label="เปิดเมนู"` และ `aria-expanded`

### `<Section>` — กลุ่มเนื้อหา
`components/ui/section.tsx`

จัด padding แนวนอน 16px + ระยะห่างระหว่างกลุ่ม ผูก `id` ↔ `aria-labelledby` อัตโนมัติ

```tsx
<Section id="my-work">
  <SectionHeader id="my-work">งานของฉัน</SectionHeader>
  <MenuGrid items={…} />
</Section>
```
Props: `id`, `labelledBy?` (default `${id}-heading`), `className?`, `children`

### `<SectionHeader>` — หัวข้อกลุ่มเมนู
`components/ui/section-header.tsx`

render `<h2 id="${id}-heading">` ขนาดเล็ก ตัวหนา สี `--color-text-muted` ใช้กับ 3 กลุ่ม: Quick Action / งานของฉัน / ทั่วไป

> **h1 vs h2:** `<AppShell title>` เป็น `<h1>` ตัวเดียวของหน้า — `<SectionHeader>` เป็น `<h2>` เสมอ ห้ามใช้เป็นหัวบนสุด

---

## 2. Menu components — หัวใจของ CODECLEAN-1650

### `<MenuGrid>` — ตารางปุ่มเมนู
`components/ui/menu-grid.tsx`

grid 2 คอลัมน์ ปุ่มสูงเท่ากันทุกใบ **แก้ปัญหา P2/P5** (layout ผสม 1-col/2-col และปุ่มลอยเดี่ยว) ถ้าจำนวนเมนูเป็นเลขคี่ ใบสุดท้าย `span 2` อัตโนมัติ

```tsx
import { MenuGrid } from "@/components/ui/menu-grid"

<MenuGrid items={visibleMenus} />
```
Props: `items: MenuItem[]`, `columns?: 2 | 3` (default `2`)

### `<MenuCard>` — ปุ่มเมนู 1 ใบ
`components/ui/menu-card.tsx`

ไอคอน + label ภาษาไทย + badge (optional) **จัดวางแบบเดียวกันทุกใบ** — ไอคอนบน / label ล่าง / จัดกึ่งกลาง **แก้ปัญหา P3** (alignment ไม่สม่ำเสมอ)

```tsx
<MenuCard
  icon={Users}                 {/* lucide component ไม่ใช่ JSX */}
  label="รายชื่อพนักงาน"
  href="/employees"
  badge={3}                    {/* optional — จำนวนงานค้าง */}
/>
```
Props: `icon`, `label`, `href` \| `onClick`, `badge?`, `variant?: "default" | "success" | "danger"`, `disabled?`
States ที่ต้องมี: `default` · `active` (กดค้าง) · `focus-visible` (`--focus-ring`) · `disabled`

> Label ต้องรองรับข้อความ 2 บรรทัดโดยปุ่มไม่เสียรูป (เช่น "สลิปเงินเดือนของฉัน")

### `<QuickActionCard>` — เช็คอิน/เช็คเอาท์
`components/ui/quick-action-card.tsx` · client

ปุ่มใหญ่บนสุดของหน้า **แสดงปุ่มเดียวตามสถานะจริง** — ยังไม่เช็คอิน → "เช็คอินเข้างาน" (พื้น `--color-checkin-bg`) · เช็คอินแล้ว → "เช็คเอาท์ออกงาน" (พื้น `--color-checkout-bg`) พร้อมบรรทัดรองบอกเวลาเช็คอินล่าสุด **แก้ปัญหา P4/P6**

```tsx
<QuickActionCard
  status="checked-in"          {/* "checked-out" | "checked-in" | "done" */}
  lastCheckIn="08:12"
  onAction={handleAttendance}
  loading={isSubmitting}
/>
```
Props: `status`, `lastCheckIn?`, `onAction`, `loading?`

> ⚠️ **ยังต้องยืนยันกับพี่เอ้** (open question #4) ว่าต้องการปุ่มเดียวสลับตามสถานะ หรือแสดง 2 ปุ่มตลอดเวลาแบบ UI เดิม
> ⚠️ **ห้ามใช้สีอย่างเดียวบอกสถานะ** — ต้องมีทั้งข้อความและไอคอนเปลี่ยนด้วย

### `<MenuDrawer>` — แฮมเบอร์เกอร์
`components/ui/menu-drawer.tsx` · client

Sheet เลื่อนจากขวา ปิดด้วย overlay / ปุ่มปิด / Esc · focus trap ตอนเปิด · คืน focus ให้ปุ่มแฮมเบอร์เกอร์ตอนปิด

> ⚠️ เนื้อหาใน drawer ขึ้นกับว่าเลือก **Option A** (เหลือแค่โปรไฟล์ + ออกจากระบบ) หรือ **Option B** (ย้ายเมนูที่ใช้น้อยเข้ามา) — ยังรอตัดสินใจ

---

## 3. Profile components

### `<ProfileCard>` — การ์ดโปรไฟล์ย่อ
`components/ui/profile-card.tsx`

แนวนอน: รูป 48px + ชื่อ + badge ตำแหน่ง/แผนก + ปุ่ม "ดูข้อมูลเพิ่มเติม" **แก้ปัญหา P4** (ของเดิมกินพื้นที่เต็มจอแรกจนเมนูตกใต้ fold)

Props: `name`, `avatarUrl?`, `position`, `department`, `onExpand?`
- ไม่มีรูป → fallback เป็นอักษรย่อบนพื้น `--color-accent-soft` ไม่ใช่ไอคอน generic
- Badge ตำแหน่งใช้ `--color-accent` + ข้อความ `--color-text-on-yellow` (**ห้ามตัวหนังสือขาวบนเหลือง** — contrast 1.86:1)

### `<ProfileDetailList>` — รายละเอียดพนักงาน
`components/ui/profile-detail-list.tsx`

รายการ label/value: แผนก · รหัสพนักงาน · เบอร์ที่ทำงาน · เบอร์มือถือ · อีเมล
- ค่าว่างแสดง `—` ไม่ใช่ค่าว่างเปล่า
- เบอร์โทร/อีเมลเป็นลิงก์ `tel:` / `mailto:` กดโทรได้เลย
- **ไม่แสดง "รหัสไลน์"** บนหน้าแรก (**แก้ปัญหา P8** — ข้อมูล technical ที่ผู้ใช้ไม่ได้ใช้ และถูกตัดข้อความอยู่แล้ว) *รอยืนยัน open question #8*

---

## 4. Feedback & state components

**ทุกหน้าจอที่ดึงข้อมูลต้องมีครบ 4 สถานะ** ห้ามออกแบบเฉพาะ happy path

| Component | ไฟล์ | ใช้เมื่อ |
|---|---|---|
| `<MenuGridSkeleton>` | `skeleton.tsx` | กำลังโหลดโปรไฟล์/เมนู — โครงเทา ๆ ขนาดเท่าปุ่มจริง ไม่ใช่ spinner กลางจอ |
| `<ErrorState>` | `error-state.tsx` | โหลดโปรไฟล์ไม่สำเร็จ — บอกว่าเกิดอะไรขึ้น + ปุ่ม "ลองใหม่" ไม่ใช่แค่ "เกิดข้อผิดพลาด" |
| `<EmptyState>` | `empty-state.tsx` | กลุ่มเมนูว่าง — ใช้เมื่อจำเป็นเท่านั้น (ปกติซ่อนทั้ง section แทน) |
| `<NoPermissionState>` | `no-permission-state.tsx` | ไม่พบตำแหน่งงานในระบบ — แสดงเมนู Common + ข้อความบอกให้ติดต่อ HR |
| `<Toast>` | `toast.tsx` | ผลลัพธ์เช็คอิน/เช็คเอาท์ สำเร็จหรือล้มเหลว |

**กฎ empty/error copy:** บอกว่าเกิดอะไรและทำอะไรต่อได้ ด้วยน้ำเสียงระบบ ไม่ต้องขอโทษ
- ❌ "ขออภัย เกิดข้อผิดพลาด"
- ✅ "โหลดข้อมูลพนักงานไม่สำเร็จ ตรวจสอบสัญญาณอินเทอร์เน็ตแล้วลองอีกครั้ง"

---

## 5. Base primitives (`components/ui/`)

| Component | ไฟล์ | หมายเหตุ |
|---|---|---|
| `<Button>` | `button.tsx` | variants: `primary` (พื้น `--color-action`) · `secondary` (ขาว/ขอบน้ำเงิน) · `ghost` · `danger` — sizes: `sm` \| `md` \| `lg` (`lg` = 48px สำหรับ Quick Action) |
| `<IconButton>` | `icon-button.tsx` | ปุ่มไอคอนล้วน **บังคับ `aria-label`** |
| `<Badge>` | `badge.tsx` | นับจำนวนงานค้าง / แสดงตำแหน่ง — variants: `accent` \| `neutral` \| `danger` |
| `<Card>` | `card.tsx` | กล่องพื้นขาว ขอบ `--color-border` radius `--radius-lg` |
| `<Avatar>` | `avatar.tsx` | รูปกลม + fallback อักษรย่อ |
| `<Sheet>` | `sheet.tsx` | bottom/side sheet ใช้โดย `<MenuDrawer>` |

**ทุก interactive component ต้องมีครบ:** `default` · `active` · `focus-visible` · `disabled` (+`loading` ถ้ามี async)

---

## 6. Menu configuration — single source of truth

`lib/menu-config.ts` · **ที่เดียวที่รู้ว่าใครเห็นเมนูอะไร**

```ts
export type MenuGroup = "quick" | "my-work" | "general"

export interface MenuItem {
  id: string
  label: string          // ภาษาไทยเสมอ
  icon: LucideIcon
  href: string
  group: MenuGroup
  roles: string[] | "all"   // "all" = เมนู Common ทั้ง 7 รายการ
}
```

การกรองทำผ่านฟังก์ชันเดียว:

```ts
getVisibleMenus(userRoles: string[]): MenuItem[]
```

**กฎ:**
- ผู้ใช้ 1 คนมีได้หลายตำแหน่ง → เมนูรวมกันแบบ **union** *(รอยืนยัน open question #2)*
- ไม่มีตำแหน่ง / ตำแหน่งไม่ตรงเงื่อนไข → เห็นเฉพาะเมนู `roles: "all"`
- ถ้ากลุ่ม `my-work` ว่าง → **ซ่อนทั้ง section** ไม่แสดงหัวข้อลอย
- เพิ่มเมนูใหม่ = แก้ไฟล์นี้ไฟล์เดียว ไม่ต้องแตะ component

> 🔴 **บล็อกอยู่:** ยังไม่รู้ว่ากรองจาก field **"แผนก"** หรือ **"ตำแหน่งงาน"** (open question #7) — ในระบบมีทั้งสอง field และในตัวอย่างจริงไม่ตรงกัน (แผนก = Customer Service / ตำแหน่ง = Director of Financial Reporting) **ต้องได้คำตอบก่อนเขียน `menu-config.ts` จริง**

---

## 7. Anti-patterns (เจอแล้วแก้)

- ❌ `className="bg-[#3B82F6]"` → ✅ `bg-brand` / `var(--color-brand)`
- ❌ ตัวหนังสือขาวบนพื้น `yellow-500` / `blue-500` / `green-500` / `red-500` → ✅ ใช้ step 600–700 หรือเปลี่ยนเป็นตัวหนังสือเข้ม (ดูตาราง contrast ท้าย `codeclean-tokens.css`)
- ❌ เขียน `<div className="grid grid-cols-2 gap-3">` เอง → ✅ ใช้ `<MenuGrid>`
- ❌ ปุ่มเมนูบางใบไอคอนซ้าย บางใบไอคอนบน → ✅ ใช้ `<MenuCard>` ทุกใบ (P3)
- ❌ `{role === "technician" && <MenuCard … />}` กระจายใน JSX → ✅ `getVisibleMenus()` จาก `menu-config.ts`
- ❌ ไอคอนล้วนไม่มี label → ✅ มีข้อความกำกับเสมอ หรือ `aria-label` ถ้าเป็น icon-only
- ❌ แสดงปุ่มเช็คอิน + เช็คเอาท์พร้อมกันตลอด → ✅ `<QuickActionCard>` สลับตามสถานะ (P6)
- ❌ บอกสถานะด้วยสีอย่างเดียว → ✅ สี + ข้อความ + ไอคอน
- ❌ spinner กลางจอตอนโหลด → ✅ `<MenuGridSkeleton>` ที่มีรูปทรงเท่าของจริง
- ❌ ปุ่มสูงน้อยกว่า 44px → ✅ `min-height: var(--tap-min)`
- ❌ เพิ่ม animation library → ✅ CSS transition + `prefers-reduced-motion`
- ❌ แสดง LINE UID บนหน้าแรก → ✅ ซ่อน (P8)

---

## 8. ยังไม่ตัดสินใจ / รอคำตอบ

| # | เรื่อง | บล็อก component ไหน | ถามใคร |
|---|--------|---------------------|--------|
| 1 | กรองจาก "แผนก" หรือ "ตำแหน่งงาน" | `menu-config.ts` | พี่เอ้ / พี่ทิว |
| 2 | Option A หรือ B (ย้ายเมนูเข้าแฮมเบอร์เกอร์) | `<MenuDrawer>` | พี่เอ้ |
| 3 | ปุ่มเช็คอิน 1 ปุ่มสลับ หรือ 2 ปุ่มตลอด | `<QuickActionCard>` | พี่เอ้ / พี่ทิว |
| 4 | "งานช่าง / Logistics" 1 เมนูหรือ 2 | `menu-config.ts` | พี่เอ้ |
| 5 | "แจ้งปัญหา" = "Customer Service" หรือคนละตัว | `menu-config.ts` | พี่เอ้ |
| 6 | ซ่อน "รหัสไลน์" ได้ไหม | `<ProfileDetailList>` | พี่ทิว |
| 7 | Tech stack จริง (React หรือ Odoo QWeb) | ทั้งไฟล์นี้ | พี่ทิว |
