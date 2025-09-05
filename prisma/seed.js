import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // --- HORSES ---
  await prisma.listing.createMany({
    data: [
      {
        title: "Ridgeline",
        description: "Eventing – 16.1hh, bold and athletic",
        saleType: "AUCTION",
        price: 15000,
        imageUrl: "/horses/ridgeline.jpg",
        category: "HORSE",
      },
      {
        title: "Willow",
        description: "Show Jumping, quiet temperament",
        saleType: "AUCTION",
        price: 22000,
        imageUrl: "/horses/willow.jpg",
        category: "HORSE",
      },
      {
        title: "Highgrove",
        description: "Leisure – 15.2hh, reliable gelding",
        saleType: "CLASSIFIED",
        price: 10000,
        imageUrl: "/horses/highgrove.jpg",
        category: "HORSE",
      },
    ],
  });

  // --- TACK ---
  await prisma.listing.createMany({
    data: [
      {
        title: "English Leather Saddle",
        description: "Well maintained, very comfortable",
        saleType: "CLASSIFIED",
        price: 1200,
        imageUrl: "/tack/saddle.jpg",
        category: "TACK",
      },
      {
        title: "Bridle",
        description: "Quality leather bridle",
        saleType: "CLASSIFIED",
        price: 250,
        imageUrl: "/tack/bridle.jpg",
        category: "TACK",
      },
      {
        title: "Riding Boots",
        description: "Durable leather riding boots",
        saleType: "CLASSIFIED",
        price: 300,
        imageUrl: "/tack/boots.jpg",
        category: "TACK",
      },
    ],
  });

  // --- MACHINERY ---
  await prisma.listing.createMany({
    data: [
      {
        title: "2-Horse Straight Load Float",
        description: "Well maintained, good brakes, registered",
        saleType: "CLASSIFIED",
        price: 8500,
        imageUrl: "/machinery/float.jpg",
        category: "MACHINERY",
      },
      {
        title: "Tractor",
        description: "John Deere tractor, low hours",
        saleType: "CLASSIFIED",
        price: 32000,
        imageUrl: "/machinery/tractor.jpg",
        category: "MACHINERY",
      },
      {
        title: "Horse Truck",
        description: "6-horse truck with living area",
        saleType: "CLASSIFIED",
        price: 75000,
        imageUrl: "/machinery/truck.jpg",
        category: "MACHINERY",
      },
    ],
  });
}

main()
  .then(async () => {
    console.log("✅ Database seeded successfully!");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Error seeding database:", e);
    await prisma.$disconnect();
    process.exit(1);
  });

