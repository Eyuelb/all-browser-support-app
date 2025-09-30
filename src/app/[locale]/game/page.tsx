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
import { useTranslations } from "next-intl";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";
import LoginPage from "@/components/LoginPage";

export default function Home() {
  const t = useTranslations();
  const { theme } = useTheme();
  const { isAuthenticated, isLoading, login, error } = useAuth();
  const [currentPage, setCurrentPage] = useState<
    "home" | "card-selection" | "bingo-game" | "settings" | "wallet"
  >("home");
  const [selectedGameMode, setSelectedGameMode] = useState<{
    name: string;
    price: string;
    color: string;
  } | null>(null);

  const handleLogin = async (username: string, password: string) => {
    await login(username, password);
  };

  const handleRegister = () => {
    // For now, just show an alert. In a real app, you'd navigate to a register page
    alert("Registration feature coming soon!");
  };

  // Show loading state
  if (isLoading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          theme === "dark"
            ? "bg-black"
            : "bg-gradient-to-br from-slate-100 via-purple-100 to-slate-200"
        }`}
      >
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p
            className={`${theme === "dark" ? "text-white" : "text-slate-800"}`}
          >
            Loading...
          </p>
        </div>
      </div>
    );
  }

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return (
      <LoginPage
        onLogin={handleLogin}
        onRegister={handleRegister}
        isLoading={isLoading}
        error={error || undefined}
      />
    );
  }

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
          <BalanceCard currency="Birr" />
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
