import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/directory — Search & fetch companies
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q") || "";
    const location = searchParams.get("location") || "";

    const companies = await prisma.company.findMany({
      where: {
        AND: [
          q ? {
            OR: [
              { name: { contains: q, mode: "insensitive" } },
              { products_legacy: { contains: q, mode: "insensitive" } },
              { tags: { contains: q, mode: "insensitive" } },
              { description: { contains: q, mode: "insensitive" } },
              { items: { some: { name: { contains: q, mode: "insensitive" } } } },
            ],
          } : {},
          location ? { location: { contains: location, mode: "insensitive" } } : {},
          { status: "APPROVED" },
        ],
      },
      include: { items: true },
      orderBy: [{ isPremium: "desc" }, { isVerified: "desc" }, { createdAt: "desc" }],
    });

    return NextResponse.json(companies);
  } catch (error) {
    console.error("Directory fetch error:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}

// POST /api/directory — Register a company profile
export async function POST(req: NextRequest) {
  try {
    const { name, description, location, tags, products, userId } = await req.json();

    if (!name || !userId) {
      return NextResponse.json({ error: "Company name and userId are required." }, { status: 400 });
    }

    const company = await prisma.company.create({
      data: {
        name,
        description: description || "",
        location: location || "",
        tags: Array.isArray(tags) ? tags.join(",") : tags || "",
        products_legacy: Array.isArray(products) ? products.join(",") : products || "",
      },
    });

    // Link the company to the user
    await prisma.user.update({
      where: { id: userId },
      data: { companyId: company.id },
    });

    return NextResponse.json(company, { status: 201 });
  } catch (error) {
    console.error("Create company error:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
