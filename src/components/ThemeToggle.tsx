"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
// Ensure this import correctly resolves to the useTheme hook from next-themes,
// either directly or via your ThemeProvider.tsx re-export.
import { useTheme } from "@/components/ThemeProvider"; 
// Or, if ThemeProvider.tsx doesn't re-export useTheme:
// import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="rounded-full hover:bg-culinairy-teal/10"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <Moon className="h-5 w-5 text-culinairy-darkBlue" />
      ) : (
        <Sun className="h-5 w-5 text-culinairy-lightGray" />
      )}
    </Button>
  );
}