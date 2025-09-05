const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const cents = v => Math.round(Number(v) * 100);

async function main() {
  console.log("🌱 Seeding…");

  const seller = await prisma.user.upsert({
    where: { email: 'demo@stride.test' },
    update: {},
    create: { email: 'demo@stride.test', name: 'Demo Seller' }
  });

  // Realistic horse/tack images (royalty-free Unsplash)
  const img = {
    ridgeline: "https://images.unsplash.com/photo-1503756234503-4a4fbe6b9468",
    willow:    "https://images.unsplash.com/photo-1517849845537-4d257902454a",
    highgrove: "https://images.unsplash.com/photo-1500367215255-0e0b25b396af",
    saddle:    "https://images.unsplash.com/photo-1611784212541-9d085b2d24a2",
    helmet:    "https://images.unsplash.com/photo-1520975682038-7e3ca9c5d7c5"
  };

  // ---- AUCTIONS (racehorses) ----
  const ridgeline = await prisma.listing.create({
    data: {
      title: "Ridgeline",
      description: "Eventing – 16.1hh · Bold type, brave and careful.",
      saleType: "AUCTION",
      category: "horse",
      breed: "Thoroughbred",
      discipline: "Eventing",
      state: "VIC",
      reserveCents: cents(15000),
      endsAt: new Date(Date.now() + 48*60*60*1000),
      images: JSON.stringify([img.ridgeline]),
      featured: true,
      userId: seller.id,
    }
  });

  const willow = await prisma.listing.create({
    data: {
      title: "Willow",
      description: "Show Jumping – Quiet type with nice technique.",
      saleType: "AUCTION",
      category: "horse",
      breed: "Warmblood",
      discipline: "Showjumping",
      state: "NSW",
      reserveCents: cents(22000),
      endsAt: new Date(Date.now() + 36*60*60*1000),
      images: JSON.stringify([img.willow]),
      featured: true,
      userId: seller.id,
    }
  });

  const highgrove = await prisma.listing.create({
    data: {
      title: "Highgrove",
      description: "Leisure – 15.2hh · Kind and straightforward.",
      saleType: "AUCTION",
      category: "horse",
      breed: "Thoroughbred",
      discipline: "Leisure",
      state: "QLD",
      reserveCents: cents(10000),
      endsAt: new Date(Date.now() + 60*60*60*1000),
      images: JSON.stringify([img.highgrove]),
      userId: seller.id,
    }
  });

  // Sample bids (so “Current Bid” shows)
  await prisma.bid.createMany({
    data: [
      { userId: seller.id, listingId: ridgeline.id, amountCents: cents(15000) },
      { userId: seller.id, listingId: willow.id,    amountCents: cents(22000) },
      { userId: seller.id, listingId: highgrove.id, amountCents: cents(10000) },
    ]
  });

  // ---- CLASSIFIEDS: tack ----
  await prisma.listing.createMany({
    data: [
      {
        title: "English Leather Saddle 17.5\"",
        description: "Well cared for, supple leather.",
        saleType: "CLASSIFIED",
        category: "tack",
        state: "VIC",
        priceCents: cents(1200),
        images: JSON.stringify([img.saddle]),
        userId: seller.id
      },
      {
        title: "Equestrian Helmet (M)",
        description: "Meets current safety standards.",
        saleType: "CLASSIFIED",
        category: "tack",
        state: "NSW",
        priceCents: cents(80),
        images: JSON.stringify([img.helmet]),
        userId: seller.id
      }
    ]
  });

  console.log("✅ Seed complete!");
}

main().catch(e => { console.error(e); process.exit(1); })
       .finally(async () => { await prisma.$disconnect(); });

