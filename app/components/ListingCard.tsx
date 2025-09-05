import Link from "next/link";

type Props = {
  id: string;
  title: string;
  images: string[];
  category: string;
  saleType: string;
  state?: string | null;
  priceCents?: number | null;
  currentBidCents?: number | null;
  reserveMet?: boolean;
  featured?: boolean;
  subtitle?: string; // e.g. "Eventing – 16.1hh Bold"
};

function money(cents?: number | null) {
  if (!cents && cents !== 0) return "";
  return "A$" + (cents / 100).toLocaleString();
}

export default function ListingCard(p: Props) {
  const img = p.images?.[0] || "/placeholder-horse.jpg";

  return (
    <Link href={`/listing/${p.id}`} className="card" style={{ textDecoration:'none' }}>
      <div className="card-img">
        <img src={img} alt={p.title} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
        {p.featured && <span className="badge">Featured</span>}
        {p.reserveMet && <span className="badge" style={{ left:'auto', right:8, background:'#0B1D39' }}>RESERVE MET</span>}
      </div>
      <div className="card-body">
        <div style={{ fontSize:16, fontWeight:800, lineHeight:1.2 }}>{p.title}</div>
        {p.subtitle && <div style={{ color:'#394150', marginTop:4 }}>{p.subtitle}</div>}

        {p.saleType === 'CLASSIFIED' && (
          <div style={{ marginTop:8 }}>
            <div style={{ color:'#6b7280', fontSize:13 }}>Price</div>
            <div style={{ fontWeight:800 }}>{money(p.priceCents)}</div>
          </div>
        )}

        {p.saleType === 'AUCTION' && (
          <div style={{ marginTop:8 }}>
            <div style={{ color:'#6b7280', fontSize:13 }}>Current Bid</div>
            <div style={{ fontWeight:800 }}>{money(p.currentBidCents)}</div>
          </div>
        )}
      </div>
    </Link>
  );
}

