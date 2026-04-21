import React from "react";
import { Settings, Save } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-serif font-bold text-2xl text-ink mb-1">Account Settings</h1>
        <p className="text-sm text-muted">Update your company information and security preferences.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h3 className="font-serif font-bold text-lg mb-4">Company Details</h3>
            <div className="grid gap-4">
              <div className="grid gap-1.5">
                <label className="text-xs font-bold text-muted uppercase">Company Name</label>
                <input type="text" className="border border-border-brand rounded-lg px-4 py-2 text-sm focus:border-teal outline-none" />
              </div>
              <div className="grid gap-1.5">
                <label className="text-xs font-bold text-muted uppercase">Company Description</label>
                <textarea rows={4} className="border border-border-brand rounded-lg px-4 py-2 text-sm focus:border-teal outline-none resize-none" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-serif font-bold text-lg mb-4">Security</h3>
            <div className="grid gap-4">
              <div className="grid gap-1.5">
                <label className="text-xs font-bold text-muted uppercase">New Password</label>
                <input type="password" placeholder="Leave blank to keep current" className="border border-border-brand rounded-lg px-4 py-2 text-sm focus:border-teal outline-none" />
              </div>
            </div>
          </Card>

          <div className="flex justify-end">
            <Button className="bg-teal hover:bg-teal-dark text-white px-8 flex items-center gap-2 shadow-lg shadow-teal/10">
              <Save size={16} /> Save All Changes
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <Card className="p-6 bg-sand border-none">
            <h3 className="font-serif font-bold text-[15px] mb-2">Need Help?</h3>
            <p className="text-xs text-muted leading-relaxed mb-4">
              If you need assistance with your account or want to verify your business, contact our support team.
            </p>
            <Button variant="outline" size="sm" className="w-full bg-white">Contact Support</Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
