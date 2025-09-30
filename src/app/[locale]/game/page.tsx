"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/app/[locale]/components/ui/button";
import { Card, CardContent } from "@/app/[locale]/components/ui/card";
import {
  Coins,
  GraduationCap,
  Plus,
  UserPlus,
  Gamepad2,
  Wallet,
  History,
  Settings,
  Play,
} from "lucide-react";

export default function GameLobby() {
  const t = useTranslations();
  const [balance] = useState(1200);
  const [bonus] = useState(50);

  const betOptions = [
    {
      id: "mini",
      name: "Mini",
      amount: 10,
      color: "from-blue-500 to-blue-600",
      borderColor: "border-blue-200",
      ballNumber: "B-15",
      icon: "🔵",
    },
    {
      id: "sweety",
      name: "Sweety",
      amount: 20,
      color: "from-orange-500 to-orange-600",
      borderColor: "border-orange-200",
      ballNumber: "I-23",
      icon: "🟠",
    },
    {
      id: "standard",
      name: "Standard",
      amount: 50,
      color: "from-purple-500 to-purple-600",
      borderColor: "border-purple-200",
      ballNumber: "N-42",
      icon: "🟣",
    },
    {
      id: "grand",
      name: "Grand",
      amount: 100,
      color: "from-green-500 to-green-600",
      borderColor: "border-green-200",
      ballNumber: "G-73",
      icon: "🟢",
    },
  ];

  const navigationItems = [
    { icon: Gamepad2, label: "Game", active: true },
    { icon: Wallet, label: "Wallet" },
    { icon: History, label: "History" },
    { icon: Settings, label: "Settings" },
  ];

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, #f59e0b 2px, transparent 2px),
            radial-gradient(circle at 75% 75%, #3b82f6 2px, transparent 2px),
            radial-gradient(circle at 50% 50%, #8b5cf6 2px, transparent 2px)
          `,
          backgroundSize: "60px 60px, 80px 80px, 100px 100px",
          backgroundPosition: "0 0, 30px 30px, 15px 15px",
        }}
      />

      {/* Header */}
      <div className="relative z-10 px-4 py-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Hello, Azina!</h1>
            <p className="text-gray-600 text-sm">Ready to play some Bingo?</p>
          </div>
          <Button className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg">
            <Plus className="h-4 w-4 mr-2" />
            Deposit
          </Button>
        </div>

        {/* Wallet and Instructions Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Wallet Card */}
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 border-0 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg">
                    <Coins className="h-8 w-8 text-yellow-800" />
                  </div>
                  <div>
                    <h3 className="text-white text-lg font-semibold">Wallet</h3>
                    <div className="text-white/90 text-sm">
                      Balance: {balance.toLocaleString()} Birr
                    </div>
                    <div className="text-white/90 text-sm">
                      Bonus: {bonus} Birr
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Instructions Card */}
          <Card className="border-2 border-yellow-300 bg-white shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg">
                    <GraduationCap className="h-6 w-6 text-yellow-800" />
                  </div>
                  <div>
                    <h3 className="text-gray-800 text-lg font-semibold">
                      Instructions
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Learn how to play and win big!
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="border-yellow-400 text-yellow-600 hover:bg-yellow-50"
                >
                  View
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Play Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">Play</h2>
            <Button
              variant="outline"
              className="border-blue-300 text-blue-600 hover:bg-blue-50"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Invite Friends
            </Button>
          </div>

          {/* Bet Options Grid - 2 columns on mobile, 4 columns on desktop */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {betOptions.map((option) => (
              <Card
                key={option.id}
                className={`border-2 ${option.borderColor} bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}
              >
                <CardContent className="p-4">
                  <div className="text-center">
                    <div
                      className={`w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-r ${option.color} flex items-center justify-center text-white font-bold text-lg shadow-lg`}
                    >
                      {option.icon}
                    </div>
                    <h3 className="font-bold text-gray-800 text-lg mb-1">
                      {option.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">
                      {option.amount} Birr
                    </p>
                    <p className="text-gray-500 text-xs mb-3">
                      {option.ballNumber}
                    </p>
                    <Button
                      className={`w-full bg-gradient-to-r ${option.color} hover:opacity-90 text-white font-semibold py-2 rounded-lg shadow-md`}
                    >
                      <Play className="h-4 w-4 mr-1" />
                      Play Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-20">
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200 px-4 py-3">
          <div className="flex justify-around items-center">
            {navigationItems.map((item, index) => (
              <button
                key={index}
                className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors ${
                  item.active
                    ? "text-orange-500 bg-orange-50"
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                }`}
              >
                <item.icon className="h-6 w-6" />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom padding to prevent content from being hidden behind navigation */}
      <div className="h-20"></div>
    </div>
  );
}
