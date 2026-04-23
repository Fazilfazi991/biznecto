"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function postRequirement(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) return { success: false, error: "Please log in to post a requirement." };

  // Strict role check: Only BUYER and ADMIN can post requirements
  const userRole = session.user.role;
  if (userRole !== "BUYER" && userRole !== "ADMIN") {
    return { success: false, error: "Only registered Buyers can post sourcing requirements. Suppliers should search the board to find opportunities." };
  }

  const title = formData.get("title") as string;
  const quantity = formData.get("quantity") as string;
  const budget = formData.get("budget") as string;
  const description = formData.get("description") as string;

  if (!title || !quantity || !description) {
    return { success: false, error: "Missing required fields." };
  }

  try {
    await prisma.requirement.create({
      data: {
        title,
        quantity,
        budget: budget || "Negotiable",
        description,
        status: "PENDING", // New requirements must be approved by admin
        authorId: session.user.id,
        tags: "", // To be implemented later or auto-extracted
        buyerDetails: "",
      },
    });

    revalidatePath("/requirements");
    revalidatePath("/admin");
    return { success: true };
  } catch (error: any) {
    console.error("Post requirement error:", error);
    return { success: false, error: error.message || "Failed to post requirement." };
  }
}

export async function approveRequirement(id: string) {
  try {
    await prisma.requirement.update({
      where: { id },
      data: { status: "Active" },
    });
    revalidatePath("/requirements");
    revalidatePath("/admin");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function rejectRequirement(id: string) {
  try {
    await prisma.requirement.update({
      where: { id },
      data: { status: "REJECTED" },
    });
    revalidatePath("/admin");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
