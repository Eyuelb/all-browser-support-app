"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "@/contexts/ThemeContext";

interface GameMode {
  name: string;
  price: string;
  color: string;
  ballNumber: string;
  ballColor: string;
}

interface GameModesProps {
  gameModes?: GameMode[];
  onPlayClick?: (gameMode: {
    name: string;
    price: string;
    color: string;
  }) => void;
}

const getDefaultGameModes = (t: (key: string) => string): GameMode[] => [
  {
    name: t("gameModes.mini"),
    price: `10 ${t("currency.birr")}`,
    color: "bg-blue-500",
    ballNumber: "3",
    ballColor: "bg-blue-400",
  },
  {
    name: t("gameModes.sweety"),
    price: `20 ${t("currency.birr")}`,
    color: "bg-orange-500",
    ballNumber: "74",
    ballColor: "bg-yellow-400",
  },
  {
    name: t("gameModes.standard"),
    price: `50 ${t("currency.birr")}`,
    color: "bg-purple-500",
    ballNumber: "12",
    ballColor: "bg-purple-400",
  },
  {
    name: t("gameModes.grand"),
    price: `100 ${t("currency.birr")}`,
    color: "bg-green-500",
    ballNumber: "88",
    ballColor: "bg-green-400",
  },
];

export default function GameModes({ gameModes, onPlayClick }: GameModesProps) {
  const t = useTranslations();
  const { theme } = useTheme();
  const defaultModes = getDefaultGameModes(t);
  const modes = gameModes || defaultModes;

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2
          className={`text-xl font-bold ${
            theme === "dark" ? "text-white" : "text-slate-800"
          }`}
        >
          {t("common.play")}
        </h2>
        <Button
          variant="outline"
          className="border-yellow-400 text-yellow-400 hover:bg-yellow-400/10 hover:border-yellow-400/60 transition-all duration-300"
        >
          <Users className="h-4 w-4 mr-2" />
          {t("common.inviteFriends")}
        </Button>
      </div>

      {/* Game Mode Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {modes.map((mode) => (
          <Card
            key={mode.name}
            className={`${mode.color} border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}
          >
            <CardContent className="p-4 relative">
              <div className="text-white">
                <div className="text-lg font-bold mb-1">{mode.name}</div>
                <div className="text-sm opacity-90 mb-3">{mode.price}</div>
                <Button
                  size="sm"
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                  onClick={() =>
                    onPlayClick?.({
                      name: mode.name,
                      price: mode.price,
                      color: mode.color,
                    })
                  }
                >
                  {t("common.playNow")}
                </Button>
              </div>
              <div
                className={`absolute bottom-2 right-2 w-8 h-8 ${mode.ballColor} rounded-full flex items-center justify-center shadow-lg`}
              >
                <span className="text-white font-bold text-sm">
                  {mode.ballNumber}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
