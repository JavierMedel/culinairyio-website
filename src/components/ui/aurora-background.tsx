"use client";

import React from "react";
import { cn } from "@/lib/utils";

export function AuroraBackground({
  children,
  className,
  showRadialGradient = true,
}: {
  children?: React.ReactNode;
  className?: string;
  showRadialGradient?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative h-full w-full bg-gray-900 flex items-center justify-center overflow-hidden",
        className
      )}
    >
      <div className="absolute inset-0 overflow-hidden">
        {/* Top left aurora */}
        <div
          className="absolute -left-[10%] -top-[20%] h-[40%] w-[50%] bg-culinairy-teal/20 blur-[100px] transform-gpu animate-aurora-slow"
          style={{
            borderRadius: "50%",
          }}
        />
        {/* Top right aurora */}
        <div
          className="absolute -right-[10%] -top-[20%] h-[40%] w-[50%] bg-culinairy-cyan/20 blur-[100px] transform-gpu animate-aurora"
          style={{
            borderRadius: "50%",
          }}
        />
        {/* Bottom left aurora */}
        <div
          className="absolute -left-[10%] -bottom-[20%] h-[40%] w-[50%] bg-culinairy-cyan/20 blur-[100px] transform-gpu animate-aurora-reverse"
          style={{
            borderRadius: "50%",
          }}
        />
        {/* Bottom right aurora */}
        <div
          className="absolute -right-[10%] -bottom-[20%] h-[40%] w-[50%] bg-culinairy-teal/20 blur-[100px] transform-gpu animate-aurora-slow-reverse"
          style={{
            borderRadius: "50%",
          }}
        />
      </div>
      {showRadialGradient && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-900 to-transparent opacity-70" />
      )}
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
}