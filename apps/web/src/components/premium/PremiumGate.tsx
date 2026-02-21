"use client";

import { useSession } from "next-auth/react";
import { UpgradePrompt } from "./UpgradePrompt";

interface PremiumGateProps {
  children: React.ReactNode;
  /** What feature is being gated */
  feature?: string;
}

export function PremiumGate({ children, feature }: PremiumGateProps) {
  const { data: session } = useSession();

  // For now, check a simple flag — later wired to Stripe subscription
  const isPremium = (session?.user as { isPremium?: boolean } | undefined)?.isPremium;

  if (isPremium) {
    return <>{children}</>;
  }

  return <UpgradePrompt feature={feature} />;
}
