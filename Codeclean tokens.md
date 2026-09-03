/* ============================================================
   CodeClean — Design Tokens
   สำหรับ CodeClean Employee LINE LIFF (CODECLEAN-1650)

   ✅ ค่าจริง — คัดลอกตรงจาก app/globals.css (source of truth)
   ยึดไฟล์นี้เป็นหลักแทนการวัด computed style เพราะ globals.css
   คือ token ที่ build จริงใช้งานอยู่

   ⚠️ โปรเจกต์นี้ใช้ Tailwind v4 → palette มาพร้อมอยู่แล้วในรูป oklch
      **ห้ามประกาศ scale สีเองซ้ำ** ใช้ของ Tailwind (--color-slate-100,
      --color-blue-700, …) แล้วสร้างแค่ชั้น semantic ทับ
   ============================================================ */

@import "tailwindcss";

:root {
  /* ---------- FONT ----------
     ✅ ตัวแปรจริงชื่อ --font-thai (ไม่ใช่ --font-sans/--font-lineseed)
     ประกาศใน app/layout.tsx: variable: "--font-thai"
     ใช้งานใน body: font-family: var(--font-thai), ui-sans-serif, system-ui, sans-serif
     ห้ามเขียน @font-face ซ้ำ หรืออ้างชื่อ --font-lineseed/--font-sans ที่ไม่มีจริง
  */

  color-scheme: light;

  /* ---------- SEMANTIC COLOR ---------- */

  --color-bg:             #E2E8F0;                 /* hardcode ตรงๆ ไม่ได้ผูก var(--color-slate-100) — เท่ากับค่า slate-200 เดียวกับ border */
  --color-surface:        var(--color-white);
  --color-surface-sunken: var(--color-slate-50);
  --color-border:         var(--color-slate-200);
  --color-border-strong:  var(--color-slate-300);
  --color-text:           var(--color-slate-800);
  --color-text-muted:     var(--color-slate-700);  /* ไม่ใช่ slate-500 */
  --color-text-subtle:    var(--color-slate-400);
  --color-focus:          var(--color-blue-700);

  /* แบรนด์ — ไม่มี --color-brand / --color-accent แยกแล้ว มีแค่ 2 ตัวนี้ที่ใช้จริงทั่วโค้ดเบส */
  --color-brand-header:   var(--color-blue-700);
  --color-accent-soft:    var(--color-yellow-100);

  /* Action — ปุ่มพื้นทึบ + ตัวหนังสือขาว */
  --color-action:         var(--color-blue-700);   /* ไม่ใช่ blue-600 */
  --color-action-active:  var(--color-blue-800);
  /* ไม่มี --color-action-hover ใน globals.css */

  /* Status */
  --color-success:        var(--color-green-700);
  --color-success-soft:   var(--color-green-100);
  --color-danger:         var(--color-red-700);
  --color-danger-soft:    var(--color-red-100);
  --color-warning:        var(--color-orange-800);  /* ไม่ใช่ amber-600 */
  --color-warning-soft:   var(--color-orange-100);  /* ไม่ใช่ amber-100 */

  /* Feature — เช็คอิน / เช็คเอาท์ */
  --color-checkin:        var(--color-green-700);
  --color-checkout:       var(--color-red-700);

  /* ---------- TYPOGRAPHY ----------
     ⚠️ LINE Seed มี 4 น้ำหนัก: 100 / 400 / 700 / 800
        ห้ามใช้ 500 หรือ 600 — เบราว์เซอร์จะสร้างตัวหนาปลอม ตัวไทยจะเบี้ยว
        ลำดับชั้นสร้างจาก "ขนาด + สี" ไม่ใช่ไล่น้ำหนัก

     สเกลจริงมี 7 ระดับ (เดิมเอกสารระบุ 6 ระดับและตัวเลขต่างไปทั้งหมด) */

  --text-hero:            1.5rem;    /* 24px */
  --text-hero--line-height: 1.3;
  --text-h1:              1.375rem;  /* 22px ชื่อหน้าจอ */
  --text-h1--line-height: 1.4;
  --text-lg:               1.25rem;  /* 20px ปุ่มหลัก / ชื่อพนักงาน */
  --text-lg--line-height:  1.4;
  --text-body:            1.125rem;  /* 18px */
  --text-body--line-height: 1.5;
  --text-base:                1rem; /* 16px ข้อความทั่วไป */
  --text-base--line-height: 1.5;
  --text-label:           0.875rem; /* 14px label ปุ่มเมนู / ค่าของ row */
  --text-label--line-height: 1.4;
  --text-h2:                0.75rem; /* 12px หัวข้อกลุ่ม / label ของ row */
  --text-h2--line-height:   1.4;
  --text-caption:          0.875rem; /* 14px — เท่ากับ --text-label พอดี (ไม่ใช่ 12px ตามที่เคยระบุ) */
  --text-caption--line-height: 1.4;

  /* ---------- RADIUS / SHADOW / SIZE ---------- */
  --radius-card: 0.875rem;
  --radius-btn:  0.75rem;
  --shadow-card: 0 1px 2px rgb(29 41 61 / 0.06);
  --spacing-tap: 2.75rem;   /* 44px touch target ขั้นต่ำ */
}


/* ============================================================
   BASE
   ============================================================ */

* {
  -webkit-tap-highlight-color: transparent;
}

html {
  -webkit-text-size-adjust: 100%;
}

body {
  margin: 0;
  background: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-thai), ui-sans-serif, system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
}

/* ตัวเลข (เวลา รหัสพนักงาน เบอร์โทร วันที่) เรียงตรงคอลัมน์ */
time, [data-numeric] {
  font-variant-numeric: tabular-nums;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}


/* ============================================================
   กฎการใช้สี — ตรวจแล้วกับ WCAG AA (4.5:1 ข้อความ / 3:1 UI)
   ------------------------------------------------------------
   ✅ slate-800 บน slate-100  = 13.34:1
   ✅ slate-800 บน white      = 14.62:1

   ❌ ขาว บน blue-500   → ไม่ผ่าน ใช้ blue-600 ขึ้นไป (จริงใช้ blue-700)
   ❌ ขาว บน yellow-500 → ไม่ผ่านชัดเจน ใช้ slate-800 บนเหลืองเสมอ
   ❌ ขาว บน green-500  → ไม่ผ่าน ใช้ green-700
   ❌ ขาว บน red-500    → ไม่ผ่าน ใช้ red-700

   หมายเหตุ: Tailwind v4 ใช้ oklch ค่า hex ต่างจาก v3 เล็กน้อย
   ============================================================ */


/* ============================================================
   ที่แก้ไปจากเอกสารเดิม (2026-09-03)
   ------------------------------------------------------------
   - อัปเดตให้ตรงกับ app/globals.css ทั้งหมด (ยึดเป็น source of truth)
   - เอา --color-brand, --color-accent, --color-action-hover ออก
     (ไม่มีจริงใน globals.css และไม่มีที่ไหนในโค้ดเบสอ้างถึง)
   - แก้ชื่อฟอนต์เป็น --font-thai ตามของจริงใน app/layout.tsx
   - อัปเดตสเกล typography ทั้งชุดตามค่าจริง (มี --text-hero/--text-body เพิ่ม)
   - ที่ COMPONENTS.md อ้างถึง --color-brand-header-bg และ
     --color-text-on-yellow ก็ไม่มีจริงใน globals.css เช่นกัน — ต้องตรวจสอบแยก
   ============================================================ */
