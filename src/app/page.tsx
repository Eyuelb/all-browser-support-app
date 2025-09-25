"use client";

import {
  Header,
  BackgroundPattern,
  BalanceCard,
  InstructionsButton,
  GameModes,
  BottomNavigation,
  Footer,
} from "@/components";
import { useLanguage } from "@/i18n";

export default function Home() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative">
      <BackgroundPattern />
      <Header userName="test" />

      {/* Scrollable content area */}
      <div className="relative z-0 px-4 sm:px-6 pb-32 max-w-md mx-auto sm:max-w-lg">
        <BalanceCard balance={0} bonus={0} currency="Birr" />
        <InstructionsButton />
        <GameModes />
      </div>

      {/* Fixed bottom elements with higher z-index */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <BottomNavigation activeTab={t("navigation.play")} />
        <Footer />
      </div>
    </div>
  );
}
