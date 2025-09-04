import { prisma } from "../lib/prisma";
import ListingCard from "../components/ListingCard";

export default async function Auctions() {
  const auctions = await prisma.listing.findMany({
    where: { saleType: "AUCTION", category: "horse" }, // racehorses only
    orderBy: { createdAt: "desc" },
    take: 24
  });

  return (
    <div style={{display:'grid', gap:16}}>
      <h2 style={{marginTop:0}}>Stride Auctions (racehorses)</h2>
      <div style={{display:'grid', gap:16, gridTemplateColumns:'repeat(auto-fill, minmax(220px, 1fr))'}}>
        {auctions.map((l:any)=> (
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
        {auctions.length === 0 && <p>No auctions yet.</p>}
      </div>
    </div>
  );
}
