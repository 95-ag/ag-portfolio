import { MobileNav } from "@/components/layout/mobile-nav";
import { PillNav } from "@/components/layout/pill-nav";

export function Nav() {
  return (
    <>
      {/* Pill nav: hidden on mobile, shown md+ */}
      <div className="hidden md:block">
        <PillNav />
      </div>
      {/* Mobile trigger + slide-out: shown below md, hidden md+ */}
      <div className="md:hidden">
        <MobileNav />
      </div>
    </>
  );
}
