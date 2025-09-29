"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { useLanguage } from "@/i18n";
import { useTheme } from "@/contexts/ThemeContext";

interface LoginPageProps {
  onLogin: (username: string, password: string) => void;
  onRegister: () => void;
  isLoading?: boolean;
  error?: string;
}

export default function LoginPage({
  onLogin,
  onRegister,
  isLoading = false,
  error,
}: LoginPageProps) {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.username && formData.password) {
      onLogin(formData.username, formData.password);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 ${
        theme === "dark"
          ? "bg-black"
          : "bg-gradient-to-br from-slate-100 via-purple-100 to-slate-200"
      }`}
    >
      <div className="w-full max-w-md">
        <Card
          className={`border-0 shadow-2xl ${
            theme === "dark" ? "bg-slate-800" : "bg-white"
          }`}
        >
          <CardHeader className="text-center pb-6">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mb-4">
              <User className="h-8 w-8 text-white" />
            </div>
            <CardTitle
              className={`text-2xl font-bold ${
                theme === "dark" ? "text-white" : "text-slate-800"
              }`}
            >
              {t("login.welcome")}
            </CardTitle>
            <p
              className={`text-sm ${
                theme === "dark" ? "text-slate-400" : "text-slate-600"
              }`}
            >
              {t("login.subtitle")}
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label
                  htmlFor="username"
                  className={`text-sm font-medium ${
                    theme === "dark" ? "text-slate-300" : "text-slate-700"
                  }`}
                >
                  {t("login.username")}
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="username"
                    type="text"
                    placeholder={t("login.usernamePlaceholder")}
                    value={formData.username}
                    onChange={(e) =>
                      handleInputChange("username", e.target.value)
                    }
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className={`text-sm font-medium ${
                    theme === "dark" ? "text-slate-300" : "text-slate-700"
                  }`}
                >
                  {t("login.password")}
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder={t("login.passwordPlaceholder")}
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    className="pl-10 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-slate-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-slate-400" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="rounded border-slate-300 text-yellow-500 focus:ring-yellow-500"
                  />
                  <span
                    className={`${
                      theme === "dark" ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    {t("login.rememberMe")}
                  </span>
                </label>
                <button
                  type="button"
                  className="text-yellow-500 hover:text-yellow-600 font-medium"
                >
                  {t("login.forgotPassword")}
                </button>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-semibold py-2"
                disabled={isLoading || !formData.username || !formData.password}
              >
                {isLoading ? t("login.loggingIn") : t("login.login")}
              </Button>

              <div className="text-center">
                <span
                  className={`text-sm ${
                    theme === "dark" ? "text-slate-400" : "text-slate-600"
                  }`}
                >
                  {t("login.noAccount")}{" "}
                </span>
                <button
                  type="button"
                  onClick={onRegister}
                  className="text-yellow-500 hover:text-yellow-600 font-medium text-sm"
                >
                  {t("login.register")}
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
