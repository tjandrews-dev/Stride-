"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/", label: "Home", icon: "🏠" },
  { href: "/auctions", label: "Auctions", icon: "🔨" },
  { href: "/tack", label: "Tack", icon: "🎒" },
  { href: "/sell", label: "Sell", icon: "👤" },
];

export default function BottomNav() {
  const path = usePathname();
  return (
    <nav className="bottomnav">
      {tabs.map(t => {
        const active = path === t.href || path?.startsWith(t.href);
        return (
          <Link key={t.href} href={t.href} className={`bottomtab ${active ? "active" : ""}`}>
            <div className="tabicon" aria-hidden>{t.icon}</div>
            <div className="tablabel">{t.label}</div>
          </Link>
        );
      })}
    </nav>
  );
}
