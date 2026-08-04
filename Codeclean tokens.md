/* ============================================================
   CodeClean — Design Tokens
   สำหรับ CodeClean Employee LINE LIFF (CODECLEAN-1650)

   ✅ ค่าที่ยืนยันแล้ว  — วัดจาก computed style ของ /holidays จริง
   🟡 ค่าที่อนุมาน     — จากรูปแบบที่พบ (Tailwind v4 default palette)
   ❓ ค่าที่ยังไม่รู้    — ต้องวัดเพิ่ม ดูรายการท้ายไฟล์

   ⚠️ โปรเจกต์นี้ใช้ Tailwind v4 → palette มาพร้อมอยู่แล้วในรูป oklch
      **ห้ามประกาศ scale สีเองซ้ำ** ใช้ของ Tailwind (--color-slate-100,
      --color-blue-700, …) แล้วสร้างแค่ชั้น semantic ทับ
   ============================================================ */

@import "tailwindcss";

@theme {
  /* ---------- FONT ----------
     ✅ computed: font-family: lineSeed, "lineSeed Fallback"
     โหลดผ่าน next/font/local ใน layout.tsx — ห้ามเขียน @font-face ซ้ำ

     app/fonts.ts (ของโปรเจกต์ — อ้างอิงเฉย ๆ):
       export const lineSeed = localFont({
         src: [...], variable: "--font-lineseed", display: "swap"
       })
  */
  --font-sans: var(--font-lineseed), ui-sans-serif, system-ui, sans-serif;


  /* ---------- SEMANTIC COLOR ----------
     ✅ 4 ค่าล่างนี้ตรงกับที่ /holidays ใช้จริง                        */

  --color-bg:            var(--color-slate-100);  /* ✅ #F1F5F9 พื้นหน้าจอ */
  --color-surface:       var(--color-white);      /* 🟡 การ์ด/แถวรายการ */
  --color-border:        var(--color-slate-200);  /* ✅ #E2E8F0 */
  --color-text:          var(--color-slate-800);  /* ✅ #1D293D — contrast 13.3:1 บนพื้น bg */
  --color-focus:         var(--color-blue-700);   /* ✅ #1C4ED8 outline */

  /* 🟡 อนุมานจากลำดับ slate ที่ใช้อยู่ */
  --color-text-muted:    var(--color-slate-500);
  --color-text-subtle:   var(--color-slate-400);
  --color-surface-sunken:var(--color-slate-50);
  --color-border-strong: var(--color-slate-300);

  /* ❓ แบรนด์ — ยังไม่ได้วัดจากของจริง (body ไม่มีสีแบรนด์)
     ค่าด้านล่างอิง Color.png ที่ map เป็น Tailwind step
     ต้องวัดจาก header จริงก่อนใช้ผลิต */
  --color-brand:         var(--color-blue-500);
  --color-brand-header:  var(--color-blue-700);
  --color-accent:        var(--color-yellow-500);
  --color-accent-soft:   var(--color-yellow-100);

  /* Action — ปุ่มพื้นทึบ + ตัวหนังสือขาว
     ใช้ blue-600 ขึ้นไปเพื่อให้ผ่าน WCAG AA (blue-500 + ขาว ไม่ผ่าน) */
  --color-action:        var(--color-blue-600);
  --color-action-hover:  var(--color-blue-700);
  --color-action-active: var(--color-blue-800);

  /* Status */
  --color-success:       var(--color-green-700);
  --color-success-soft:  var(--color-green-100);
  --color-danger:        var(--color-red-700);
  --color-danger-soft:   var(--color-red-100);
  --color-warning:       var(--color-amber-600);
  --color-warning-soft:  var(--color-amber-100);

  /* Feature — เช็คอิน / เช็คเอาท์ (คงความหมายเขียว-แดงจาก UI เดิม) */
  --color-checkin:       var(--color-green-700);
  --color-checkout:      var(--color-red-700);


  /* ---------- TYPOGRAPHY ----------
     ✅ body line-height 24px (= text-base/1.5)
     ⚠️ LINE Seed มี 4 น้ำหนัก: 100 / 400 / 700 / 800
        ห้ามใช้ 500 หรือ 600 — เบราว์เซอร์จะสร้างตัวหนาปลอม ตัวไทยจะเบี้ยว
        ลำดับชั้นสร้างจาก "ขนาด + สี" ไม่ใช่ไล่น้ำหนัก */

  --text-h1:           1.25rem;   /* 20px ชื่อหน้าจอ */
  --text-h1--line-height: 1.5;
  --text-h2:           0.8125rem; /* 13px หัวข้อกลุ่ม */
  --text-h2--line-height: 1.5;
  --text-lg:           1.0625rem; /* 17px ปุ่มหลัก / ชื่อพนักงาน */
  --text-lg--line-height: 1.4;
  --text-base:         0.9375rem; /* 15px ข้อความทั่วไป */
  --text-base--line-height: 1.6;
  --text-label:        0.875rem;  /* 14px label ปุ่มเมนู */
  --text-label--line-height: 1.35;
  --text-caption:      0.75rem;   /* 12px เล็กสุด ห้ามต่ำกว่านี้ */
  --text-caption--line-height: 1.5;


  /* ---------- RADIUS / SHADOW / SIZE ---------- */
  --radius-card:  0.875rem;  /* ❓ ต้องวัดจากการ์ดจริงใน /holidays */
  --radius-btn:   0.75rem;
  --shadow-card:  0 1px 2px rgb(29 41 61 / 0.06);

  --spacing-tap:  2.75rem;   /* 44px touch target ขั้นต่ำ */
}


/* ============================================================
   BASE
   ============================================================ */

@layer base {
  html {
    -webkit-text-size-adjust: 100%;   /* ✅ ตรงกับของจริง */
  }

  body {
    background: var(--color-bg);
    color: var(--color-text);
    font-family: var(--font-sans);
    -webkit-font-smoothing: antialiased;   /* ✅ ตรงกับของจริง */
  }

  /* ตัวเลข (เวลา รหัสพนักงาน เบอร์โทร วันที่) เรียงตรงคอลัมน์ */
  time, [data-numeric] {
    font-variant-numeric: tabular-nums;
  }

  :focus-visible {
    outline: 2px solid var(--color-focus);
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }
}


/* ============================================================
   กฎการใช้สี — ตรวจแล้วกับ WCAG AA (4.5:1 ข้อความ / 3:1 UI)
   ------------------------------------------------------------
   ✅ slate-800 บน slate-100  = 13.34:1   (ค่าจริงของ body)
   ✅ slate-800 บน white      = 14.62:1

   ❌ ขาว บน blue-500   → ไม่ผ่าน ใช้ blue-600 ขึ้นไป
   ❌ ขาว บน yellow-500 → ไม่ผ่านชัดเจน ใช้ slate-800 บนเหลืองเสมอ
   ❌ ขาว บน green-500  → ไม่ผ่าน ใช้ green-700
   ❌ ขาว บน red-500    → ไม่ผ่าน ใช้ red-700

   หมายเหตุ: Tailwind v4 ใช้ oklch ค่า hex ต่างจาก v3 เล็กน้อย
   (v4 blue-500 = #2B7FFF ส่วน Color.png เขียน #3B82F6 ซึ่งเป็นค่า v3)
   → ต้องตกลงกับพี่ทิวว่ายึด runtime หรือยึดเอกสาร Color.png
   ============================================================ */


/* ============================================================
   ❓ ยังต้องวัดเพิ่ม — รัน script ท้ายไฟล์ที่หน้า /holidays
   ------------------------------------------------------------
   1. สีพื้น header น้ำเงิน + สีข้อความบน header
   2. สีแถบเหลือง (ถ้ายังมีในเวอร์ชันใหม่)
   3. border-radius + box-shadow ของการ์ดรายการวันหยุด
   4. padding ของ container หลัก และระยะห่างระหว่าง section
   5. font-size / font-weight ของ h1, h2, ชื่อวันหยุด, ตัวเลขวันที่
   ============================================================ */
   