"use client";

import { Button } from "@/components/ui/button";
import { Trophy } from "lucide-react";
import { useLanguage } from "@/i18n";

interface InstructionsButtonProps {
  onClick?: () => void;
}

export default function InstructionsButton({
  onClick,
}: InstructionsButtonProps) {
  const { t } = useLanguage();

  return (
    <Button
      className="w-full mb-8 bg-slate-800 hover:bg-slate-700 text-yellow-400 border border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-400/10"
      onClick={onClick}
    >
      <Trophy className="h-4 w-4 mr-2" />
      {t("common.instructions")}
    </Button>
  );
}
