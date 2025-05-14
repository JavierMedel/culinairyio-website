import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script"; // Import next/script
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CulinAIry.io - AI-Powered Meal Planning",
  description: "CulinAIry.io is an AI-powered meal planning service that creates personalized meal plans based on your preferences, dietary restrictions, and available ingredients.",
  icons: {
    icon: '/images/icon.ico',
    shortcut: '/images/icon.ico',
    apple: '/images/icon.ico',
  },
  openGraph: {
    title: "CulinAIry.io - AI-Powered Meal Planning",
    description: "CulinAIry.io is an AI-powered meal planning service that creates personalized meal plans based on your preferences, dietary restrictions, and available ingredients.",
    url: "https://culinairy.io",
    siteName: "CulinAIry.io",
    images: [
      {
        url: "https://culinairy.io/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "CulinAIry.io - AI-Powered Meal Planning",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

import { ThemeProvider } from "@/components/ThemeProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* Remove <head> tag, Next.js handles this */}
      <body className={`${inter.className} bg-background min-h-screen antialiased`} suppressHydrationWarning>
        {/* Google Tag Manager - Global site tag (gtag.js) */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-J09L7370ZX"
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-J09L7370ZX');
            `,
          }}
        />
        <ThemeProvider defaultTheme="dark">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
