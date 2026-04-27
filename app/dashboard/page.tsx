import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export default async function DashboardRedirectPage() {
  try {
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
  } catch (error: any) {
    // If it's a redirect error, rethrow it so Next.js handles the redirect correctly
    if (error && error.digest && error.digest.startsWith('NEXT_REDIRECT')) {
      throw error;
    }
    
    return (
      <div className="p-8">
        <h1 className="text-red-500 font-bold text-xl">Dashboard Error</h1>
        <pre className="mt-4 bg-gray-100 p-4 rounded text-sm overflow-auto text-black border border-red-200 whitespace-pre-wrap">
          {error.message || String(error)}
          {"\n\nStack:\n"}
          {error.stack}
        </pre>
        <p className="mt-4 text-xs text-gray-500">
          Environment variables present: 
          DATABASE_URL: {process.env.DATABASE_URL ? "Yes" : "No"},
          NEXTAUTH_SECRET: {process.env.NEXTAUTH_SECRET ? "Yes" : "No"}
        </p>
      </div>
    );
  }
}
