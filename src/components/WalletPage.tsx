"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, RefreshCw, ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "@/contexts/ThemeContext";
import BottomNavigation from "./BottomNavigation";

interface WalletPageProps {
  onBack: () => void;
  onTabChange?: (tab: string) => void;
}

export default function WalletPage({ onBack, onTabChange }: WalletPageProps) {
  const t = useTranslations();
  const { actualTheme } = useTheme();

  const transactions = [
    {
      id: 1,
      type: "bonus",
      title: "Bonus",
      date: "Sep 25, 12:02 PM",
      status: "Processed",
      amount: "+10 Birr",
      icon: ChevronDown,
    },
  ];

  return (
    <div
      className={`min-h-screen relative ${
        actualTheme === "dark"
          ? "bg-black"
          : "bg-gradient-to-br from-slate-100 via-purple-100 to-slate-200"
      }`}
    >
      {/* Background Pattern */}
      <div
        className={`absolute inset-0 ${
          actualTheme === "dark" ? "opacity-5" : "opacity-3"
        }`}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
          <div
            key={num}
            className={`absolute text-6xl font-bold ${
              actualTheme === "dark" ? "text-white/10" : "text-slate-400/20"
            }`}
            style={{
              top: `${Math.random() * 80 + 10}%`,
              left: `${Math.random() * 80 + 10}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          >
            {num}
          </div>
        ))}
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between p-4 sm:p-6">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className={`${
              actualTheme === "dark"
                ? "text-white hover:bg-white/10"
                : "text-slate-700 hover:bg-slate-100"
            }`}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <span
            className={`font-medium ${
              actualTheme === "dark" ? "text-white" : "text-slate-800"
            }`}
          >
            Back
          </span>
        </div>

        <h1
          className={`text-2xl font-bold ${
            actualTheme === "dark" ? "text-white" : "text-slate-800"
          }`}
        >
          {t("navigation.wallet")}
        </h1>

        <Button
          variant="ghost"
          size="icon"
          className={`${
            actualTheme === "dark"
              ? "text-yellow-400 hover:bg-white/10"
              : "text-yellow-600 hover:bg-slate-100"
          }`}
        >
          <RefreshCw className="h-5 w-5" />
        </Button>
      </header>

      {/* Balance Card */}
      <div className="relative z-10 px-4 sm:px-6 mb-6">
        <Card className="bg-red-500 border-0 shadow-lg">
          <CardContent className="p-6 relative overflow-hidden">
            <div className="text-white">
              <div className="text-sm opacity-90 mb-1">
                {t("common.balance")}
              </div>
              <div className="text-3xl font-bold mb-4">
                0 {t("currency.birr")}
              </div>

              <div className="w-full h-px bg-white/30 mb-4"></div>

              <div className="text-sm opacity-90 mb-1">{t("common.bonus")}</div>
              <div className="text-2xl font-bold">10 {t("currency.birr")}</div>
            </div>

            {/* ETB Coin Graphic */}
            <div className="absolute -right-8 -top-4 w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-yellow-800 font-bold text-lg">ETB</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="relative z-10 px-4 sm:px-6 mb-6">
        <div className="flex gap-3">
          <Button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3">
            {t("common.deposit")}
          </Button>
          <Button className="flex-1 bg-slate-600 hover:bg-slate-700 text-white font-semibold py-3">
            Withdraw
          </Button>
        </div>
      </div>

      {/* Transactions Section */}
      <div className="relative z-10 px-4 sm:px-6 mb-6 pb-24">
        <h2
          className={`text-lg font-semibold mb-4 ${
            actualTheme === "dark" ? "text-white" : "text-slate-800"
          }`}
        >
          Transactions
        </h2>

        <div className="space-y-3">
          {transactions.map((transaction) => (
            <Card
              key={transaction.id}
              className={`${
                actualTheme === "dark"
                  ? "bg-slate-800 border-slate-700"
                  : "bg-white border-slate-200"
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                      <transaction.icon className="h-5 w-5 text-slate-600" />
                    </div>
                    <div>
                      <div
                        className={`font-medium ${
                          actualTheme === "dark"
                            ? "text-white"
                            : "text-slate-800"
                        }`}
                      >
                        {transaction.title}
                      </div>
                      <div
                        className={`text-sm ${
                          actualTheme === "dark"
                            ? "text-slate-400"
                            : "text-slate-600"
                        }`}
                      >
                        {transaction.date} · {transaction.status}
                      </div>
                    </div>
                  </div>
                  <div
                    className={`font-semibold ${
                      actualTheme === "dark" ? "text-white" : "text-slate-800"
                    }`}
                  >
                    {transaction.amount}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <BottomNavigation
          activeTab={t("navigation.wallet")}
          onTabChange={onTabChange}
        />
      </div>
    </div>
  );
}
