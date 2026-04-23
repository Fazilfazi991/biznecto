"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function updateSettings(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) return { success: false, error: "Not authenticated" };

  const companyName = formData.get("companyName") as string;
  const description = formData.get("description") as string;
  const location = formData.get("location") as string;
  const logoUrl = formData.get("logoUrl") as string;
  const catalogueUrl = formData.get("catalogueUrl") as string;

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user) return { success: false, error: "User not found" };

    if (!user.companyId) {
      // Create new company and link to user
      const company = await prisma.company.create({
        data: {
          name: companyName,
          description,
          location,
          logoUrl,
          catalogueUrl,
          tags: "", // Default empty
          users: {
            connect: { id: user.id }
          }
        }
      });
      
      revalidatePath("/dashboard");
      revalidatePath("/dashboard/settings");
      return { success: true, companyId: company.id };
    } else {
      // Update existing company
      await prisma.company.update({
        where: { id: user.companyId },
        data: {
          name: companyName,
          description,
          location,
          logoUrl,
          catalogueUrl,
        }
      });

      revalidatePath("/dashboard");
      revalidatePath("/dashboard/settings");
      revalidatePath("/directory");
      return { success: true };
    }
  } catch (error: any) {
    console.error("Update settings error:", error);
    return { success: false, error: error.message || "Failed to save changes" };
  }
}
