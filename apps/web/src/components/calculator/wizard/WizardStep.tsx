"use client";

import { cn } from "@/lib/utils";

interface WizardStepProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  className?: string;
}

export function WizardStep({ children, title, description, className }: WizardStepProps) {
  return (
    <div className={cn("space-y-6", className)}>
      <div className="text-center">
        <h3 className="text-xl font-semibold text-text-primary">{title}</h3>
        {description && (
          <p className="mt-1 text-sm text-text-secondary">{description}</p>
        )}
      </div>
      {children}
    </div>
  );
}
