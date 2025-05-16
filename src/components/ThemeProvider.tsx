"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

// You can also re-export useTheme if needed, though typically components import it directly from 'next-themes'
// or from this file if you add a custom hook. For simplicity, importing from 'next-themes' in ThemeToggle
// after this setup is also an option, or ensure ThemeToggle uses the hook provided by this setup.
// To match your current ThemeToggle, ensure useTheme is available:
export { useTheme } from "next-themes"; // If ThemeToggle imports useTheme from here