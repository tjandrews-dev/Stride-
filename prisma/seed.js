const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const cents = v => Math.round(Number(v) * 100);

async function main() {
  console.log("🌱 Seeding…");

  const user = await prisma.user.upsert({
    where: { email: 'demo@stride.test' },
    update: {},
    create: { email: 'demo@stride.test', name: 'Demo Seller' }
  });

  const listings = [
    { title:'2019 Thoroughbred Gelding — OTT Eventing Prospect',
      description:'Kind, brave, schooling 80cm. Clean legs.',
      saleType:'AUCTION', category:'horse', breed:'Thoroughbred',
      discipline:'Eventing', state:'VIC', reserveCents:cents(5000),
      endsAt:new Date(Date.now()+3*24*60*60*1000),
      images:JSON.stringify(['https://picsum.photos/seed/strideA/800/600']), featured:true },

    { title:'2020 Filly — Sprinting Type',
      description:'Sharp, forward, vet docs available.',
      saleType:'AUCTION', category:'horse', breed:'Thoroughbred',
      discipline:'Racing', state:'NSW', reserveCents:cents(9000),
      endsAt:new Date(Date.now()+2*24*60*60*1000),
      images:JSON.stringify(['https://picsum.photos/seed/strideB/800/600']) },

    { title:'Warmblood Gelding — Showjumper',
      description:'Scopey, careful, ready to compete.',
      saleType:'CLASSIFIED', category:'horse', breed:'Warmblood',
      discipline:'Showjumping', state:'QLD', priceCents:cents(25000),
      images:JSON.stringify(['https://picsum.photos/seed/strideC/800/600']), featured:true },

    { title:'Stubben Saddle 17.5"', description:'Great condition, well cared for.',
      saleType:'CLASSIFIED', category:'tack', state:'VIC', priceCents:cents(850),
      images:JSON.stringify(['https://picsum.photos/seed/strideT1/800/600']) },

    { title:'Equestrian Helmet (M)', description:'Meets safety standards, very light use.',
      saleType:'CLASSIFIED', category:'tack', state:'NSW', priceCents:cents(120),
      images:JSON.stringify(['https://picsum.photos/seed/strideT2/800/600']) }
  ];

  for (const l of listings) { await prisma.listing.create({ data: { ...l, userId: user.id } }); }
  console.log("✅ Seed complete!");
}

main().catch(e => { console.error(e); process.exit(1); })
       .finally(async () => { await prisma.$disconnect(); });
