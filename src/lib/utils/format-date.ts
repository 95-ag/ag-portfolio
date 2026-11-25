// Frontmatter dates are calendar dates ("2026-11-04"), which `new Date` reads as UTC
// midnight. Formatting in UTC keeps the printed day from shifting with the build machine's
// timezone.
const DISPLAY_DATE = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});

export function formatDate(isoDate: string): string {
  return DISPLAY_DATE.format(new Date(isoDate));
}
