"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, RefreshCw, VolumeX } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

interface CardSelectionPageProps {
  gameMode: {
    name: string;
    price: string;
    color: string;
  };
  onBack: () => void;
}

export default function CardSelectionPage({
  gameMode,
  onBack,
}: CardSelectionPageProps) {
  const { theme } = useTheme();
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(60); // 60 seconds countdown
  const [isGameStarted, setIsGameStarted] = useState(false);

  // Countdown timer
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsGameStarted(true);
    }
  }, [timeLeft]);

  const handleCardSelect = (number: number) => {
    if (isGameStarted) return;

    setSelectedCards((prev) =>
      prev.includes(number)
        ? prev.filter((n) => n !== number)
        : [...prev, number]
    );
  };

  const generateNumbers = () => {
    const numbers = [];
    for (let i = 1; i <= 130; i++) {
      numbers.push(i);
    }
    return numbers;
  };

  const numbers = generateNumbers();

  return (
    <div
      className={`min-h-screen relative ${
        theme === "dark"
          ? "bg-black"
          : "bg-gradient-to-br from-slate-100 via-purple-100 to-slate-200"
      }`}
    >
      {/* Background Pattern */}
      <div
        className={`absolute inset-0 ${
          theme === "dark" ? "opacity-5" : "opacity-3"
        }`}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
          <div
            key={num}
            className={`absolute text-6xl font-bold ${
              theme === "dark" ? "text-white/10" : "text-slate-400/20"
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
              theme === "dark"
                ? "text-white hover:bg-white/10"
                : "text-slate-700 hover:bg-slate-100"
            }`}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <span
            className={`font-medium ${
              theme === "dark" ? "text-white" : "text-slate-800"
            }`}
          >
            Back
          </span>
        </div>

        <h1
          className={`text-lg font-semibold ${
            theme === "dark" ? "text-white" : "text-slate-800"
          }`}
        >
          Choose card
        </h1>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className={`${
              theme === "dark"
                ? "text-yellow-400 hover:bg-white/10"
                : "text-yellow-600 hover:bg-slate-100"
            }`}
          >
            <RefreshCw className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={`${
              theme === "dark"
                ? "text-yellow-400 hover:bg-white/10"
                : "text-yellow-600 hover:bg-slate-100"
            }`}
          >
            <VolumeX className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Game Info Cards */}
      <div className="relative z-10 px-4 sm:px-6 mb-6">
        <div className="grid grid-cols-3 gap-3">
          {/* Wallet */}
          <Card className="bg-blue-500 border-0">
            <CardContent className="p-3">
              <div className="text-white text-xs opacity-90">Wallet</div>
              <div className="text-white text-sm font-semibold">0 Birr</div>
            </CardContent>
          </Card>

          {/* Stake */}
          <Card className="bg-orange-500 border-0">
            <CardContent className="p-3">
              <div className="text-white text-xs opacity-90">Stake</div>
              <div className="text-white text-sm font-semibold">
                {gameMode.price}
              </div>
            </CardContent>
          </Card>

          {/* Timer */}
          <Card className="bg-pink-500 border-0">
            <CardContent className="p-3">
              <div className="text-white text-xs opacity-90">
                Game starts in
              </div>
              <div className="text-white text-lg font-bold">{timeLeft}s</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Number Grid */}
      <div className="relative z-10 px-4 sm:px-6 mb-6">
        <div className="grid grid-cols-10 gap-1 max-w-md mx-auto">
          {numbers.map((number) => {
            const isSelected = selectedCards.includes(number);
            const isSpecial = number === 35; // Special green card

            return (
              <Button
                key={number}
                variant="ghost"
                size="sm"
                onClick={() => handleCardSelect(number)}
                disabled={isGameStarted}
                className={`h-8 w-8 p-0 text-xs font-medium ${
                  isSpecial
                    ? "bg-green-500 text-white hover:bg-green-600"
                    : isSelected
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : theme === "dark"
                    ? "bg-slate-800 text-white hover:bg-slate-700"
                    : "bg-slate-200 text-slate-800 hover:bg-slate-300"
                }`}
              >
                {number}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Start Button */}
      <div className="relative z-10 px-4 sm:px-6 pb-24">
        <Button
          className={`w-full py-4 text-lg font-semibold ${
            selectedCards.length === 0 || !isGameStarted
              ? "bg-slate-600 text-slate-400 cursor-not-allowed"
              : "bg-orange-500 hover:bg-orange-600 text-white"
          }`}
          disabled={selectedCards.length === 0 || !isGameStarted}
        >
          {isGameStarted ? "Start" : `Wait ${timeLeft}s`}
        </Button>
      </div>

      {/* Bottom Navigation */}
      <nav
        className={`fixed bottom-0 left-0 right-0 backdrop-blur-sm border-t ${
          theme === "dark"
            ? "bg-slate-800/90 border-slate-700"
            : "bg-white/90 border-slate-200"
        }`}
      >
        <div className="flex justify-around py-2">
          {[
            { icon: "🎮", label: "Games" },
            { icon: "💳", label: "Wallet" },
            { icon: "📋", label: "History" },
            { icon: "⚙️", label: "Settings" },
          ].map((item, index) => (
            <Button
              key={item.label}
              variant="ghost"
              className={`flex flex-col items-center gap-1 h-auto py-3 px-4 ${
                index === 0
                  ? "text-yellow-400 bg-yellow-400/10"
                  : theme === "dark"
                  ? "text-slate-400 hover:text-white hover:bg-white/5"
                  : "text-slate-600 hover:text-slate-800 hover:bg-slate-100"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-xs">{item.label}</span>
            </Button>
          ))}
        </div>
      </nav>
    </div>
  );
}
