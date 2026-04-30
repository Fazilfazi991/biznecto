"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function approveCompany(id: string) {
  try {
    const session = await auth();
    if (session?.user?.role !== "ADMIN") {
      return { success: false, error: "Unauthorized" };
    }

    await prisma.company.update({
      where: { id },
      data: { status: "APPROVED", isVerified: true },
    });

    revalidatePath("/admin");
    revalidatePath("/directory");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function rejectCompany(id: string) {
  try {
    const session = await auth();
    if (session?.user?.role !== "ADMIN") {
      return { success: false, error: "Unauthorized" };
    }

    await prisma.company.update({
      where: { id },
      data: { status: "REJECTED" },
    });

    revalidatePath("/admin");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function createSupplierAccount(formData: FormData) {
  try {
    const session = await auth();
    if (session?.user?.role !== "ADMIN") return { success: false, error: "Unauthorized" };

    const companyName = formData.get("companyName") as string;
    const description = formData.get("description") as string;
    const location = formData.get("location") as string;
    const category = formData.get("category") as string;
    const rawTags = formData.get("tags") as string;
    const supplierName = formData.get("supplierName") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // Combine category with tags
    const tags = rawTags ? `${category}, ${rawTags}` : category;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return { success: false, error: "Email already exists" };

    const { default: bcrypt } = await import("bcryptjs");
    const hashedPassword = await bcrypt.hash(password, 12);

    const company = await prisma.company.create({
      data: {
        name: companyName,
        description,
        location,
        tags,
        status: "APPROVED",
        isVerified: true,
      }
    });

    await prisma.user.create({
      data: {
        name: supplierName,
        email,
        password: hashedPassword,
        role: "SUPPLIER",
        companyId: company.id
      }
    });

    revalidatePath("/admin");
    revalidatePath("/directory");
    
    return { 
      success: true, 
      companyName, 
      email, 
      password // Returning the plain password so admin can share it once
    };
  } catch (error: any) {
    console.error("Admin create supplier error:", error);
    return { success: false, error: error.message };
  }
}
