import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Toaster } from 'react-hot-toast'
import ClientAuthProvider from '@/components/ClientAuthProvider'
import { siteConfig } from '@/lib/site-config'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(`https://${siteConfig.company.domain}`),
  title: `${siteConfig.company.name} — ${siteConfig.company.tagline}`,
  description:
    'High-quality container rentals — on-site storage, offices, 8-bed sleeper units, ablution facilities, canteens, refrigeration units and security huts across the Western Cape, Southern Cape, Gauteng and Mpumalanga. Best service and value for your money, guaranteed.',
  icons: { icon: '/favicon.ico', apple: '/logo-dark.png' },
  openGraph: {
    title: `${siteConfig.company.name} — ${siteConfig.company.tagline}`,
    description: 'Best service and value for your money, guaranteed. A one-stop shop for complete site establishment.',
    type: 'website',
    locale: 'en_ZA',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientAuthProvider>
          <Navigation />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <Toaster position="top-right" />
        </ClientAuthProvider>
      </body>
    </html>
  )
}
