import React from "react";
import { Settings, Save } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { updateSettings } from "./actions";

import { SettingsForm } from "./SettingsForm";

export default async function SettingsPage() {
  const session = await auth();
  if (!session?.user?.id) return null;

  let user: any = null;
  try {
    user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { company: true }
    });
  } catch (err) {
    console.error("Settings page fetch error:", err);
  }

  if (!user) return <div className="p-8 text-center">Loading settings...</div>;

  const company = user?.company;

  return (
    <div className="flex flex-col gap-6 pb-20">
      <div>
        <h1 className="font-serif font-bold text-2xl text-ink mb-1">Account Settings</h1>
        <p className="text-sm text-muted">Update your company information and security preferences.</p>
      </div>

      <SettingsForm company={company} />
    </div>
  );
}
