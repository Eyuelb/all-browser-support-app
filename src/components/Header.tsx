"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MoreVertical, X, RefreshCw, Plus, Globe } from "lucide-react";
import { useLanguage } from "@/i18n";

interface HeaderProps {
  userName?: string;
}

export default function Header({ userName = "T@Y" }: HeaderProps) {
  const { t, language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "am" : "en");
  };

  return (
    <header className="relative z-10 flex justify-between items-center p-4 sm:p-6">
      <div className="flex items-center gap-2">
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold">
            {userName.slice(0, 3).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <span className="text-white font-medium">
          {t("common.hello")}, {userName}!
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleLanguage}
          className="text-white hover:bg-white/10"
          title={language === "en" ? "Switch to Amharic" : "Switch to English"}
        >
          <Globe className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/10"
        >
          <MoreVertical className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/10"
        >
          <X className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/10"
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
