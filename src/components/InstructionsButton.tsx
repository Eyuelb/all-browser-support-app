"use client";

import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "@/contexts/ThemeContext";

interface InstructionsButtonProps {
  onClick?: () => void;
}

export default function InstructionsButton({
  onClick,
}: InstructionsButtonProps) {
  const t = useTranslations();
  const { theme } = useTheme();

  return (
    <Card
      className={`border-0 shadow-2xl transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer ${
        theme === "dark"
          ? "bg-slate-800 hover:bg-slate-700"
          : "bg-white hover:bg-slate-50"
      }`}
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <div className="text-lg font-bold text-slate-800 dark:text-white">
              {t("common.instructions")}
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-300">
              Learn how to play Bingo and win big!
            </div>
          </div>
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg">
            <GraduationCap className="h-6 w-6 text-yellow-800" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
