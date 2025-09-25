"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Coins } from "lucide-react";
import { useLanguage } from "@/i18n";

interface BalanceCardProps {
  balance?: number;
  bonus?: number;
  currency?: string;
}

export default function BalanceCard({
  balance = 0,
  bonus = 0,
  currency = "Birr",
}: BalanceCardProps) {
  const { t } = useLanguage();

  return (
    <Card className="mb-6 bg-gradient-to-r from-red-500 to-red-600 border-0 shadow-2xl hover:shadow-red-500/25 transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <div className="text-white/80 text-sm">{t("common.balance")}</div>
            <div className="text-white text-2xl font-bold">
              {balance} {t(`currency.${currency.toLowerCase()}`)}
            </div>
            <div className="text-white/80 text-sm">{t("common.bonus")}</div>
            <div className="text-white text-xl font-semibold">
              {bonus} {t(`currency.${currency.toLowerCase()}`)}
            </div>
          </div>
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg">
              <Coins className="h-10 w-10 text-yellow-800" />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full">
              {t("currency.etb")}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
