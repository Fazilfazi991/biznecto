"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

// ... existing actions ...

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
