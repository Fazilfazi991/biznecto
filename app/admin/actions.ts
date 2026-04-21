"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addBusinessListing(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const location = formData.get("location") as string;
    const tagsString = formData.get("tags") as string;
    const productsString = formData.get("products") as string;

    const tags = tagsString ? tagsString.split(",").map(t => t.trim()).filter(Boolean).join(",") : "";
    const products = productsString ? productsString.split(",").map(p => p.trim()).filter(Boolean).join(",") : "";

    const company = await prisma.company.create({
      data: {
        name,
        description,
        location,
        tags,
        products,
        isVerified: true, // Auto-verified since it's added by admin
      },
    });

    revalidatePath("/directory");
    return { success: true, id: company.id };
  } catch (error: any) {
    console.error("Error adding business listing:", error);
    return { success: false, error: error.message };
  }
}
