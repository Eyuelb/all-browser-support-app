"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X, Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

interface AppearanceDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onThemeSelect: (theme: string) => void;
}

export default function AppearanceDialog({
  isOpen,
  onClose,
  onThemeSelect,
}: AppearanceDialogProps) {
  const { theme, actualTheme } = useTheme();

  if (!isOpen) return null;

  const themes = [
    {
      code: "light",
      name: "Light",
      icon: Sun,
      description: "",
    },
    {
      code: "dark",
      name: "Dark",
      icon: Moon,
      description: "",
    },
    {
      code: "system",
      name: "System",
      icon: Monitor,
      description: "Follows system theme mode",
    },
  ];

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center">
      {/* Backdrop */}
      <button
        type="button"
        className="absolute inset-0 bg-black/50 w-full h-full"
        onClick={onClose}
        onKeyDown={(e) => e.key === "Escape" && onClose()}
        aria-label="Close dialog"
      />

      {/* Dialog */}
      <div className="relative w-full max-w-sm mx-4 mb-4">
        <Card
          className={`${
            actualTheme === "dark"
              ? "bg-slate-800 border-slate-700"
              : "bg-white border-slate-200"
          }`}
        >
          <CardContent className="p-0">
            {/* Header */}
            <div
              className={`flex items-center justify-between p-4 border-b ${
                actualTheme === "dark" ? "border-slate-700" : "border-slate-200"
              }`}
            >
              <h3
                className={`text-lg font-semibold ${
                  actualTheme === "dark" ? "text-white" : "text-slate-800"
                }`}
              >
                Appearance
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className={`${
                  actualTheme === "dark"
                    ? "text-white hover:bg-white/10"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Theme Options */}
            <div className="p-4">
              {themes.map((themeOption) => (
                <button
                  key={themeOption.code}
                  type="button"
                  className={`w-full flex items-center justify-between py-3 px-2 rounded-lg cursor-pointer transition-colors ${
                    theme === themeOption.code
                      ? actualTheme === "dark"
                        ? "bg-slate-700"
                        : "bg-slate-100"
                      : "hover:bg-slate-50 dark:hover:bg-slate-700"
                  }`}
                  onClick={() => {
                    onThemeSelect(themeOption.code);
                    onClose();
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        theme === themeOption.code
                          ? "border-red-500 bg-red-500"
                          : actualTheme === "dark"
                          ? "border-slate-400"
                          : "border-slate-300"
                      }`}
                    >
                      {theme === themeOption.code && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <themeOption.icon
                        className={`h-5 w-5 ${
                          actualTheme === "dark"
                            ? "text-slate-400"
                            : "text-slate-600"
                        }`}
                      />
                      <div>
                        <div
                          className={`font-medium ${
                            actualTheme === "dark"
                              ? "text-white"
                              : "text-slate-800"
                          }`}
                        >
                          {themeOption.name}
                        </div>
                        {themeOption.description && (
                          <div
                            className={`text-sm ${
                              actualTheme === "dark"
                                ? "text-slate-400"
                                : "text-slate-600"
                            }`}
                          >
                            {themeOption.description}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
