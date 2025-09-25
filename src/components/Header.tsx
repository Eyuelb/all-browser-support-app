"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { X, RefreshCw, Plus } from "lucide-react";
import { useLanguage } from "@/i18n";
import { useTheme } from "@/contexts/ThemeContext";

interface HeaderProps {
  userName?: string;
}

export default function Header({ userName = "T@Y" }: HeaderProps) {
  const { t } = useLanguage();
  const { theme } = useTheme();

  return (
    <header className="relative z-10 flex justify-between items-center p-4 sm:p-6">
      <div className="flex items-center gap-2">
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold">
            {userName.slice(0, 3).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <span
          className={`font-medium ${
            theme === "dark" ? "text-white" : "text-slate-800"
          }`}
        >
          {t("common.hello")}, {userName}!
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className={`hover:bg-white/10 ${
            theme === "dark"
              ? "text-white"
              : "text-slate-700 hover:bg-slate-100"
          }`}
        >
          <X className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className={`hover:bg-white/10 ${
            theme === "dark"
              ? "text-white"
              : "text-slate-700 hover:bg-slate-100"
          }`}
        >
          <RefreshCw className="h-5 w-5" />
        </Button>
        <Button className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-semibold">
          <Plus className="h-4 w-4 mr-1" />
          {t("common.deposit")}
        </Button>
      </div>
    </header>
  );
}
