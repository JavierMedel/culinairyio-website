"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
// Assuming useTheme is correctly imported from next-themes or your ThemeProvider wrapper
import { useTheme } from "next-themes"; // Or from "@/components/ThemeProvider" if you re-export it
import { useState, useEffect } from "react";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return a placeholder or null to avoid hydration mismatch
    // Rendering the button structure without the dynamic icon can also work
    // to prevent layout shifts, but the icon itself should wait.
    // For simplicity and to match common patterns for next-themes:
    return (
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full hover:bg-culinairy-teal/10"
        aria-label="Toggle theme"
        disabled // Disable button until theme is known
      >
        {/* You can render a default static icon or a spinner here if preferred */}
        <Sun className="h-5 w-5 text-culinairy-lightGray opacity-50" /> {/* Example placeholder */}
      </Button>
    );
  }

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