// The figure width scale (DESIGN.md → Figure). Each figure's base class already centres it.
export type FigureWidth = "default" | "xs" | "sm" | "md" | "lg" | "xl" | "wide";

export const figureWidthClass: Record<FigureWidth, string> = {
  default: "w-full",
  xs: "w-full max-w-[380px]",
  sm: "w-full max-w-[460px]",
  md: "w-full max-w-[560px]",
  lg: "w-full max-w-[640px]",
  xl: "w-full max-w-[720px]",
  wide: "w-full max-w-[960px]",
};
