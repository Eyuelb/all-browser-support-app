"use client";

import { Button } from "@/app/[locale]/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/app/[locale]/components/ui/card";
import { AlertCircle, RefreshCw, LogOut } from "lucide-react";
import { useTranslations } from "next-intl";

interface ErrorPageProps {
  errorMessage: string;
  onRetryReload?: boolean;
  onLogout?: () => void;
  hideRetryButton?: boolean;
}

export default function ErrorPage({
  errorMessage,
  onRetryReload,
  onLogout,
  hideRetryButton = false,
}: ErrorPageProps) {
  const t = useTranslations();

  const handleRetry = () => {
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-yellow-50 p-4">
      <Card className="w-full max-w-md shadow-2xl border-0 rounded-2xl">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <AlertCircle className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">{t("ui.error")}</h2>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-center text-gray-600">{errorMessage}</p>

          <div className="flex flex-col gap-3">
            {!hideRetryButton && onRetryReload && (
              <Button
                onClick={handleRetry}
                className="w-full bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                {t("ui.retry")}
              </Button>
            )}

            {onLogout && (
              <Button
                onClick={onLogout}
                variant="outline"
                className="w-full border-orange-300 text-orange-600 hover:bg-orange-50"
              >
                <LogOut className="mr-2 h-4 w-4" />
                {t("ui.logout")}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
