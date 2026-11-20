"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils/cn";
import { useAttentionCue } from "./attention-cue";
import "./button.css";

type ButtonBaseProps = {
  // `outline` (default) is the 44px outlined pill; `filled` is the 48px ink pill for a screen's one primary action.
  variant?: "outline" | "filled";
  // A Button carries exactly one icon.
  icon?: React.ReactNode;
  iconPosition?: "leading" | "trailing";
  // `full`: the outline draws, then the sheen crosses twice. `draw`: the outline draw alone.
  cue?: "full" | "draw";
  children: React.ReactNode;
  className?: string;
};

type ButtonAsButton = ButtonBaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    href?: undefined;
  };

type ButtonAsAnchor = ButtonBaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsAnchor;

export function Button(props: ButtonProps) {
  const {
    variant = "outline",
    icon,
    iconPosition = "leading",
    cue,
    children,
    className,
    ...rest
  } = props;
  const ref = useRef<HTMLElement | null>(null);
  useAttentionCue(ref, cue !== undefined);

  const setRef = (node: HTMLElement | null) => {
    ref.current = node;
  };
  const classes = cn(
    "btn interactive-label",
    variant === "filled" && "btn-filled",
    className,
  );
  const iconMark = icon && (
    <span aria-hidden="true" className="btn-icon">
      {icon}
    </span>
  );
  const content = (
    <>
      {cue === "full" && <span className="btn-sheen" aria-hidden="true" />}
      {iconPosition === "leading" && iconMark}
      {children}
      {iconPosition === "trailing" && iconMark}
    </>
  );

  if (rest.href !== undefined) {
    const { href, target, rel, ...anchorRest } = rest as ButtonAsAnchor;
    return (
      <a
        ref={setRef}
        href={href}
        target={target}
        rel={target === "_blank" ? (rel ?? "noopener noreferrer") : rel}
        className={classes}
        data-cue={cue}
        {...anchorRest}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={setRef}
      type="button"
      className={classes}
      data-cue={cue}
      {...(rest as ButtonAsButton)}
    >
      {content}
    </button>
  );
}
