"use client";

import { useState } from "react";
import {
  Header,
  BackgroundPattern,
  BalanceCard,
  InstructionsButton,
  GameModes,
  BottomNavigation,
} from "@/components";
import CardSelectionPage from "@/components/CardSelectionPage";
import BingoGamePage from "@/components/BingoGamePage";
import SettingsPage from "@/components/SettingsPage";
import WalletPage from "@/components/WalletPage";
import { useLanguage } from "@/i18n";
import { useTheme } from "@/contexts/ThemeContext";

export default function Home() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const [currentPage, setCurrentPage] = useState<
    "home" | "card-selection" | "bingo-game" | "settings" | "wallet"
  >("home");
  const [selectedGameMode, setSelectedGameMode] = useState<{
    name: string;
    price: string;
    color: string;
  } | null>(null);

  const handlePlayClick = (gameMode: {
    name: string;
    price: string;
    color: string;
  }) => {
    setSelectedGameMode(gameMode);
    setCurrentPage("card-selection");
  };

  const handleBackToHome = () => {
    setCurrentPage("home");
    setSelectedGameMode(null);
  };

  const handleStartGame = () => {
    setCurrentPage("bingo-game");
  };

  const handleTabChange = (tab: string) => {
    if (tab === t("navigation.settings")) {
      setCurrentPage("settings");
    } else if (tab === t("navigation.wallet")) {
      setCurrentPage("wallet");
    } else if (
      tab === t("navigation.play") ||
      tab === t("navigation.history") ||
      tab === t("navigation.stats")
    ) {
      setCurrentPage("home");
    }
  };

  // Show settings page
  if (currentPage === "settings") {
    return (
      <SettingsPage onBack={handleBackToHome} onTabChange={handleTabChange} />
    );
  }

  // Show wallet page
  if (currentPage === "wallet") {
    return (
      <WalletPage onBack={handleBackToHome} onTabChange={handleTabChange} />
    );
  }

  // Show bingo game page
  if (currentPage === "bingo-game") {
    return (
      <BingoGamePage onBack={handleBackToHome} onTabChange={handleTabChange} />
    );
  }

  // Show card selection page if a game mode is selected
  if (currentPage === "card-selection" && selectedGameMode) {
    return (
      <CardSelectionPage
        gameMode={selectedGameMode}
        onBack={handleBackToHome}
        onTabChange={handleTabChange}
        onStartGame={handleStartGame}
      />
    );
  }

  return (
    <div
      className={`min-h-screen relative ${
        theme === "dark"
          ? "bg-black"
          : "bg-gradient-to-br from-slate-100 via-purple-100 to-slate-200"
      }`}
    >
      <BackgroundPattern />
      <Header userName="Azina" />

      {/* Desktop-optimized content area */}
      <div className="relative z-0 px-4 sm:px-6 lg:px-8 pb-32 max-w-md mx-auto sm:max-w-2xl lg:max-w-4xl xl:max-w-6xl">
        {/* Top cards row - Wallet and Instructions side by side on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 mb-6">
          <BalanceCard balance={1200} bonus={50} currency="Birr" />
          <InstructionsButton />
        </div>

        {/* Game modes section */}
        <GameModes onPlayClick={handlePlayClick} />
      </div>

      {/* Fixed bottom elements with higher z-index */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <BottomNavigation
          activeTab={t("navigation.play")}
          onTabChange={handleTabChange}
        />
        {/* <Footer /> */}
      </div>
    </div>
  );
}
