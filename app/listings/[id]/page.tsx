import { prisma } from "../../lib/prisma";

export default async function Listing({ params }: { params: { id: string } }) {
  const l:any = await prisma.listing.findUnique({ where: { id: params.id } });
  if (!l) return <p>Not found.</p>;
  const images: string[] = JSON.parse(l.images || "[]");

  return (
    <div style={{maxWidth:1000, margin:'0 auto', display:'grid', gap:24}}>
      <div>
        {images.length ? images.map((src,i)=>
          <img key={i} src={src} alt={l.title}
               style={{width:'100%',borderRadius:12,marginBottom:12,border:'1px solid #ececf2'}}/>
        ) : <div style={{height:260,background:'#f3f4f6',border:'1px solid #ececf2',borderRadius:12}}/>}
      </div>
      <div>
        <div style={{fontSize:12,background:'#f3f4f6',display:'inline-block',padding:'2px 8px',borderRadius:8}}>
          {l.saleType} • {l.category}
        </div>
        <h1 style={{margin:'8px 0'}}>{l.title}</h1>
        <p style={{color:'#6b7280',whiteSpace:'pre-line'}}>{l.description}</p>
        <div style={{fontWeight:700, marginTop:8}}>
          {l.saleType==='CLASSIFIED' && l.priceCents ? `$${(l.priceCents/100).toLocaleString()}` : null}
          {l.saleType==='AUCTION' && l.reserveCents ? `Reserve: $${(l.reserveCents/100).toLocaleString()}` : null}
        </div>
        <div style={{fontSize:12,color:'#6b7280',marginTop:4}}>State: {l.state ?? '—'}</div>
      </div>
    </div>
  );
}
