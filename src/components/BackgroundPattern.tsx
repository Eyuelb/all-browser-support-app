"use client";

import { useTheme } from "@/contexts/ThemeContext";

export default function BackgroundPattern() {
  const { theme } = useTheme();

  return (
    <div
      className={`absolute inset-0 ${
        theme === "dark" ? "opacity-10" : "opacity-5"
      }`}
    >
      <div
        className={`absolute top-10 left-10 text-6xl font-bold ${
          theme === "dark" ? "text-white/20" : "text-slate-400/30"
        }`}
      >
        75
      </div>
      <div
        className={`absolute top-32 right-20 text-4xl font-bold ${
          theme === "dark" ? "text-white/20" : "text-slate-400/30"
        }`}
      >
        42
      </div>
      <div
        className={`absolute top-64 left-1/4 text-5xl font-bold ${
          theme === "dark" ? "text-white/20" : "text-slate-400/30"
        }`}
      >
        18
      </div>
      <div
        className={`absolute bottom-32 right-1/3 text-3xl font-bold ${
          theme === "dark" ? "text-white/20" : "text-slate-400/30"
        }`}
      >
        91
      </div>
      <div
        className={`absolute bottom-20 left-1/2 text-4xl font-bold ${
          theme === "dark" ? "text-white/20" : "text-slate-400/30"
        }`}
      >
        B
      </div>
      <div
        className={`absolute top-1/2 right-10 text-6xl font-bold ${
          theme === "dark" ? "text-white/20" : "text-slate-400/30"
        }`}
      >
        I
      </div>
      <div
        className={`absolute bottom-1/3 left-10 text-5xl font-bold ${
          theme === "dark" ? "text-white/20" : "text-slate-400/30"
        }`}
      >
        N
      </div>
      <div
        className={`absolute top-1/3 right-1/4 text-4xl font-bold ${
          theme === "dark" ? "text-white/20" : "text-slate-400/30"
        }`}
      >
        G
      </div>
      <div
        className={`absolute bottom-10 right-10 text-3xl font-bold ${
          theme === "dark" ? "text-white/20" : "text-slate-400/30"
        }`}
      >
        O
      </div>
    </div>
  );
}
