"use client";

import { useState } from "react";
import { Button } from "@/app/[locale]/auth/components/ui/button";
import { Input } from "@/app/[locale]/auth/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/app/[locale]/auth/components/ui/card";
import { Eye, EyeOff, Zap } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/app/[locale]/auth/components/LanguageSwitcher";
import { useSignIn } from "@/query/auth";
import { TLoginArg } from "@/models/auth";

interface AuthFormsProps {
  type: "login" | "register";
  tittle: string;
}

export default function AuthForms({ type, tittle }: AuthFormsProps) {
  const t = useTranslations("login");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { mutateAsync, isPending } = useSignIn();

  const onSubmit = async (formData: TLoginArg) => {
    await mutateAsync(formData)
      .then(async (formData) => {
        if (formData.user && "roles" in formData.user) {
          delete formData.user.roles;
        }
        formData.user["roles"] = [];
        const session = {
          account: undefined,
          user: {
            id: formData.user.id,
            email: formData.user.email,
            active: formData.user.active,
            locale: formData.user.locale,
          },
          token: {
            access_token: formData.access_token,
            refresh_token: formData.refresh_token,
          },
        };
        // Session handling removed - implement as needed
        const redirectUrl = "/";
        setTimeout(() => {
          if (typeof window !== "undefined") {
            window.location.href = redirectUrl;
          }
        }, 1000);
      })
      .catch((error: any) => {
        const message = error?.message;
        // setError("root", {
        //   message: message ?? "Invalid Credentials",
        //   type: "validate",
        // });
      });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your authentication logic here
  };

  return (
    <div className="auth-page min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 flex items-center justify-center p-4 relative">
      {/* Language Switcher */}
      <div className="absolute top-4 right-4 z-20">
        <LanguageSwitcher />
      </div>

      {/* Grid pattern background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 165, 0, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 165, 0, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
        }}
      />

      {/* Desktop Layout - Two Column */}
      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Branding/Info for Desktop */}
          <div className="hidden lg:block text-center lg:text-left">
            <div className="max-w-md mx-auto lg:mx-0">
              <div className="w-24 h-24 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full flex items-center justify-center mb-8 shadow-2xl mx-auto lg:mx-0">
                <Zap className="h-12 w-12 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                {t("welcomeTitle")}
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                {t("welcomeDescription")}
              </p>
              <div className="space-y-4 text-left">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span className="text-gray-600">
                    {t("features.gameModes")}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span className="text-gray-600">
                    {t("features.realTime")}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span className="text-gray-600">{t("features.prizes")}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="w-full max-w-md mx-auto lg:max-w-lg">
            <Card className="bg-white shadow-2xl border-0 rounded-2xl">
              <CardHeader className="text-center pb-8 pt-8">
                {/* Mobile/Tablet Icon */}
                <div className="lg:hidden mx-auto w-16 h-16 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full flex items-center justify-center mb-6 shadow-lg">
                  <Zap className="h-8 w-8 text-white" />
                </div>

                <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
                  {t("title")}
                </h1>
                <p className="text-gray-500 text-sm lg:text-base">
                  {t("subtitle")}
                </p>
              </CardHeader>

              <CardContent className="px-8 pb-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email/Username Field */}
                  <div className="space-y-2">
                    <Input
                      type="email"
                      placeholder={t("username")}
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className="h-12 lg:h-14 bg-gray-50 border-0 rounded-xl px-4 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-orange-400 focus:bg-white transition-all duration-200 text-base"
                      required
                    />
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder={t("password")}
                        value={formData.password}
                        onChange={(e) =>
                          handleInputChange("password", e.target.value)
                        }
                        className="h-12 lg:h-14 bg-gray-50 border-0 rounded-xl px-4 pr-12 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-orange-400 focus:bg-white transition-all duration-200 text-base"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Forgot Password Link */}
                  <div className="text-right">
                    <Link
                      href="#"
                      className="text-orange-500 hover:text-orange-600 text-sm font-medium transition-colors"
                    >
                      {t("forgotPassword")}
                    </Link>
                  </div>

                  {/* Login Button */}
                  <Button
                    disabled={isPending}
                    onClick={() => onSubmit(formData)}
                    type="submit"
                    className="w-full h-12 lg:h-14 bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] text-base"
                  >
                    {t("loginButton")}
                  </Button>

                  {/* Sign Up Link */}
                  <div className="text-center pt-4">
                    <span className="text-gray-600 text-sm">
                      {t("noAccount")}{" "}
                    </span>
                    <Link
                      href="#"
                      className="text-orange-500 hover:text-orange-600 font-medium text-sm transition-colors"
                    >
                      {t("signUp")}
                    </Link>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
