import React from "react";
import { prisma } from "@/lib/prisma";
import DirectoryClient from "./DirectoryClient";

export default async function DirectoryPage() {
  let dbCompanies: any[] = [];
  try {
    dbCompanies = await prisma.company.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Failed to fetch companies from database:", error);
  }

  return <DirectoryClient dbCompanies={dbCompanies} />;
}
