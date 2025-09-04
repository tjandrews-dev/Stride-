export default function Home() {
  return (
    <div style={{ display: 'grid', gap: 24 }}>
      {/* Hero */}
      <section style={{
        background: '#0B1D39', color: '#fff', borderRadius: 12, padding: 24,
        backgroundImage: 'linear-gradient(135deg, rgba(83,192,197,.15), rgba(11,29,57,0))'
      }}>
        <h1 style={{ margin: 0, fontSize: 24 }}>Stride Equine</h1>
        <p style={{ margin: '6px 0 0', opacity: .9 }}>
          Auctions every 2 weeks · Classifieds, tack & transport in one place.
        </p>
      </section>

      {/* Quick links */}
      <section style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
        <a href="/auctions" style={card}>View Auctions →</a>
        <a href="/sell" style={card}>List a Horse →</a>
        <a href="/tack" style={card}>Browse Tack →</a>
      </section>
    </div>
  );
}

const card: React.CSSProperties = {
  background: '#fff',
  padding: 16,
  borderRadius: 12,
  border: '1px solid #ececf2',
  textDecoration: 'none',
  color: '#0B1D39',
  fontWeight: 700
};
