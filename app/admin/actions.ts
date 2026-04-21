"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

export async function createSupplierAccount(formData: FormData) {
  try {
    const companyName = formData.get("companyName") as string;
    const description = formData.get("description") as string;
    const location = formData.get("location") as string;
    const tagsString = formData.get("tags") as string;
    const supplierName = formData.get("supplierName") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!companyName || !email || !password || !supplierName) {
      return { success: false, error: "Company name, contact name, email and password are required." };
    }

    // Check if email already exists
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return { success: false, error: "An account with this email already exists." };
    }

    const tags = tagsString ? tagsString.split(",").map(t => t.trim()).filter(Boolean).join(",") : "Verified";
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create the Company first
    const company = await prisma.company.create({
      data: {
        name: companyName,
        description,
        location,
        tags,
        products: "", // Supplier will fill this in themselves
        isVerified: true,
      },
    });

    // Create the User (supplier) linked to the company
    await prisma.user.create({
      data: {
        name: supplierName,
        email,
        password: hashedPassword,
        role: "SUPPLIER",
        companyId: company.id,
      },
    });

    revalidatePath("/directory");
    return { success: true, companyName, email, password };
  } catch (error: any) {
    console.error("Error creating supplier account:", error);
    return { success: false, error: error.message };
  }
}
