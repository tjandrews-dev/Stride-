import Link from "next/link";

type Props = {
  id: string;
  title: string;
  images: string[];
  category: string;
  saleType: string;
  state?: string | null;
  priceCents?: number | null;
  reserveCents?: number | null;
  featured?: boolean;
};

export default function ListingCard(p: Props) {
  const img = p.images?.[0];
  return (
    <Link href={`/listing/${p.id}`} style={{
      display:'block', background:'#fff', border:'1px solid #ececf2',
      borderRadius:12, overflow:'hidden', textDecoration:'none', color:'inherit'
    }}>
      <div style={{ position:'relative', aspectRatio:'4/3', background:'#f5f6f7' }}>
        {img ? <img src={img} alt={p.title} style={{width:'100%',height:'100%',objectFit:'cover'}}/> : null}
        {p.featured && (
          <span style={{position:'absolute',top:8,left:8,background:'#53C0C5',color:'#fff',
                         fontSize:12,padding:'2px 6px',borderRadius:8}}>Featured</span>
        )}
      </div>
      <div style={{ padding:12 }}>
        <div style={{fontSize:12,color:'#6b7280',textTransform:'capitalize'}}>{p.category}</div>
        <div style={{fontWeight:700, lineHeight:1.2, marginTop:4}}>{p.title}</div>
        <div style={{fontSize:12,color:'#6b7280'}}>{p.state ?? ''}</div>
        <div style={{marginTop:4, fontWeight:700}}>
          {p.saleType === 'CLASSIFIED' && p.priceCents ? `$${(p.priceCents/100).toLocaleString()}` : null}
          {p.saleType === 'AUCTION' && p.reserveCents ? `Reserve: $${(p.reserveCents/100).toLocaleString()}` : null}
        </div>
      </div>
    </Link>
  );
}
