import Link from "next/link";
import { prisma } from "../lib/prisma";
import ListingCard from "../components/ListingCard";

export const dynamic = "force-dynamic";

export default async function SellPage() {
  const classifieds = await prisma.listing.findMany({
    where: { saleType: "CLASSIFIED", category: "horse" },
    orderBy: { createdAt: "desc" },
    take: 48,
  });

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div
        style={{
          background: "#0B1D39",
          color: "#fff",
          borderRadius: 12,
          padding: 16,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h2 style={{ margin: 0 }}>Sell a Horse</h2>
          <p style={{ margin: "4px 0 0", opacity: 0.9 }}>
            List in minutes. Add photos, price or reserve, and go live.
          </p>
        </div>
        <Link
          href="/sell/new"
          style={{
            background: "#53C0C5",
            color: "#0B1D39",
            padding: "10px 14px",
            borderRadius: 10,
            fontWeight: 800,
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}
        >
          + Create listing
        </Link>
      </div>

      <h3 style={{ margin: "8px 0 0" }}>Latest horse classifieds</h3>

      <div
        style={{
          display: "grid",
          gap: 16,
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        }}
      >
        {classifieds.map((l: any) => (
          <ListingCard
            key={l.id}
            id={l.id}
            title={l.title}
            images={JSON.parse(l.images || "[]")}
            category={l.category}
            saleType={l.saleType}
            state={l.state}
            priceCents={l.priceCents}
            reserveCents={l.reserveCents}
            featured={l.featured}
          />
        ))}
        {classifieds.length === 0 && <p>No classifieds yet.</p>}
      </div>
    </div>
  );
}
