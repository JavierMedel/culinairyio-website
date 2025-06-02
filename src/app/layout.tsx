import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ShoppingCartProvider } from '@/components/ShoppingCartContext';
import Script from 'next/script';

export const metadata = {
  title: "CulinAIry.io",
  description: "Discover AI-powered meal planning and recipe generation. Create personalized, delicious recipes tailored to your preferences and dietary needs with CulinAIry.io", // Update as needed
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        {/* Google tag (gtag.js) */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-J09L7370ZX" />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-J09L7370ZX');
          `}
        </Script>
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ShoppingCartProvider>
            {children}
          </ShoppingCartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
