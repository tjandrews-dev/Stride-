import { prisma } from "../lib/prisma";
import ListingCard from "../components/ListingCard";

export const dynamic = "force-dynamic";

export default async function AuctionsPage() {
  const auctions = await prisma.listing.findMany({
    where: { saleType: "AUCTION", category: "horse" },
    include: { bids: true },
    orderBy: { endsAt: "asc" },
    take: 48
  });

  const mapped = auctions.map(l => {
    const current = l.bids.length ? Math.max(...l.bids.map(b => b.amountCents)) : l.reserveCents ?? null;
    const reserveMet = current != null && l.reserveCents != null && current >= l.reserveCents;
    return { ...l, currentBidCents: current, reserveMet, subtitle: l.description?.split("·")[0] || "" };
  });

  return (
    <div style={{ display:'grid', gap:16 }}>
      <h1 style={{ margin:0 }}>Stride Auctions (racehorses)</h1>
      <div className="grid" style={{ gridTemplateColumns:'repeat(auto-fill, minmax(240px, 1fr))' }}>
        {mapped.map((l:any)=>(
          <ListingCard key={l.id}
            id={l.id} title={l.title}
            images={JSON.parse(l.images||"[]")}
            category={l.category} saleType={l.saleType}
            subtitle={l.subtitle}
            currentBidCents={l.currentBidCents}
            reserveMet={l.reserveMet}
            featured={l.featured}
          />
        ))}
      </div>
      {mapped.length === 0 && <p>No auctions yet.</p>}
    </div>
  );
}

