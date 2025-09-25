"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  RefreshCw,
  User,
  Moon,
  Globe,
  ChevronRight,
} from "lucide-react";
import { useLanguage } from "@/i18n";
import { useTheme } from "@/contexts/ThemeContext";
import LanguageDialog from "./LanguageDialog";
import AppearanceDialog from "./AppearanceDialog";
import BottomNavigation from "./BottomNavigation";
import { useState } from "react";

interface SettingsPageProps {
  onBack: () => void;
  onTabChange?: (tab: string) => void;
}

export default function SettingsPage({
  onBack,
  onTabChange,
}: SettingsPageProps) {
  const { t, setLanguage } = useLanguage();
  const { actualTheme, setTheme } = useTheme();
  const [isLanguageDialogOpen, setIsLanguageDialogOpen] = useState(false);
  const [isAppearanceDialogOpen, setIsAppearanceDialogOpen] = useState(false);

  const handleLanguageClick = () => {
    setIsLanguageDialogOpen(true);
  };

  const handleLanguageSelect = (selectedLanguage: string) => {
    setLanguage(selectedLanguage);
  };

  const handleAppearanceClick = () => {
    setIsAppearanceDialogOpen(true);
  };

  const handleThemeSelect = (selectedTheme: string) => {
    setTheme(selectedTheme as "light" | "dark" | "system");
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
          {t("common.settings")}
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

      {/* User Profile Section */}
      <div className="relative z-10 px-4 sm:px-6 mb-6">
        <Card
          className={`${
            actualTheme === "dark"
              ? "bg-slate-800 border-slate-700"
              : "bg-white border-slate-200"
          }`}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold text-lg">
                  AZ
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3
                    className={`text-lg font-semibold ${
                      actualTheme === "dark" ? "text-white" : "text-slate-800"
                    }`}
                  >
                    Azina
                  </h3>
                  <Badge className="bg-green-500 text-white text-xs">
                    Profile
                  </Badge>
                </div>
                <p
                  className={`text-sm ${
                    actualTheme === "dark" ? "text-slate-400" : "text-slate-600"
                  }`}
                >
                  251920589426
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Preferences Section */}
      <div className="relative z-10 px-4 sm:px-6 mb-6 pb-24">
        <h2
          className={`text-sm font-medium mb-4 ${
            actualTheme === "dark" ? "text-slate-400" : "text-slate-600"
          }`}
        >
          Preferences
        </h2>

        <div className="space-y-2">
          {/* Profile Option */}
          <Card
            className={`${
              actualTheme === "dark"
                ? "bg-slate-800 border-slate-700 hover:bg-slate-700"
                : "bg-white border-slate-200 hover:bg-slate-50"
            } cursor-pointer transition-colors`}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3
                    className={`font-medium ${
                      actualTheme === "dark" ? "text-white" : "text-slate-800"
                    }`}
                  >
                    Profile
                  </h3>
                  <p
                    className={`text-sm ${
                      actualTheme === "dark"
                        ? "text-slate-400"
                        : "text-slate-600"
                    }`}
                  >
                    Manage your account profile
                  </p>
                </div>
                <ChevronRight
                  className={`h-5 w-5 ${
                    actualTheme === "dark" ? "text-slate-400" : "text-slate-600"
                  }`}
                />
              </div>
            </CardContent>
          </Card>

          {/* Appearance Option */}
          <Card
            className={`${
              actualTheme === "dark"
                ? "bg-slate-800 border-slate-700 hover:bg-slate-700"
                : "bg-white border-slate-200 hover:bg-slate-50"
            } cursor-pointer transition-colors`}
            onClick={handleAppearanceClick}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                  <Moon className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3
                    className={`font-medium ${
                      actualTheme === "dark" ? "text-white" : "text-slate-800"
                    }`}
                  >
                    Appearance
                  </h3>
                  <p
                    className={`text-sm ${
                      actualTheme === "dark"
                        ? "text-slate-400"
                        : "text-slate-600"
                    }`}
                  >
                    Toggle between light, dark and system mode
                  </p>
                </div>
                <ChevronRight
                  className={`h-5 w-5 ${
                    actualTheme === "dark" ? "text-slate-400" : "text-slate-600"
                  }`}
                />
              </div>
            </CardContent>
          </Card>

          {/* Language Option */}
          <Card
            className={`${
              actualTheme === "dark"
                ? "bg-slate-800 border-slate-700 hover:bg-slate-700"
                : "bg-white border-slate-200 hover:bg-slate-50"
            } cursor-pointer transition-colors`}
            onClick={handleLanguageClick}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <Globe className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3
                    className={`font-medium ${
                      actualTheme === "dark" ? "text-white" : "text-slate-800"
                    }`}
                  >
                    Set your preferred language
                  </h3>
                  <p
                    className={`text-sm ${
                      actualTheme === "dark"
                        ? "text-slate-400"
                        : "text-slate-600"
                    }`}
                  >
                    Set your preferred language
                  </p>
                </div>
                <ChevronRight
                  className={`h-5 w-5 ${
                    actualTheme === "dark" ? "text-slate-400" : "text-slate-600"
                  }`}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <BottomNavigation
          activeTab={t("navigation.settings")}
          onTabChange={onTabChange}
        />
      </div>

      {/* Language Dialog */}
      <LanguageDialog
        isOpen={isLanguageDialogOpen}
        onClose={() => setIsLanguageDialogOpen(false)}
        onLanguageSelect={handleLanguageSelect}
      />

      {/* Appearance Dialog */}
      <AppearanceDialog
        isOpen={isAppearanceDialogOpen}
        onClose={() => setIsAppearanceDialogOpen(false)}
        onThemeSelect={handleThemeSelect}
      />
    </div>
  );
}
