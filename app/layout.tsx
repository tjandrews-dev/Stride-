import "./globals.css";
import Header from "./components/Header";

export const metadata = {
  title: "Stride",
  description: "Stride Auctions & Stride Equine",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="container">{children}</main>
        <footer className="footer">
          <div className="footer-inner">
            © {new Date().getFullYear()} Stride • Auctions every fortnight · Classifieds, tack & transport
          </div>
        </footer>
      </body>
    </html>
  );
}
