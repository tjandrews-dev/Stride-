const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const cents = (v) => Math.round(Number(v) * 100);

async function main() {
  console.log("🌱 Seeding database...");

  const user = await prisma.user.upsert({
    where: { email: 'demo@stride.test' },
    update: {},
    create: { email: 'demo@stride.test', name: 'Demo Seller' }
  });

  await prisma.listing.create({
    data: {
      title: "Warmblood Gelding — Showjumper",
      description: "Scopey jumper, brave and careful.",
      saleType: "CLASSIFIED",
      category: "horse",
      breed: "Warmblood",
      discipline: "Showjumping",
      state: "QLD",
      priceCents: cents(25000),
      images: JSON.stringify(["https://picsum.photos/seed/stride1/800/600"]),
      userId: user.id
    }
  });

  console.log("✅ Seed complete!");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
