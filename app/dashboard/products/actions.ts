"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function addProduct(formData: FormData) {
  try {
    const session = await auth();
    if (!session?.user?.id) return { success: false, error: "Not authenticated" };

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const imageUrl = formData.get("imageUrl") as string;
    const category = formData.get("category") as string;

    if (!name) return { success: false, error: "Product name is required" };

    // Find the company associated with this user
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { company: true }
    });

    if (!user?.companyId) return { success: false, error: "No company found for this account" };

    await prisma.product.create({
      data: {
        name,
        description,
        imageUrl,
        category,
        companyId: user.companyId
      }
    });

    revalidatePath("/dashboard/products");
    revalidatePath(`/suppliers/${user.companyId}`);
    return { success: true };
  } catch (error: any) {
    console.error("Add product error:", error);
    return { success: false, error: error.message || "Failed to add product" };
  }
}
