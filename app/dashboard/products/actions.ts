"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function addProduct(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const imageUrl = formData.get("imageUrl") as string;
  const category = formData.get("category") as string;

  // Find the company associated with this user
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { company: true }
  });

  if (!user?.companyId) throw new Error("No company found for this account");

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
}
