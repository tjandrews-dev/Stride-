export const metadata = { title: 'Stride', description: 'Stride Auctions & Stride Equine' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin:0, fontFamily:'system-ui, Segoe UI, Arial, sans-serif', background:'#f7f7f8' }}>
        {/* Header */}
        <header style={{ background:'#0B1D39', color:'#fff' }}>
          <div style={{ maxWidth:1100, margin:'0 auto', padding:'12px 16px',
                        display:'flex', alignItems:'center', justifyContent:'space-between' }}>
            {/* Replace text with your logo later */}
            <a href="/" style={{ color:'#fff', textDecoration:'none', fontWeight:800, letterSpacing:.3 }}>Stride</a>
            <nav style={{ display:'flex', gap:16, fontSize:14 }}>
              <a href="/" style={{ color:'#fff', textDecoration:'none' }}>Equine</a>
              <a href="/auctions" style={{ color:'#fff', textDecoration:'none' }}>Auctions</a>
              <a href="/sell" style={{ color:'#fff', textDecoration:'none' }}>Sell</a>
              <a href="/tack" style={{ color:'#fff', textDecoration:'none' }}>Tack</a>
            </nav>
          </div>
        </header>

        {/* Page */}
        <main style={{ maxWidth:1100, margin:'0 auto', padding:'24px 16px 48px' }}>{children}</main>

        {/* Footer */}
        <footer style={{ borderTop:'1px solid #e6e6ea', background:'#fff' }}>
          <div style={{ maxWidth:1100, margin:'0 auto', padding:'24px 16px', color:'#6b7280', fontSize:12 }}>
            © {new Date().getFullYear()} Stride • Auctions every fortnight · Classifieds, tack & transport
          </div>
        </footer>
      </body>
    </html>
  );
}

