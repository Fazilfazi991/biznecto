import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, role, category } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email and password are required." },
        { status: 400 }
      );
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: "An account with this email already exists." },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    
    // Generate role-based ID
    const prefix = role === "BUYER" ? "BYR_" : "SUP_";
    const customId = `${prefix}${crypto.randomUUID().replace(/-/g, "").substring(0, 12)}`;

    // Create user and company if supplier
    const user = await prisma.user.create({
      data: {
        id: customId,
        name,
        email,
        password: hashedPassword,
        role: role || "SUPPLIER",
        company: role === "SUPPLIER" ? {
          create: {
            name: `${name}'s Company`,
            tags: category || "Agriculture",
            status: "PENDING",
          }
        } : undefined,
      },
    });

    return NextResponse.json(
      { message: "Account created successfully!", userId: user.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
