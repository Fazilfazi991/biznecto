import React from "react";
import { Package, Plus, Image as ImageIcon, Tag, FileText } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { ProductForm } from "./ProductForm";

export default async function ProductsPage() {
  const session = await auth();
  if (!session?.user?.id) return null;

  let user: any = null;
  try {
    user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { 
        company: {
          include: { items: true }
        }
      }
    });
  } catch (err) {
    console.error("Products page fetch error:", err);
  }

  if (!user) return <div className="p-8 text-center">Loading user data...</div>;

  const products = user?.company?.items || [];

  return (
    <div className="flex flex-col gap-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif font-bold text-3xl text-ink mb-1">My Products</h1>
          <p className="text-sm text-muted font-medium">Manage your global product catalog and digital showroom.</p>
        </div>
      </div>

      {!user.companyId ? (
        <div className="bg-amber-50 border border-amber-100 p-6 rounded-2xl flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4 text-amber-600">
             <AlertCircle size={24} />
          </div>
          <h3 className="font-serif font-bold text-lg text-ink mb-1">Company Profile Required</h3>
          <p className="text-sm text-muted max-w-sm mb-6">You need to set up your company profile in Settings before you can add products.</p>
          <Link href="/dashboard/settings">
             <Button variant="primary">Go to Settings</Button>
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Column */}
          <div className="lg:col-span-1">
            <ProductForm />
          </div>

          {/* List Column */}
          <div className="lg:col-span-2">
            <div className="grid sm:grid-cols-2 gap-4">
              {products.length > 0 ? (
                products.map((product: any) => (
                  <Card key={product.id} className="overflow-hidden group hover:shadow-2xl transition-all border-border-brand">
                    <div className="aspect-video bg-sand relative overflow-hidden">
                      {product.imageUrl ? (
                        <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted/20">
                          <Package size={40} />
                        </div>
                      )}
                      <Badge className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-ink border-none shadow-sm">{product.category || "General"}</Badge>
                    </div>
                    <div className="p-4">
                      <h4 className="font-serif font-bold text-base text-ink mb-1">{product.name}</h4>
                      <p className="text-[11px] text-muted line-clamp-2 leading-relaxed mb-4">{product.description || "No description provided."}</p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1 text-[11px] font-bold rounded-lg h-9 border-border-brand">Edit</Button>
                        <Button variant="outline" size="sm" className="flex-1 text-[11px] font-bold rounded-lg h-9 border-red-100 text-red-500 hover:bg-red-50">Delete</Button>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <Card className="col-span-2 flex flex-col items-center justify-center p-20 text-center border-dashed border-2 bg-white/50">
                  <div className="w-16 h-16 bg-sand rounded-full flex items-center justify-center mb-4">
                    <Package size={28} className="text-muted/40" />
                  </div>
                  <h3 className="font-serif font-bold text-lg text-ink mb-2">Showroom Empty</h3>
                  <p className="text-sm text-muted max-w-sm mx-auto">
                    Add your first product using the form on the left to start appearing in buyer searches.
                  </p>
                </Card>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
