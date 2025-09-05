import { prisma } from "../lib/prisma";
import ListingCard from "../components/ListingCard";

export const dynamic = "force-dynamic";

export default async function TackPage() {
  const items = await prisma.listing.findMany({
    where: { category: "tack" },
    orderBy: { createdAt: "desc" },
    take: 48,
  });

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <h2 style={{ marginTop: 0 }}>Tack & Equipment</h2>

      <div
        style={{
          display: "grid",
          gap: 16,
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        }}
      >
        {items.map((l: any) => (
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
        {items.length === 0 && <p>No tack listed yet.</p>}
      </div>
    </div>
  );
}
