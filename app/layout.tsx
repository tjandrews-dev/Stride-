export const metadata = {
  title: 'Stride',
  description: 'Stride Auctions & Stride Equine',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'system-ui, Segoe UI, Arial, sans-serif', background: '#f7f7f8' }}>
        {/* Top bar */}
        <header style={{ background: '#0B1D39', color: '#fff' }}>
          <div style={{
            maxWidth: 1100, margin: '0 auto', padding: '12px 16px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between'
          }}>
            {/* Logo spot */}
            <a href="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: 800, letterSpacing: .5 }}>
              Stride
            </a>

            {/* Nav */}
            <nav style={{ display: 'flex', gap: 16, fontSize: 14, opacity: .95 }}>
              <a href="/" style={{ color: '#fff', textDecoration: 'none' }}>Equine</a>
              <a href="/auctions" style={{ color: '#fff', textDecoration: 'none' }}>Auctions</a>
              <a href="/sell" style={{ color: '#fff', textDecoration: 'none' }}>Sell</a>
            </nav>
          </div>
        </header>

        {/* Page container */}
        <main style={{ maxWidth: 1100, margin: '0 auto', padding: '24px 16px 48px' }}>
          {children}
        </main>

        {/* Footer */}
        <footer style={{ borderTop: '1px solid #e6e6ea', background: '#fff' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', padding: '24px 16px', color: '#6b7280', fontSize: 12 }}>
            © {new Date().getFullYear()} Stride • Auctions every fortnight · Classifieds & tack on Stride Equine
          </div>
        </footer>
      </body>
    </html>
  );
}
