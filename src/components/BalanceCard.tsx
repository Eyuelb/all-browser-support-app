"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Coins } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/lib/auth/auth.hooks";

interface BalanceCardProps {
  balance?: number;
  bonus?: number;
  currency?: string;
}

export default function BalanceCard({
  balance,
  bonus,
  currency = "Birr",
}: BalanceCardProps) {
  const t = useTranslations();
  const { theme } = useTheme();
  const { session } = useAuth();

  const userBalance = balance ?? 0;
  const userBonus = bonus ?? 0;

  return (
    <Card
      className={`border-0 shadow-2xl transition-all duration-300 ${
        theme === "dark"
          ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:shadow-blue-500/25"
          : "bg-gradient-to-r from-blue-500 to-blue-600 hover:shadow-blue-400/25"
      }`}
    >
      <CardContent className="p-6">
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg">
                <Coins className="h-5 w-5 text-yellow-800 font-bold" />
              </div>
              <div className="text-white/80 text-sm font-medium">
                {t("common.wallet")}
              </div>
            </div>
            <div className="text-white/80 text-sm">
              {t("common.balance")}: {userBalance.toLocaleString()}{" "}
              {t(`currency.${currency.toLowerCase()}`)}
            </div>
            <div className="text-white/80 text-sm">
              {t("common.bonus")}: {userBonus}{" "}
              {t(`currency.${currency.toLowerCase()}`)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
