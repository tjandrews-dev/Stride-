import { prisma } from "./lib/prisma";
import ListingCard from "./components/ListingCard";

export default async function Home() {
  const listings = await prisma.listing.findMany({
    where: { saleType: { in: ["CLASSIFIED","AUCTION"] } }, // all equine items
    orderBy: { createdAt: "desc" },
    take: 24
  });

  return (
    <div style={{ display:'grid', gap:24 }}>
      {/* Hero */}
      <section style={{
        background:'#0B1D39', color:'#fff', borderRadius:12, padding:24,
        backgroundImage:'linear-gradient(135deg, rgba(83,192,197,.15), rgba(11,29,57,0))'
      }}>
        <h1 style={{ margin:0, fontSize:24 }}>Stride Equine</h1>
        <p style={{ margin:'6px 0 0', opacity:.9 }}>
          Auctions every 2 weeks · Classifieds, tack & transport in one place.
        </p>
      </section>

      {/* Grid (auto-fit ~ 6 across on desktop) */}
      <section>
        <div style={{
          display:'grid',
          gap:16,
          gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))'
        }}>
          {listings.map((l:any)=> (
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
          {listings.length === 0 && <p>No listings yet.</p>}
        </div>
      </section>
    </div>
  );
}

