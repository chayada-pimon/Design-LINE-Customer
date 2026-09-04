import type { Viewport } from "next"
import localFont from "next/font/local"
import Script from "next/script"

import "./globals.css"

const fontThai = localFont({
  variable: "--font-thai",
  src: [
    {
      path: "../public/fonts/LINESeedSansTH_W_Th.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../public/fonts/LINESeedSansTH_W_Rg.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/LINESeedSansTH_W_Bd.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/LINESeedSansTH_W_XBd.woff2",
      weight: "800",
      style: "normal",
    },
  ],
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
        <div className="app-frame">{children}</div>
      </body>
    </html>
  )
}
