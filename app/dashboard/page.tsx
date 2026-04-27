import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export default async function DashboardRedirectPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true }
  });

  if (!user) redirect("/login");

  if (user.role === "SUPPLIER") {
    redirect("/dashboard/supplier");
  } else {
    redirect("/dashboard/buyer");
  }
}
