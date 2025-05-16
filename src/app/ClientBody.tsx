"use client";

import { useEffect } from "react";

export default function ClientBody({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // This line overwrites any existing classes on the body tag.
    // If next-themes is configured to put its class on <html> (default with attribute="class"),
    // this should not directly interfere with theme switching.
    // However, it's quite aggressive.
    document.body.className = "antialiased";
  }, []);

  return (
    <body className="antialiased" suppressHydrationWarning>
      {children}
    </body>
  );
}