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
import { useAuth } from "@/lib/auth/auth.hooks";
import LoginPage from "@/components/LoginPage";
import { useSignIn } from "@/query/auth";
import type { TLoginRes } from "@/models/auth";

export default function Home() {
  const t = useTranslations();
  const { theme } = useTheme();
  const { session, isSignedIn } = useAuth();
  const isAuthenticated = isSignedIn && !!session?.user;

  console.log("Auth state:", {
    isSignedIn,
    session,
    isAuthenticated,
    hasUser: !!session?.user,
    userDetails: session?.user,
    tokenDetails: session?.token,
  });
  const isLoading = false; // You can add loading state if needed
  const error = null; // You can add error handling if needed
  const [currentPage, setCurrentPage] = useState<
    "home" | "card-selection" | "bingo-game" | "settings" | "wallet"
  >("home");
  const [selectedGameMode, setSelectedGameMode] = useState<{
    name: string;
    price: string;
    color: string;
  } | null>(null);

  const { setSession } = useAuth();

  const { mutateAsync } = useSignIn();

  const handleLogin = async (formData: {
    phoneNumber: string;
    password: string;
  }) => {
    await mutateAsync(formData)
      .then(async (response: TLoginRes) => {
        console.log("Login response:", response);
        if (response.currentUser && "roles" in response.currentUser) {
          delete response.currentUser.roles;
        }
        response.currentUser["roles"] = [];
        const session = {
          account: undefined,
          user: {
            id: response.currentUser.id,
            email:
              response.currentUser.email ||
              response.currentUser.phoneNumber ||
              "",
            phoneNumber: response.currentUser.phoneNumber,
            active: response.currentUser.active,
            locale: response.currentUser.locale,
          },
          token: {
            access_token: response.access_token,
            refresh_token: response.refresh_token,
          },
        };
        console.log("Setting session:", session);
        console.log("Token details:", {
          access_token: response.access_token,
          refresh_token: response.refresh_token,
        });
        await setSession(session);

        const redirectUrl = "/game";
        setTimeout(() => {
          if (typeof window !== "undefined") {
            window.location.href = redirectUrl;
          }
        }, 1000);
      })
      .catch((error: unknown) => {
        console.error("Login error:", error);
        // setError("root", {
        //   message: error?.message ?? "Invalid Credentials",
        //   type: "validate",
        // });
      });
  };

  const handleRegister = () => {
    // For now, just show an alert. In a real app, you'd navigate to a register page
    alert(t("ui.registrationComingSoon"));
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
            {t("ui.loading")}
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
