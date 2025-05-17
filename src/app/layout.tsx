import "./globals.css";
import { Inter } from "next/font/google"; // Or your chosen font
import { ThemeProvider } from "@/components/ThemeProvider";
import ClientBody from "./ClientBody"; // Your existing ClientBody component
import { ShoppingCartProvider } from '@/components/ShoppingCartContext'; // Adjust path if necessary
// Remove the duplicate import of ThemeProvider below
// import { ThemeProvider } from "@/components/ThemeProvider"; // Assuming you also have a ThemeProvider

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" }); // Example font setup

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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
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
