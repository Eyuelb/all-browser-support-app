"use client";

import { useLanguage } from "@/i18n";
import { useTheme } from "@/contexts/ThemeContext";

interface FooterProps {
  version?: string;
  timestamp?: string;
}

export default function Footer({
  version,
  timestamp = new Date().toLocaleTimeString(),
}: FooterProps) {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const appVersion = version || t("common.version");

  return (
    <footer
      className={`absolute bottom-2 right-4 text-xs ${
        theme === "dark" ? "text-slate-400" : "text-slate-500"
      }`}
    >
      {timestamp} - {appVersion}
    </footer>
  );
}
