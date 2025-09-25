"use client";

import { useLanguage } from "@/i18n";

interface FooterProps {
  version?: string;
  timestamp?: string;
}

export default function Footer({
  version,
  timestamp = "9:58:31 AM",
}: FooterProps) {
  const { t } = useLanguage();
  const appVersion = version || t("common.version");

  return (
    <footer className="absolute bottom-2 right-4 text-slate-400 text-xs">
      {timestamp} - {appVersion}
    </footer>
  );
}
