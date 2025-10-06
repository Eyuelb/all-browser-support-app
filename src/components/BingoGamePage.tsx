"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X, RefreshCw, VolumeX, Star } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import BottomNavigation from "./BottomNavigation";
import { useTranslations } from "next-intl";

interface BingoGamePageProps {
  onBack: () => void;
  onTabChange?: (tab: string) => void;
}

export default function BingoGamePage({
  onBack,
  onTabChange,
}: BingoGamePageProps) {
  const t = useTranslations();
  const { actualTheme } = useTheme();
  const [timeLeft, setTimeLeft] = useState(27); // 27 seconds countdown
  const [drawnNumbers, setDrawnNumbers] = useState<number[]>([]);
  const [availableNumbers, setAvailableNumbers] = useState<number[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // Initialize available numbers (1-75)
  useEffect(() => {
    const numbers = [];
    for (let i = 1; i <= 75; i++) {
      numbers.push(i);
    }
    setAvailableNumbers(numbers);
  }, []);

  // Handle window resize for responsive layout
  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    // Check on mount
    checkIsDesktop();

    // Add event listener
    window.addEventListener("resize", checkIsDesktop);

    // Cleanup
    return () => window.removeEventListener("resize", checkIsDesktop);
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

  // Generate drawable numbers grid (1-75) - shows which numbers have been called
  const generateDrawableNumbers = () => {
    const rows = [];

    // On desktop (lg and above), create horizontal layout with 5 rows and 15 columns
    // On mobile/tablet, keep vertical layout with 5 columns and 15 rows
    if (isDesktop) {
      // Horizontal layout: 5 rows (BINGO) with 15 numbers each
      for (let row = 0; row < 5; row++) {
        const rowCells = [];
        for (let col = 0; col < 15; col++) {
          const number = row * 15 + col + 1;
          const isDrawn = drawnNumbers.includes(number);

          rowCells.push(
            <div
              key={`${row}-${col}`}
              className={`w-5 h-5 sm:w-6 sm:h-6 lg:w-10 lg:h-10 flex items-center justify-center text-xs sm:text-sm lg:text-base font-medium rounded border transition-all duration-300 ${
                isDrawn
                  ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white border-blue-400 shadow-md scale-105"
                  : actualTheme === "dark"
                  ? "bg-slate-800 text-white border-slate-700 hover:bg-slate-750"
                  : "bg-slate-700 text-white border-slate-600 hover:bg-slate-650"
              }`}
              style={{
                width: `calc(${100 / 15}% - 0.25rem)`,
                minWidth: "1.25rem",
              }}
            >
              {number}
            </div>
          );
        }
        rows.push(
          <div key={row} className="flex gap-0.5 sm:gap-1">
            {rowCells}
          </div>
        );
      }
    } else {
      // Vertical layout: 15 rows with 5 numbers each (original layout)
      for (let row = 0; row < 15; row++) {
        const rowCells = [];
        for (let col = 0; col < 5; col++) {
          const number = col * 15 + row + 1;
          const isDrawn = drawnNumbers.includes(number);

          rowCells.push(
            <div
              key={`${col}-${row}`}
              className={`w-5 h-5 sm:w-6 sm:h-6 lg:w-10 lg:h-10 flex items-center justify-center text-xs sm:text-sm lg:text-base font-medium rounded border transition-all duration-300 ${
                isDrawn
                  ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white border-blue-400 shadow-md scale-105"
                  : actualTheme === "dark"
                  ? "bg-slate-800 text-white border-slate-700 hover:bg-slate-750"
                  : "bg-slate-700 text-white border-slate-600 hover:bg-slate-650"
              }`}
              style={{
                width: `calc(${100 / 5}% - 0.5rem)`,
                minWidth: "1.25rem",
              }}
            >
              {number}
            </div>
          );
        }
        rows.push(
          <div key={row} className="flex gap-0.5 sm:gap-1">
            {rowCells}
          </div>
        );
      }
    }
    return rows;
  };

  // Get color for BINGO letter badges
  const getBingoLetterColor = (letter: string) => {
    switch (letter) {
      case "B":
        return "bg-blue-500";
      case "I":
        return "bg-pink-500";
      case "N":
        return "bg-purple-500";
      case "G":
        return "bg-green-500";
      case "O":
        return "bg-orange-500";
      default:
        return "bg-gray-500";
    }
  };

  // Generate player's Bingo Card (Board 35) - 5x5 grid with specific numbers
  const generatePlayerBingoCard = () => {
    // B: 1-15, I: 16-30, N: 31-45, G: 46-60, O: 61-75
    const cardNumbers = [
      [5, 10, 13, 12, 11], // B column
      [22, 24, 28, 19, 29], // I column
      [38, 39, 0, 41, 32], // N column (0 = FREE space)
      [58, 46, 56, 60, 59], // G column
      [74, 75, 62, 67, 64], // O column
    ];

    const card = [];

    for (let row = 0; row < 5; row++) {
      const rowCells = [];
      for (let col = 0; col < 5; col++) {
        const number = cardNumbers[col][row];
        const isDrawn = number !== 0 && drawnNumbers.includes(number);
        const isFree = number === 0;

        rowCells.push(
          <div
            key={`${col}-${row}`}
            className={`w-10 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12 flex items-center justify-center text-sm sm:text-base lg:text-lg font-bold rounded transition-all duration-500 ${
              isFree
                ? "bg-gradient-to-br from-green-400 to-green-600 text-white shadow-lg"
                : isDrawn
                ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg scale-110 animate-pulse"
                : actualTheme === "dark"
                ? "bg-slate-700 text-white border border-slate-600 hover:bg-slate-650"
                : "bg-slate-800 text-white border border-slate-700 hover:bg-slate-750"
            }`}
            style={{
              width: `calc(${100 / 5}% - 0.5rem)`,
              minWidth: "1.5rem",
            }}
          >
            {isFree ? (
              <Star
                className="h-3 w-3 sm:h-4 sm:w-4 lg:h-6 lg:w-6 animate-spin"
                style={{ animationDuration: "3s" }}
              />
            ) : (
              number
            )}
          </div>
        );
      }
      card.push(
        <div key={row} className="flex gap-0.5 sm:gap-1">
          {rowCells}
        </div>
      );
    }

    return card;
  };

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
          className={`text-sm sm:text-lg font-semibold truncate max-w-[200px] sm:max-w-none ${
            actualTheme === "dark" ? "text-white" : "text-slate-800"
          }`}
        >
          Waiting for others to join...
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
        <div className="grid grid-cols-3 gap-3">
          {/* Derash */}
          <Card className="bg-blue-500 border-0">
            <CardContent className="p-3">
              <div className="text-white text-xs opacity-90">Derash</div>
              <div className="text-white text-xl font-bold">304</div>
            </CardContent>
          </Card>

          {/* Stake */}
          <Card className="bg-orange-500 border-0">
            <CardContent className="p-3">
              <div className="text-white text-xs opacity-90">Stake</div>
              <div className="text-white text-xl font-bold">10</div>
            </CardContent>
          </Card>

          {/* Calls */}
          <Card className="bg-pink-500 border-0">
            <CardContent className="p-3">
              <div className="text-white text-xs opacity-90">Calls</div>
              <div className="text-white text-xl font-bold">-</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Game Area */}
      <div className="relative z-10 px-2 sm:px-4 lg:px-6 mb-6">
        {/* Mobile Layout - Side by side with recent calls under card */}
        <div className="flex flex-row gap-2 sm:gap-4 lg:hidden">
          {/* Left: Drawable Numbers (1-75) with BINGO header */}
          <div className="flex-shrink-0 w-1/2">
            {/* BINGO Letters and Numbers Grid - Aligned properly */}
            <div className="flex flex-col gap-2">
              {/* BINGO Letters - Aligned with number columns */}
              <div className="flex gap-1 sm:gap-2 mb-2">
                {["B", "I", "N", "G", "O"].map((letter) => (
                  <div
                    key={letter}
                    className={`w-6 h-6 sm:w-8 sm:h-8 lg:w-20 lg:h-20 ${getBingoLetterColor(
                      letter
                    )} text-white rounded flex items-center justify-center text-sm sm:text-base lg:text-lg font-bold shadow-lg`}
                    style={{
                      width: `calc(${100 / 5}% - 0.5rem)`,
                      minWidth: "1.5rem",
                    }}
                  >
                    {letter}
                  </div>
                ))}
              </div>
              {/* Numbers 1-75 Grid */}
              <div className="space-y-1">{generateDrawableNumbers()}</div>
            </div>
          </div>

          {/* Right: Player's Bingo Card (Board 35) - Now positioned alongside the drawn numbers */}
          <div className="flex-1 w-1/2 flex flex-col items-center">
            {/* Board Card Section */}
            <div className="w-full">
              {/* BINGO Letters for Player Card */}
              <div className="flex gap-1 sm:gap-2 mb-2">
                {["B", "I", "N", "G", "O"].map((letter) => (
                  <div
                    key={letter}
                    className={`w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12 ${getBingoLetterColor(
                      letter
                    )} text-white rounded flex items-center justify-center text-sm sm:text-base lg:text-lg font-bold shadow-md`}
                    style={{
                      width: `calc(${100 / 5}% - 0.5rem)`,
                      minWidth: "1.5rem",
                    }}
                  >
                    {letter}
                  </div>
                ))}
              </div>

              {/* Player's 5x5 Bingo Card */}
              <div className="space-y-1 mb-2">{generatePlayerBingoCard()}</div>
              <div
                className={`text-center text-sm sm:text-base font-semibold mb-3 ${
                  actualTheme === "dark" ? "text-slate-400" : "text-slate-600"
                }`}
              >
                Board 35
              </div>

              {/* Recent Calls - Now positioned under the selected card */}
              <div className="w-full">
                <h3
                  className={`text-xs sm:text-sm font-semibold mb-2 text-center ${
                    actualTheme === "dark" ? "text-white" : "text-slate-800"
                  }`}
                >
                  Recent Calls
                </h3>
                <div className="bg-slate-900/80 rounded-lg p-2 min-h-[60px] flex items-center justify-center">
                  {drawnNumbers.length === 0 ? (
                    <div className="text-center text-slate-400 text-xs">
                      No recent calls
                    </div>
                  ) : (
                    <div className="flex gap-1.5 flex-wrap justify-center">
                      {drawnNumbers.slice(0, 5).map((number, index) => {
                        const ballColors = [
                          {
                            bg: "from-yellow-300 via-yellow-400 to-yellow-600",
                            shadow: "rgba(234, 179, 8, 0.6)",
                          },
                          {
                            bg: "from-blue-400 via-blue-500 to-blue-700",
                            shadow: "rgba(59, 130, 246, 0.6)",
                          },
                          {
                            bg: "from-red-400 via-red-500 to-red-700",
                            shadow: "rgba(239, 68, 68, 0.6)",
                          },
                          {
                            bg: "from-purple-400 via-purple-500 to-purple-700",
                            shadow: "rgba(168, 85, 247, 0.6)",
                          },
                          {
                            bg: "from-green-400 via-green-500 to-green-700",
                            shadow: "rgba(34, 197, 94, 0.6)",
                          },
                        ];
                        const colorSet = ballColors[index % ballColors.length];

                        return (
                          <div
                            key={number}
                            className={`pool-ball w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-xs relative bg-gradient-to-br ${colorSet.bg}`}
                            style={{
                              boxShadow: `0 4px 8px ${colorSet.shadow}, inset 0 -2px 4px rgba(0, 0, 0, 0.3)`,
                            }}
                          >
                            <div
                              className="absolute inset-0 rounded-full opacity-40"
                              style={{
                                background:
                                  "radial-gradient(circle at 35% 35%, rgba(255, 255, 255, 0.9) 0%, transparent 50%)",
                              }}
                            />
                            <span className="relative z-10">{number}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout - Original layout with timer and recent calls below */}
        <div className="hidden lg:flex flex-col lg:flex-row gap-4 lg:gap-6">
          {/* Left: Drawable Numbers (1-75) with BINGO header */}
          <div className="flex-shrink-0">
            {/* BINGO Letters and Numbers Grid - Aligned properly */}
            <div className="flex flex-col gap-2">
              {/* BINGO Letters - Horizontal header row aligned with number rows */}
              <div className="flex gap-0.5 sm:gap-1 justify-center">
                {["B", "I", "N", "G", "O"].map((letter) => (
                  <div
                    key={letter}
                    className={`w-5 h-5 sm:w-6 sm:h-6 lg:w-10 lg:h-10 ${getBingoLetterColor(
                      letter
                    )} text-white rounded flex items-center justify-center text-xs sm:text-sm font-bold shadow-lg`}
                    style={{
                      width: `calc(${100 / 5}% - 0.25rem)`,
                      minWidth: "1.25rem",
                    }}
                  >
                    {letter}
                  </div>
                ))}
              </div>
              {/* Numbers 1-75 Grid */}
              <div className="space-y-1">{generateDrawableNumbers()}</div>
            </div>
          </div>

          {/* Right: Player's Bingo Card (Board 35) and Timer */}
          <div className="flex-1 flex flex-col items-center">
            {/* Timer and Board Card Container */}
            <div className="flex items-start gap-4 w-full justify-center">
              {/* Circular Timer - Now positioned next to the board card */}
              {timeLeft > 0 && (
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center relative shadow-xl animate-pulse">
                    <div className="text-center">
                      <div className="text-white text-[10px] sm:text-xs">
                        Game starts in
                      </div>
                      <div className="text-white text-xl sm:text-2xl lg:text-3xl font-bold">
                        {timeLeft}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Board Card Section */}
              <div className="flex-1 max-w-sm">
                {/* BINGO Letters for Player Card */}
                <div className="flex gap-0.5 sm:gap-1 mb-2">
                  {["B", "I", "N", "G", "O"].map((letter) => (
                    <div
                      key={letter}
                      className={`w-8 h-6 sm:w-11 sm:h-8 ${getBingoLetterColor(
                        letter
                      )} text-white rounded flex items-center justify-center text-xs font-bold shadow-md`}
                      style={{
                        width: `calc(${100 / 5}% - 0.5rem)`,
                        minWidth: "1.5rem",
                      }}
                    >
                      {letter}
                    </div>
                  ))}
                </div>

                {/* Player's 5x5 Bingo Card */}
                <div className="space-y-1 mb-2">
                  {generatePlayerBingoCard()}
                </div>
                <div
                  className={`text-center text-sm font-semibold mb-3 ${
                    actualTheme === "dark" ? "text-slate-400" : "text-slate-600"
                  }`}
                >
                  Board 35
                </div>

                {/* Recent Calls - Pool Ball Style - Now positioned under the board card */}
                <div className="hidden sm:block">
                  <h3
                    className={`text-sm font-semibold mb-3 text-center ${
                      actualTheme === "dark" ? "text-white" : "text-slate-800"
                    }`}
                  >
                    Recent Calls
                  </h3>
                  <div className="flex gap-3 justify-center overflow-x-auto pb-3 pt-2 px-2 scrollbar-hide">
                    {drawnNumbers.length === 0 ? (
                      <div className="text-center text-slate-400 text-xs py-2">
                        No calls yet
                      </div>
                    ) : (
                      drawnNumbers.slice(0, 10).map((number, index) => {
                        const ballColors = [
                          {
                            bg: "from-yellow-300 via-yellow-400 to-yellow-600",
                            shadow: "rgba(234, 179, 8, 0.6)",
                          },
                          {
                            bg: "from-blue-400 via-blue-500 to-blue-700",
                            shadow: "rgba(59, 130, 246, 0.6)",
                          },
                          {
                            bg: "from-red-400 via-red-500 to-red-700",
                            shadow: "rgba(239, 68, 68, 0.6)",
                          },
                          {
                            bg: "from-purple-400 via-purple-500 to-purple-700",
                            shadow: "rgba(168, 85, 247, 0.6)",
                          },
                          {
                            bg: "from-green-400 via-green-500 to-green-700",
                            shadow: "rgba(34, 197, 94, 0.6)",
                          },
                          {
                            bg: "from-orange-400 via-orange-500 to-orange-700",
                            shadow: "rgba(249, 115, 22, 0.6)",
                          },
                          {
                            bg: "from-pink-400 via-pink-500 to-pink-700",
                            shadow: "rgba(236, 72, 153, 0.6)",
                          },
                          {
                            bg: "from-cyan-400 via-cyan-500 to-cyan-700",
                            shadow: "rgba(6, 182, 212, 0.6)",
                          },
                          {
                            bg: "from-indigo-400 via-indigo-500 to-indigo-700",
                            shadow: "rgba(99, 102, 241, 0.6)",
                          },
                          {
                            bg: "from-teal-400 via-teal-500 to-teal-700",
                            shadow: "rgba(20, 184, 166, 0.6)",
                          },
                        ];
                        const colorSet = ballColors[index % ballColors.length];

                        return (
                          <div
                            key={number}
                            className={`pool-ball flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold text-white transform transition-all duration-500 relative ${
                              index === 0
                                ? "scale-110 animate-bounce"
                                : "scale-100"
                            }`}
                            style={{
                              animation:
                                index === 0
                                  ? "popIn 0.5s ease-out, float 2s ease-in-out infinite"
                                  : "fadeIn 0.3s ease-out",
                              animationDelay: `${index * 50}ms`,
                              background: `radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8), transparent 50%), 
                                       linear-gradient(135deg, var(--tw-gradient-stops))`,
                              boxShadow: `
                            0 8px 16px ${colorSet.shadow},
                            0 4px 8px rgba(0, 0, 0, 0.3),
                            inset 0 -4px 8px rgba(0, 0, 0, 0.4),
                            inset 0 2px 4px rgba(255, 255, 255, 0.3),
                            inset -2px -2px 8px rgba(0, 0, 0, 0.3)
                          `,
                            }}
                          >
                            {/* Glossy highlight overlay */}
                            <div
                              className="absolute inset-0 rounded-full opacity-40"
                              style={{
                                background:
                                  "radial-gradient(circle at 35% 35%, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.4) 20%, transparent 50%)",
                                pointerEvents: "none",
                              }}
                            />

                            {/* Color gradient */}
                            <div
                              className={`absolute inset-0 rounded-full bg-gradient-to-br ${colorSet.bg}`}
                              style={{ zIndex: -1 }}
                            />

                            {/* Number */}
                            <div
                              className="text-center relative z-10"
                              style={{
                                textShadow:
                                  "0 2px 4px rgba(0, 0, 0, 0.5), 0 1px 2px rgba(0, 0, 0, 0.3)",
                              }}
                            >
                              <div
                                className={
                                  index === 0
                                    ? "text-base sm:text-lg font-black"
                                    : "text-sm sm:text-base font-bold"
                                }
                              >
                                {number}
                              </div>
                              {index === 0 && (
                                <div className="text-[7px] -mt-1 opacity-90 font-semibold">
                                  NEW
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Timer Section - Only for mobile (desktop has its own timer) */}
        {timeLeft > 0 && (
          <div className="flex justify-center mt-4 lg:hidden">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center relative shadow-xl animate-pulse">
                <div className="text-center">
                  <div className="text-white text-[10px] sm:text-xs">
                    Game starts in
                  </div>
                  <div className="text-white text-xl sm:text-2xl font-bold">
                    {timeLeft}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes popIn {
          0% {
            transform: scale(0) rotate(0deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.2) rotate(180deg);
          }
          100% {
            transform: scale(1) rotate(360deg);
            opacity: 1;
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) scale(1.1);
          }
          50% {
            transform: translateY(-8px) scale(1.1);
          }
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .pool-ball {
          position: relative;
          overflow: hidden;
        }
        .pool-ball::before {
          content: "";
          position: absolute;
          top: 10%;
          left: 15%;
          width: 40%;
          height: 40%;
          background: radial-gradient(
            circle,
            rgba(255, 255, 255, 0.6) 0%,
            transparent 70%
          );
          border-radius: 50%;
          filter: blur(4px);
          pointer-events: none;
        }
      `}</style>

      {/* Action Buttons */}
      <div className="relative z-10 px-4 sm:px-6 pb-20 sm:pb-24 flex gap-3">
        <Button
          onClick={onBack}
          className={`flex-1 py-3 sm:py-4 lg:py-6 text-sm sm:text-base lg:text-lg font-semibold rounded-xl transition-all duration-300 ${
            actualTheme === "dark"
              ? "bg-slate-200 text-slate-800 hover:bg-slate-300 hover:scale-105"
              : "bg-slate-200 text-slate-800 hover:bg-slate-300 hover:scale-105"
          }`}
        >
          Leave
        </Button>
        <Button className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-3 sm:py-4 lg:py-6 text-sm sm:text-base lg:text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
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
