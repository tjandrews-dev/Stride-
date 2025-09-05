import Link from "next/link";
import Countdown from "./Countdown";

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
  subtitle?: string;
  endsAt?: string | null;
};

const money = (c?: number|null) => c==null ? "" : "A$" + (c/100).toLocaleString();

export default function ListingCard(p: Props) {
  const img = p.images?.[0] || "/placeholder-horse.jpg";
  return (
    <Link href={`/listing/${p.id}`} className="card" style={{ textDecoration:'none' }}>
      <div className="card-img">
        <img src={img} alt={p.title} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
        {p.featured && <span className="badge">Featured</span>}
        {p.reserveMet && <span className="badge" style={{ right:8, left:'auto', background:'#0B1D39' }}>RESERVE MET</span>}
      </div>
      <div className="card-body">
        <div style={{ fontWeight:800, fontSize:16 }}>{p.title}</div>
        {p.subtitle && <div className="card-cat" style={{ marginTop:2 }}>{p.subtitle}</div>}

        {p.saleType === "AUCTION" ? (
          <>
            <div style={{ color:'#6b7280', fontSize:13, marginTop:6 }}>Current Bid</div>
            <div style={{ fontWeight:800 }}>{money(p.currentBidCents)}</div>
            {p.endsAt && <div style={{ marginTop:6, fontSize:12, color:'#6b7280' }}>Ends <Countdown endsAt={p.endsAt} /></div>}
          </>
        ) : (
          <>
            <div style={{ color:'#6b7280', fontSize:13, marginTop:6 }}>Price</div>
            <div style={{ fontWeight:800 }}>{money(p.priceCents)}</div>
          </>
        )}
      </div>
    </Link>
  );
}
