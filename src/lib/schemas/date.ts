import { z } from "zod";

// The shape check alone accepts 2026-11-31, which Date silently rolls to Dec 1. A real date
// survives a round trip through UTC unchanged.
export const IsoDate = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/)
  .refine(
    (value) => {
      const parsed = new Date(`${value}T00:00:00Z`);
      return (
        !Number.isNaN(parsed.getTime()) &&
        parsed.toISOString().slice(0, 10) === value
      );
    },
    { message: "Not a real calendar date" },
  );
