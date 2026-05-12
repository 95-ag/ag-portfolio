import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface IconProps {
  icon: LucideIcon;
  size?: number;
  className?: string;
  "aria-hidden"?: boolean;
  "aria-label"?: string;
}

export function Icon({
  icon: LucideIconComponent,
  size = 18,
  className,
  "aria-hidden": ariaHidden = true,
  "aria-label": ariaLabel,
}: IconProps) {
  return (
    <LucideIconComponent
      size={size}
      aria-hidden={ariaHidden}
      aria-label={ariaLabel}
      className={cn("shrink-0", className)}
    />
  );
}
