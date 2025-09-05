import { NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = await prisma.listing.create({
      data: {
        title: String(body.title),
        description: String(body.description ?? ""),
        saleType: body.saleType === "AUCTION" ? "AUCTION" : "CLASSIFIED",
        category: String(body.category ?? "horse"),
        breed: body.breed ?? null,
        discipline: body.discipline ?? null,
        state: body.state ?? null,
        priceCents: body.price ? Math.round(Number(body.price) * 100) : null,
        reserveCents: body.reserve ? Math.round(Number(body.reserve) * 100) : null,
        endsAt: body.endsAt ? new Date(body.endsAt) : null,
        images: JSON.stringify(Array.isArray(body.images) ? body.images : []),
        user: {
          connectOrCreate: {
            where: { email: "demo@stride.test" },
            create: { email: "demo@stride.test", name: "Demo Seller" },
          },
        },
      },
    });
    return NextResponse.json({ ok: true, id: data.id });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 400 });
  }
}
