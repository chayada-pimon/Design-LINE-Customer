import { chromium } from "playwright"

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 390, height: 844 } })
await page.goto("http://localhost:3000", { waitUntil: "networkidle" })

const name = await page.locator("text=โยธากานต์").first()
const codeBtn = await page.locator('button:has-text("รหัส")').first()

const nameSize = await name.evaluate((el) => getComputedStyle(el).fontSize)
const codeSize = await codeBtn.evaluate((el) => getComputedStyle(el).fontSize)
const nameBox = await name.boundingBox()
const codeBox = await codeBtn.boundingBox()

console.log("name fontSize:", nameSize, nameBox)
console.log("code fontSize:", codeSize, codeBox)

await page.screenshot({ path: "profile-card.png", clip: { x: 0, y: 0, width: 390, height: 400 } })
await browser.close()
