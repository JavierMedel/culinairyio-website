import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ShoppingCartProvider } from '@/components/ShoppingCartContext';

export const metadata = {
  title: "CulinAIry.io",
  description: "Your website description", // Update as needed
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
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
