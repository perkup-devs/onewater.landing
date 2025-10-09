import "./globals.css"
import { Suspense } from "react"

export const metadata = {
  title: "ONE Water - Água super premium",
  description:
    "Água purificada do mar através de nanotecnologia e thalassoterapia. Mais de 63 minerais naturais para sua saúde e bem-estar.",
  manifest: '/site.webmanifest',
  icons: [
    { rel: 'icon', url: '/favicon.ico' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', url: '/favicon-16x16.png' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', url: '/favicon-32x32.png' },
    { rel: 'apple-touch-icon', sizes: '180x180', url: '/apple-touch-icon.png' },
    { rel: 'icon', type: 'image/png', sizes: '192x192', url: '/android-chrome-192x192.png' },
    { rel: 'icon', type: 'image/png', sizes: '512x512', url: '/android-chrome-512x512.png' },
  ],
}

export default function RootLayout({ children, }) {
  return (
    <html lang="pt-BR">
      <body className={`font-sans`}>
        <Suspense fallback={null}>{children}</Suspense>
      </body>
    </html>
  )
}
