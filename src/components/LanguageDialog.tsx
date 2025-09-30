"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "@/contexts/ThemeContext";

interface LanguageDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onLanguageSelect: (language: string) => void;
}

export default function LanguageDialog({
  isOpen,
  onClose,
  onLanguageSelect,
}: LanguageDialogProps) {
  const t = useTranslations();
  // Note: language detection needs to be implemented with next-intl
  const { theme } = useTheme();

  if (!isOpen) return null;

  const languages = [
    { code: "en", name: "English", nativeName: "English" },
    { code: "am", name: "Amharic", nativeName: "አማርኛ" },
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
            theme === "dark"
              ? "bg-slate-800 border-slate-700"
              : "bg-white border-slate-200"
          }`}
        >
          <CardContent className="p-0">
            {/* Header */}
            <div
              className={`flex items-center justify-between p-4 border-b ${
                theme === "dark" ? "border-slate-700" : "border-slate-200"
              }`}
            >
              <h3
                className={`text-lg font-semibold ${
                  theme === "dark" ? "text-white" : "text-slate-800"
                }`}
              >
                Language
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className={`${
                  theme === "dark"
                    ? "text-white hover:bg-white/10"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Language Options */}
            <div className="p-4">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  className={`w-full flex items-center justify-between py-3 px-2 rounded-lg cursor-pointer transition-colors ${
                    language === lang.code
                      ? theme === "dark"
                        ? "bg-slate-700"
                        : "bg-slate-100"
                      : "hover:bg-slate-50 dark:hover:bg-slate-700"
                  }`}
                  onClick={() => {
                    onLanguageSelect(lang.code);
                    onClose();
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        language === lang.code
                          ? "border-red-500 bg-red-500"
                          : theme === "dark"
                          ? "border-slate-400"
                          : "border-slate-300"
                      }`}
                    >
                      {language === lang.code && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                    <div>
                      <div
                        className={`font-medium ${
                          theme === "dark" ? "text-white" : "text-slate-800"
                        }`}
                      >
                        {lang.name}
                      </div>
                      <div
                        className={`text-sm ${
                          theme === "dark" ? "text-slate-400" : "text-slate-600"
                        }`}
                      >
                        {lang.nativeName}
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
