"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  RefreshCw,
  Plus,
  Minus,
  TrendingUp,
  TrendingDown,
  CreditCard,
  Banknote,
  History,
  Filter,
  Search,
  Download,
  Eye,
  EyeOff,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "@/contexts/ThemeContext";
import BottomNavigation from "./BottomNavigation";
import { useState } from "react";

interface WalletPageProps {
  onBack: () => void;
  onTabChange?: (tab: string) => void;
}

export default function WalletPage({ onBack, onTabChange }: WalletPageProps) {
  const t = useTranslations();
  const { actualTheme } = useTheme();
  const [showBalance, setShowBalance] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("all");

  const transactions = [
    {
      id: 1,
      type: "bonus",
      title: "Welcome Bonus",
      date: "Sep 25, 12:02 PM",
      status: "Processed",
      amount: "+10 Birr",
      icon: TrendingUp,
      category: "bonus",
    },
    {
      id: 2,
      type: "deposit",
      title: "Bank Transfer",
      date: "Sep 24, 3:45 PM",
      status: "Completed",
      amount: "+50 Birr",
      icon: CreditCard,
      category: "deposit",
    },
    {
      id: 3,
      type: "withdrawal",
      title: "Cash Withdrawal",
      date: "Sep 23, 10:30 AM",
      status: "Completed",
      amount: "-20 Birr",
      icon: TrendingDown,
      category: "withdrawal",
    },
    {
      id: 4,
      type: "game",
      title: "Bingo Win",
      date: "Sep 22, 8:15 PM",
      status: "Processed",
      amount: "+15 Birr",
      icon: Banknote,
      category: "win",
    },
    {
      id: 5,
      type: "game",
      title: "Game Entry",
      date: "Sep 21, 7:20 PM",
      status: "Processed",
      amount: "-5 Birr",
      icon: Minus,
      category: "game",
    },
  ];

  const filteredTransactions =
    selectedFilter === "all"
      ? transactions
      : transactions.filter((tx) => tx.category === selectedFilter);

  const totalBalance = 50;
  const bonusBalance = 10;
  const totalEarnings = 75;
  const totalSpent = 25;

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
      <header className="relative z-10 flex items-center justify-between p-4 sm:p-6 lg:px-8">
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
            {t("ui.back")}
          </span>
        </div>

        <h1
          className={`text-2xl font-bold ${
            actualTheme === "dark" ? "text-white" : "text-slate-800"
          }`}
        >
          {t("navigation.wallet")}
        </h1>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowBalance(!showBalance)}
            className={`${
              actualTheme === "dark"
                ? "text-yellow-400 hover:bg-white/10"
                : "text-yellow-600 hover:bg-slate-100"
            }`}
          >
            {showBalance ? (
              <Eye className="h-5 w-5" />
            ) : (
              <EyeOff className="h-5 w-5" />
            )}
          </Button>
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
        </div>
      </header>

      {/* Desktop Layout Container */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 pb-32 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Balance & Actions */}
          <div className="lg:col-span-1 space-y-6">
            {/* Main Balance Card */}
            <Card className="bg-gradient-to-br from-red-500 to-red-600 border-0 shadow-xl">
              <CardContent className="p-6 relative overflow-hidden">
                <div className="text-white">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm opacity-90">
                      {t("common.balance")}
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-white/20 text-white border-0"
                    >
                      {t("currency.birr")}
                    </Badge>
                  </div>

                  <div className="text-4xl font-bold mb-6">
                    {showBalance
                      ? `${totalBalance} ${t("currency.birr")}`
                      : "••••"}
                  </div>

                  <div className="w-full h-px bg-white/30 mb-4"></div>

                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm opacity-90 mb-1">
                        {t("common.bonus")}
                      </div>
                      <div className="text-xl font-bold">
                        {showBalance
                          ? `${bonusBalance} ${t("currency.birr")}`
                          : "••••"}
                      </div>
                    </div>
                    <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-yellow-800 font-bold text-sm">
                        ETB
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card
              className={`${
                actualTheme === "dark"
                  ? "bg-slate-800 border-slate-700"
                  : "bg-white border-slate-200"
              }`}
            >
              <CardHeader>
                <CardTitle
                  className={`text-lg ${
                    actualTheme === "dark" ? "text-white" : "text-slate-800"
                  }`}
                >
                  {t("ui.quickStats")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span
                    className={`text-sm ${
                      actualTheme === "dark"
                        ? "text-slate-400"
                        : "text-slate-600"
                    }`}
                  >
                    {t("ui.totalEarnings")}
                  </span>
                  <span
                    className={`font-semibold ${
                      actualTheme === "dark"
                        ? "text-green-400"
                        : "text-green-600"
                    }`}
                  >
                    {showBalance
                      ? `+${totalEarnings} ${t("currency.birr")}`
                      : "••••"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span
                    className={`text-sm ${
                      actualTheme === "dark"
                        ? "text-slate-400"
                        : "text-slate-600"
                    }`}
                  >
                    {t("ui.totalSpent")}
                  </span>
                  <span
                    className={`font-semibold ${
                      actualTheme === "dark" ? "text-red-400" : "text-red-600"
                    }`}
                  >
                    {showBalance
                      ? `-${totalSpent} ${t("currency.birr")}`
                      : "••••"}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 h-12">
                <Plus className="h-5 w-5 mr-2" />
                {t("common.deposit")}
              </Button>
              <Button className="w-full bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white font-semibold py-3 h-12">
                <Minus className="h-5 w-5 mr-2" />
                {t("ui.withdraw")}
              </Button>
              <Button variant="outline" className="w-full py-3 h-12">
                <Download className="h-5 w-5 mr-2" />
                {t("ui.exportStatement")}
              </Button>
            </div>
          </div>

          {/* Right Column - Transactions */}
          <div className="lg:col-span-2">
            <Card
              className={`${
                actualTheme === "dark"
                  ? "bg-slate-800 border-slate-700"
                  : "bg-white border-slate-200"
              }`}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle
                    className={`text-xl ${
                      actualTheme === "dark" ? "text-white" : "text-slate-800"
                    }`}
                  >
                    {t("ui.transactions")}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Search className="h-4 w-4 mr-2" />
                      {t("ui.search")}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      {t("ui.filter")}
                    </Button>
                  </div>
                </div>

                {/* Filter Tabs */}
                <div className="flex gap-2 mt-4">
                  {[
                    { key: "all", label: t("ui.all") },
                    { key: "deposit", label: t("ui.deposits") },
                    { key: "withdrawal", label: t("ui.withdrawals") },
                    { key: "game", label: t("ui.games") },
                    { key: "bonus", label: t("ui.bonuses") },
                  ].map((filter) => (
                    <Button
                      key={filter.key}
                      variant={
                        selectedFilter === filter.key ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => setSelectedFilter(filter.key)}
                      className="text-xs"
                    >
                      {filter.label}
                    </Button>
                  ))}
                </div>
              </CardHeader>

              <CardContent className="p-0">
                <div className="max-h-96 overflow-y-auto">
                  {filteredTransactions.length === 0 ? (
                    <div className="p-8 text-center">
                      <History className="h-12 w-12 mx-auto mb-4 text-slate-400" />
                      <p
                        className={`text-sm ${
                          actualTheme === "dark"
                            ? "text-slate-400"
                            : "text-slate-600"
                        }`}
                      >
                        {t("ui.noTransactions")}
                      </p>
                    </div>
                  ) : (
                    <div className="divide-y divide-slate-200 dark:divide-slate-700">
                      {filteredTransactions.map((transaction) => (
                        <div
                          key={transaction.id}
                          className="p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div
                                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                                  transaction.type === "deposit" ||
                                  transaction.type === "bonus" ||
                                  transaction.type === "win"
                                    ? "bg-green-100 dark:bg-green-900/30"
                                    : "bg-red-100 dark:bg-red-900/30"
                                }`}
                              >
                                <transaction.icon
                                  className={`h-6 w-6 ${
                                    transaction.type === "deposit" ||
                                    transaction.type === "bonus" ||
                                    transaction.type === "win"
                                      ? "text-green-600 dark:text-green-400"
                                      : "text-red-600 dark:text-red-400"
                                  }`}
                                />
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
                                <div className="flex items-center gap-2 mt-1">
                                  <span
                                    className={`text-sm ${
                                      actualTheme === "dark"
                                        ? "text-slate-400"
                                        : "text-slate-600"
                                    }`}
                                  >
                                    {transaction.date}
                                  </span>
                                  <Badge
                                    variant={
                                      transaction.status === "Completed"
                                        ? "default"
                                        : "secondary"
                                    }
                                    className="text-xs"
                                  >
                                    {transaction.status}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                            <div
                              className={`text-right ${
                                transaction.amount.startsWith("+")
                                  ? "text-green-600 dark:text-green-400"
                                  : "text-red-600 dark:text-red-400"
                              }`}
                            >
                              <div className="font-semibold text-lg">
                                {transaction.amount}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Bottom Navigation - Mobile Only */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
        <BottomNavigation
          activeTab={t("navigation.wallet")}
          onTabChange={onTabChange}
        />
      </div>
    </div>
  );
}
