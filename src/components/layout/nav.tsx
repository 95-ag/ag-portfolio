import Link from "next/link";

export function Nav() {
  return (
    <nav aria-label="Primary">
      <Link href="/">Home</Link>
      <Link href="/work">Work</Link>
      <Link href="/about">About</Link>
    </nav>
  );
}
