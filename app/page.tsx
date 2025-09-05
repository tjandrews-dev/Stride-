import { prisma } from "./lib/prisma";
import Banner from "./components/Banner";
import ListingCard from "./components/ListingCard";

export default async function Home() {
  const featured = await prisma.listing.findMany({
    where: { saleType: "AUCTION", category: "horse", featured: true },
    include: { bids: true },
    orderBy: { createdAt: "desc" }, take: 3
  });

  const mapped = featured.map(l => {
    const current = l.bids.length ? Math.max(...l.bids.map(b => b.amountCents)) : l.reserveCents ?? null;
    const reserveMet = current != null && l.reserveCents != null && current >= l.reserveCents;
    return { ...l, currentBidCents: current, reserveMet, subtitle: l.description?.split("·")[0] || "" };
  });

  return (
    <div style={{ display:'grid', gap:20 }}>
      <div style={{ display:'flex', justifyContent:'center', marginTop:6 }}>
        <img src="/stride-equine-logo.png" alt="Stride Equine" height={64}/>
      </div>

      <Banner text="Next Stride Equine Auction — Monthly Catalogue Opens in 12d" />

      <h2 style={{ margin:'6px 0', color:'#0B1D39' }}>Featured</h2>

      <div className="grid" style={{ gridTemplateColumns:'repeat(3, minmax(0,1fr))' }}>
        {mapped.map((l:any)=>(
          <ListingCard key={l.id}
            id={l.id} title={l.title}
            images={JSON.parse(l.images||"[]")}
            category={l.category} saleType={l.saleType}
            subtitle={l.subtitle}
            currentBidCents={l.currentBidCents}
            reserveMet={l.reserveMet}
            featured={true}
            endsAt={l.endsAt?.toISOString?.() ?? l.endsAt as any}
          />
        ))}
      </div>
    </div>
  );
}
