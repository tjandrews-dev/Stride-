"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  // Which section are we in?
  const isAuctions = pathname?.startsWith("/auctions");
  const logoSrc = isAuctions
    ? "/stride-auctions-logo.png"
    : "/stride-equine-logo.png";   // default = Equine on home/tack/sell

  // Simple “active” styles for nav links
  const link = (href: string, label: string) => {
    const active = pathname === href || pathname?.startsWith(href);
    return (
      <Link
        href={href}
        style={{
          color: "#fff",
          textDecoration: "none",
          fontWeight: active ? 800 : 500,
          opacity: active ? 1 : 0.85,
        }}
      >
        {label}
      </Link>
    );
  };

  return (
    <header style={{ background: "#0B1D39", color: "#fff" }}>
      <div
        className="container"
        style={{
          padding: "10px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          {/* If logo missing, browser just shows a broken image icon; that’s fine during setup */}
          <img src={logoSrc} alt="Stride logo" height={36} />
        </Link>

        <nav style={{ display: "flex", gap: 18, fontSize: 14 }}>
          {link("/", "Equine")}
          {link("/auctions", "Auctions")}
          {link("/sell", "Sell")}
          {link("/tack", "Tack")}
        </nav>
      </div>
    </header>
  );
}
<nav style={{ display: "flex", gap: 18, fontSize: 14 }}>
  {link("/", "Equine")}
  {link("/auctions", "Auctions")}
  {link("/tack", "Tack")}
  {link("/machinery", "Machinery")}   {/* <- add this line */}
  {link("/sell", "Sell")}
</nav>
