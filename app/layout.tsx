import type { Viewport } from "next"
import { Noto_Sans_Thai } from "next/font/google"
import Script from "next/script"

import "./globals.css"

// TODO: swap back to the local LINESeedSansTH font once the .woff2 files
// are added to public/fonts/ (see public/fonts/PLACE_FONT_FILES_HERE.txt)
const fontThai = Noto_Sans_Thai({
  variable: "--font-thai",
  subsets: ["thai", "latin"],
  weight: ["100", "400", "700", "800"],
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="th"
      suppressHydrationWarning
      className={`${fontThai.variable} font-sans antialiased`}
    >
      <body>
        {process.env.NODE_ENV === "development" && (
          <Script
            src="//unpkg.com/react-grab/dist/index.global.js"
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
        {children}
      </body>
    </html>
  )
}
