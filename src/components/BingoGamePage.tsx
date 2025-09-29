"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X, RefreshCw, VolumeX, Star } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import BottomNavigation from "./BottomNavigation";
import { useLanguage } from "@/i18n";

interface BingoGamePageProps {
  onBack: () => void;
  onTabChange?: (tab: string) => void;
}

export default function BingoGamePage({
  onBack,
  onTabChange,
}: BingoGamePageProps) {
  const { t } = useLanguage();
  const { actualTheme } = useTheme();
  const [timeLeft, setTimeLeft] = useState(27); // 27 seconds countdown
  const [drawnNumbers, setDrawnNumbers] = useState<number[]>([]);
  const [availableNumbers, setAvailableNumbers] = useState<number[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);

  // Initialize available numbers (1-75)
  useEffect(() => {
    const numbers = [];
    for (let i = 1; i <= 75; i++) {
      numbers.push(i);
    }
    setAvailableNumbers(numbers);
  }, []);

  const drawNumber = useCallback(() => {
    if (availableNumbers.length === 0) return;

    const randomIndex = Math.floor(Math.random() * availableNumbers.length);
    const drawnNumber = availableNumbers[randomIndex];

    setDrawnNumbers((prev) => [drawnNumber, ...prev.slice(0, 3)]); // Keep only last 4
    setAvailableNumbers((prev) => prev.filter((num) => num !== drawnNumber));
  }, [availableNumbers]);

  // Countdown timer
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsDrawing(true);
    }
  }, [timeLeft]);

  // Auto-draw numbers when game starts
  useEffect(() => {
    if (isDrawing && availableNumbers.length > 0) {
      const interval = setInterval(() => {
        drawNumber();
      }, 3000); // Draw a number every 3 seconds

      return () => clearInterval(interval);
    }
  }, [isDrawing, availableNumbers, drawNumber]);

  // Generate Bingo card numbers (1-75) - for future use
  // const generateBingoNumbers = () => {
  //   const numbers = [];
  //   for (let i = 1; i <= 75; i++) {
  //     numbers.push(i);
  //   }
  //   return numbers;
  // };

  // Generate Bingo card grid with fixed numbers
  const generateBingoCard = (cardNumbers: number[]) => {
    const card = [];
    const letters = ["B", "I", "N", "G", "O"];

    for (let letterIndex = 0; letterIndex < 5; letterIndex++) {
      const letter = letters[letterIndex];
      const row = [];

      for (let col = 0; col < 5; col++) {
        const numberIndex = letterIndex * 5 + col;
        const number = cardNumbers[numberIndex];
        const isDrawn = drawnNumbers.includes(number);

        if (letterIndex === 2 && col === 2) {
          // Center square with star
          row.push(
            <div
              key={`${letter}-${col}`}
              className="w-8 h-8 flex items-center justify-center"
            >
              <Star className="h-4 w-4 text-green-500" />
            </div>
          );
        } else {
          row.push(
            <div
              key={`${letter}-${col}`}
              className={`w-8 h-8 flex items-center justify-center text-xs font-medium rounded ${
                isDrawn
                  ? "bg-blue-500 text-white"
                  : actualTheme === "dark"
                  ? "bg-slate-800 text-white"
                  : "bg-slate-200 text-slate-800"
              }`}
            >
              {number}
            </div>
          );
        }
      }

      card.push(
        <div key={letter} className="flex gap-1">
          <div className="w-8 h-8 flex items-center justify-center text-xs font-bold text-yellow-400">
            {letter}
          </div>
          {row}
        </div>
      );
    }

    return card;
  };

  // Generate fixed card numbers for demonstration
  const leftCardNumbers = [
    5, 10, 13, 12, 11, 22, 24, 28, 19, 29, 38, 39, 0, 41, 32, 58, 46, 56, 60,
    59, 74, 75, 62, 67, 64,
  ];
  const rightCardNumbers = [
    1, 15, 23, 31, 44, 7, 18, 25, 33, 47, 9, 20, 0, 35, 50, 12, 26, 37, 48, 61,
    14, 27, 40, 52, 66,
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
            <X className="h-5 w-5" />
          </Button>
          <span
            className={`font-medium ${
              actualTheme === "dark" ? "text-white" : "text-slate-800"
            }`}
          >
            Close
          </span>
        </div>

        <h1
          className={`text-lg font-semibold ${
            actualTheme === "dark" ? "text-white" : "text-slate-800"
          }`}
        >
          Waiting for others to j...
        </h1>

        <div className="flex items-center gap-2">
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
          <Button
            variant="ghost"
            size="icon"
            className={`${
              actualTheme === "dark"
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
        <div className="grid grid-cols-4 gap-3">
          {/* Derash */}
          <Card className="bg-blue-500 border-0">
            <CardContent className="p-3">
              <div className="text-white text-xs opacity-90">Derash</div>
              <div className="text-white text-sm font-semibold">304</div>
            </CardContent>
          </Card>

          {/* Stake */}
          <Card className="bg-orange-500 border-0">
            <CardContent className="p-3">
              <div className="text-white text-xs opacity-90">Stake</div>
              <div className="text-white text-sm font-semibold">10</div>
            </CardContent>
          </Card>

          {/* Calls */}
          <Card className="bg-red-500 border-0">
            <CardContent className="p-3">
              <div className="text-white text-xs opacity-90">Calls</div>
              <div className="text-white text-sm font-semibold">
                {drawnNumbers.length}
              </div>
            </CardContent>
          </Card>

          {/* Game Timer */}
          <Card className="bg-red-500 border-0">
            <CardContent className="p-3">
              <div className="text-white text-xs opacity-90">
                Game starts in
              </div>
              <div className="text-white text-lg font-bold">{timeLeft}</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Calls */}
      <div className="relative z-10 px-4 sm:px-6 mb-6">
        <h2
          className={`text-lg font-semibold mb-3 ${
            actualTheme === "dark" ? "text-white" : "text-slate-800"
          }`}
        >
          Recent Calls
        </h2>
        <Card
          className={`${
            actualTheme === "dark"
              ? "bg-slate-800 border-slate-700"
              : "bg-white border-slate-200"
          }`}
        >
          <CardContent className="p-4">
            {drawnNumbers.length === 0 ? (
              <div
                className={`text-center ${
                  actualTheme === "dark" ? "text-slate-400" : "text-slate-600"
                }`}
              >
                No recent calls
              </div>
            ) : (
              <div className="flex gap-2 flex-wrap">
                {drawnNumbers.map((number) => (
                  <div
                    key={number}
                    className="w-8 h-8 bg-blue-500 text-white rounded flex items-center justify-center text-sm font-bold"
                  >
                    {number}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Bingo Cards */}
      <div className="relative z-10 px-4 sm:px-6 mb-6">
        <div className="grid grid-cols-2 gap-4">
          {/* Left Bingo Card */}
          <div className="space-y-1">{generateBingoCard(leftCardNumbers)}</div>

          {/* Right Bingo Card */}
          <div className="space-y-1">
            {generateBingoCard(rightCardNumbers)}
            <div
              className={`text-center text-sm mt-2 ${
                actualTheme === "dark" ? "text-slate-400" : "text-slate-600"
              }`}
            >
              Board 35
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="relative z-10 px-4 sm:px-6 pb-24 flex gap-3">
        <Button
          className={`flex-1 py-4 text-lg font-semibold ${
            actualTheme === "dark"
              ? "bg-white text-black hover:bg-slate-100"
              : "bg-white text-slate-800 hover:bg-slate-100"
          }`}
        >
          Leave
        </Button>
        <Button
          onClick={drawNumber}
          className="flex-1 bg-green-500 hover:bg-green-600 text-white py-4 text-lg font-semibold"
        >
          Draw Number
        </Button>
        <Button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-4 text-lg font-semibold">
          Bingo!
        </Button>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <BottomNavigation
          activeTab={t("navigation.play")}
          onTabChange={onTabChange}
        />
      </div>
    </div>
  );
}
