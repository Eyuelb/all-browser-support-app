"use client";

import { Button } from "@/components/ui/button";
import { Wallet, List, Settings, Play } from "lucide-react";
import { useLanguage } from "@/i18n";
import { useTheme } from "@/contexts/ThemeContext";

interface NavigationItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  active?: boolean;
}

interface BottomNavigationProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const getNavigationItems = (t: (key: string) => string): NavigationItem[] => [
  { icon: Play, label: t("navigation.game"), active: true },
  { icon: Wallet, label: t("navigation.wallet") },
  { icon: List, label: t("navigation.history") },
  { icon: Settings, label: t("navigation.settings") },
];

export default function BottomNavigation({
  activeTab = "Play",
  onTabChange,
}: BottomNavigationProps) {
  const { t } = useLanguage();
  const { actualTheme } = useTheme();
  const navigationItems = getNavigationItems(t);

  return (
    <nav
      className={`backdrop-blur-sm border-t ${
        actualTheme === "dark"
          ? "bg-slate-800/90 border-slate-700"
          : "bg-white/90 border-slate-200"
      }`}
    >
      <div className="flex justify-around py-2">
        {navigationItems.map((item) => (
          <Button
            key={item.label}
            variant="ghost"
            onClick={() => onTabChange?.(item.label)}
            className={`flex flex-col items-center gap-1 h-auto py-3 px-4 ${
              item.label === activeTab
                ? "text-yellow-400 bg-yellow-400/10"
                : actualTheme === "dark"
                ? "text-slate-400 hover:text-white hover:bg-white/5"
                : "text-slate-600 hover:text-slate-800 hover:bg-slate-100"
            }`}
          >
            <item.icon
              className={`h-5 w-5 ${
                item.label === activeTab ? "text-yellow-400" : ""
              }`}
            />
            <span className="text-xs">{item.label}</span>
          </Button>
        ))}
      </div>
    </nav>
  );
}
