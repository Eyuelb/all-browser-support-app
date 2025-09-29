"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { Globe } from "lucide-react";

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "am", name: "አማርኛ", flag: "🇪🇹" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
];

export default function LanguageSwitcher() {
  const locale = useLocale();

  return (
    <div className="flex items-center gap-2">
      <Globe className="h-4 w-4 text-gray-600" />
      <div className="flex gap-2">
        {languages.map((lang) => (
          <Link
            key={lang.code}
            href={`/${lang.code}`}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              locale === lang.code
                ? "bg-orange-500 text-white"
                : "text-gray-600 hover:text-orange-500 hover:bg-orange-50"
            }`}
          >
            <span className="mr-1">{lang.flag}</span>
            {lang.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
