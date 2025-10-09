import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "One - Água super premium",
  description:
    "Água purificada do mar através de nanotecnologia e thalassoterapia. Mais de 63 minerais naturais para sua saúde e bem-estar.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`font-sans`}>
        <Suspense fallback={null}>{children}</Suspense>
      </body>
    </html>
  )
}
