import { prisma } from "../lib/prisma";
import ListingCard from "../components/ListingCard";

export const dynamic = "force-dynamic";

export default async function MachineryPage() {
  const items = await prisma.listing.findMany({
    where: { category: "machinery" },
    orderBy: { createdAt: "desc" },
    take: 48
  });

  return (
    <div style={{ display:'grid', gap:16 }}>
      <h2 style={{ marginTop: 0 }}>Machinery & Transport</h2>
      <div className="grid" style={{ gridTemplateColumns:'repeat(auto-fill, minmax(220px, 1fr))' }}>
        {items.map((l:any)=>(
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
        {items.length===0 && <p>No machinery listed yet.</p>}
      </div>
    </div>
  );
}
