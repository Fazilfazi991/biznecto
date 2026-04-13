import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// POST /api/requirements — Create a new requirement
export async function POST(req: NextRequest) {
  try {
    const {
      title, description, quantity, budget,
      deadline, tags, status, buyerDetails,
      contactName, contactEmail, contactPhone, authorId
    } = await req.json();

    if (!title || !description || !quantity || !authorId) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const requirement = await prisma.requirement.create({
      data: {
        title,
        description,
        quantity,
        budget: budget || "Negotiable",
        deadline: deadline || "Flexible",
        tags: Array.isArray(tags) ? tags.join(",") : tags || "",
        status: status || "Active",
        buyerDetails: buyerDetails || "",
        contactName: contactName || "",
        contactEmail: contactEmail || "",
        contactPhone: contactPhone || "",
        authorId,
      },
    });

    return NextResponse.json(requirement, { status: 201 });
  } catch (error) {
    console.error("Create requirement error:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}

// GET /api/requirements — Fetch all requirements
export async function GET() {
  try {
    const requirements = await prisma.requirement.findMany({
      orderBy: { createdAt: "desc" },
      include: { author: { select: { name: true, email: true } } },
    });

    return NextResponse.json(requirements);
  } catch (error) {
    console.error("Fetch requirements error:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
