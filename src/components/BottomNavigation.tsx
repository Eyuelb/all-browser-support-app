"use client";

import { Button } from "@/components/ui/button";
import { Wallet, List, BarChart3, Settings, Play } from "lucide-react";
import { useLanguage } from "@/i18n";

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
  { icon: Play, label: t("navigation.play"), active: true },
  { icon: Wallet, label: t("navigation.wallet") },
  { icon: List, label: t("navigation.history") },
  { icon: BarChart3, label: t("navigation.stats") },
  { icon: Settings, label: t("navigation.settings") },
];

export default function BottomNavigation({
  activeTab = "Play",
  onTabChange,
}: BottomNavigationProps) {
  const { t } = useLanguage();
  const navigationItems = getNavigationItems(t);

  return (
    <nav className="bg-slate-800/90 backdrop-blur-sm border-t border-slate-700">
      <div className="flex justify-around py-2">
        {navigationItems.map((item) => (
          <Button
            key={item.label}
            variant="ghost"
            onClick={() => onTabChange?.(item.label)}
            className={`flex flex-col items-center gap-1 h-auto py-3 px-4 ${
              item.label === activeTab
                ? "text-yellow-400 bg-yellow-400/10"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span className="text-xs">{item.label}</span>
          </Button>
        ))}
      </div>
    </nav>
  );
}
