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
    const session = await auth();
    if (session?.user?.role !== "ADMIN") {
      return { success: false, error: "Unauthorized: Admin access required." };
    }
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

export async function deleteRequirement(id: string) {
  try {
    const session = await auth();
    if (!session?.user?.id) return { success: false, error: "Please log in." };

    const requirement = await prisma.requirement.findUnique({
      where: { id },
      select: { authorId: true }
    });

    if (!requirement) return { success: false, error: "Requirement not found." };

    // Only author or admin can delete
    if (requirement.authorId !== session.user.id && session.user.role !== "ADMIN") {
      return { success: false, error: "Unauthorized." };
    }

    await prisma.requirement.delete({
      where: { id },
    });

    revalidatePath("/requirements");
    revalidatePath("/dashboard");
    revalidatePath("/admin");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
export async function updateRequirement(id: string, formData: FormData) {
  try {
    const session = await auth();
    if (!session?.user?.id) return { success: false, error: "Please log in." };

    const title = formData.get("title") as string;
    const quantity = formData.get("quantity") as string;
    const budget = formData.get("budget") as string;
    const description = formData.get("description") as string;

    await prisma.requirement.update({
      where: { id },
      data: {
        title,
        quantity,
        budget: budget || "Negotiable",
        description,
        status: "PENDING", // Re-moderate on edit
      },
    });

    revalidatePath("/requirements");
    revalidatePath("/dashboard");
    revalidatePath("/admin");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function submitInquiry(formData: FormData) {
  try {
    const session = await auth();
    
    const requirementId = formData.get("requirementId") as string;
    const message = formData.get("message") as string;
    const companyName = formData.get("companyName") as string;
    const contactName = formData.get("contactName") as string;
    const contactEmail = formData.get("contactEmail") as string;
    const contactPhone = formData.get("contactPhone") as string;
    const country = formData.get("country") as string;

    if (!requirementId || !message || !contactName || !contactEmail) {
      return { success: false, error: "Missing required fields." };
    }

    await prisma.inquiry.create({
      data: {
        message,
        companyName,
        contactName,
        contactEmail,
        contactPhone,
        country,
        requirementId,
        senderId: session?.user?.id || null,
      },
    });

    // Increment response count on requirement
    await prisma.requirement.update({
      where: { id: requirementId },
      data: { responses: { increment: 1 } }
    });

    revalidatePath(`/requirements/${requirementId}/quote`);
    return { success: true };
  } catch (error: any) {
    console.error("Submit inquiry error:", error);
    return { success: false, error: error.message || "Failed to submit inquiry." };
  }
}
