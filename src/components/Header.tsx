"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Plus } from "lucide-react";
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
        <span
          className={`font-medium text-lg ${
            theme === "dark" ? "text-white" : "text-slate-800"
          }`}
        >
          {t("common.hello")}, {userName}!
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Button className="bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-semibold px-4 py-2">
          <Plus className="h-4 w-4 mr-1" />
          {t("common.deposit")}
        </Button>
        <Avatar className="h-10 w-10">
          <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold">
            {userName.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
