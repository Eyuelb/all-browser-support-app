"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Plus, Sun, Moon, Languages } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/lib/auth/auth.hooks";
import { useRouter, usePathname } from "next/navigation";

interface HeaderProps {
  userName?: string;
}

export default function Header({ userName }: HeaderProps) {
  const t = useTranslations();
  const { theme, actualTheme, toggleTheme } = useTheme();
  const { session, signOut } = useAuth();
  const user = session?.user;
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const displayName =
    userName || user?.firstName || user?.email || t("ui.guest");

  const handleLanguageSwitch = () => {
    const newLocale = locale === "en" ? "am" : "en";
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <header className="relative z-10 flex justify-between items-center p-4 sm:p-6">
      <div className="flex items-center gap-2">
        <span
          className={`font-medium text-lg ${
            theme === "dark" ? "text-white" : "text-slate-800"
          }`}
        >
          {t("common.hello")}, {displayName}!
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Button className="bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-semibold px-4 py-2">
          <Plus className="h-4 w-4 mr-1" />
          {t("common.deposit")}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className={`hover:bg-white/10 ${
            actualTheme === "dark"
              ? "text-white"
              : "text-slate-700 hover:bg-slate-100"
          }`}
          title={
            actualTheme === "dark"
              ? "Switch to light mode"
              : "Switch to dark mode"
          }
        >
          {actualTheme === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={handleLanguageSwitch}
          className={`hover:bg-white/10 ${
            actualTheme === "dark"
              ? "text-white"
              : "text-slate-700 hover:bg-slate-100"
          }`}
          title="Switch language"
        >
          <Languages className="h-5 w-5" />
        </Button>

        <Avatar className="h-10 w-10 cursor-pointer" onClick={signOut}>
          <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold">
            {displayName.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
