import React from "react";
import { Package, Plus } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function ProductsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif font-bold text-2xl text-ink mb-1">My Products</h1>
          <p className="text-sm text-muted">Manage your product catalog and visibility.</p>
        </div>
        <Button className="bg-teal hover:bg-teal-dark text-white flex items-center gap-2">
          <Plus size={16} /> Add New Product
        </Button>
      </div>

      <Card className="flex-1 flex flex-col items-center justify-center p-20 text-center border-dashed border-2">
        <div className="w-16 h-16 bg-sand rounded-full flex items-center justify-center mb-4">
          <Package size={28} className="text-muted/40" />
        </div>
        <h3 className="font-serif font-bold text-lg text-ink mb-2">Your catalog is empty</h3>
        <p className="text-sm text-muted max-w-sm mx-auto mb-6">
          Add your products to appear in the global directory and start matching with verified buyer requirements.
        </p>
        <Button variant="outline" className="border-border-brand">
          Learn how to optimize your listings
        </Button>
      </Card>
    </div>
  );
}
