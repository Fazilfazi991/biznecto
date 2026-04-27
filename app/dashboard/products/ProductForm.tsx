"use client";

import React, { useState } from "react";
import { Package, Plus, Image as ImageIcon, Tag, FileText, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { addProduct } from "./actions";
import { FileUpload } from "@/components/ui/FileUpload";
import { useRouter } from "next/navigation";

export function ProductForm() {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    formData.set("imageUrl", imageUrl);

    try {
      const result = await addProduct(formData);
      if (!result.success) throw new Error(result.error);
      
      setSuccess(true);
      setImageUrl("");
      (e.target as HTMLFormElement).reset();
      router.refresh();
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || "Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="sticky top-24 p-6 border-2 border-teal/10 shadow-xl shadow-teal/5 bg-white">
      <h3 className="font-serif font-bold text-xl text-ink mb-6 flex items-center gap-2">
        <Plus size={20} className="text-teal" /> Add New Product
      </h3>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold text-muted uppercase tracking-widest">Product Name *</label>
          <div className="relative">
            <Package className="absolute left-3 top-1/2 -translate-y-1/2 text-muted/40" size={16} />
            <input name="name" required placeholder="e.g. A-Grade Steel Pipes" 
              className="w-full border border-border-brand rounded-xl pl-10 pr-4 py-3 text-sm focus:border-teal focus:ring-4 focus:ring-teal/5 outline-none transition-all" />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold text-muted uppercase tracking-widest">Category</label>
          <div className="relative">
            <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-muted/40" size={16} />
            <input name="category" placeholder="e.g. Construction" 
              className="w-full border border-border-brand rounded-xl pl-10 pr-4 py-3 text-sm focus:border-teal focus:ring-4 focus:ring-teal/5 outline-none transition-all" />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold text-muted uppercase tracking-widest">Product Image</label>
          <FileUpload 
            onUploadComplete={(url) => setImageUrl(url)}
            folder="products"
            label="Drop product image here"
          />
          <div className="mt-2">
            <label className="text-[10px] font-bold text-muted uppercase block mb-1">Or Paste Image URL</label>
            <input 
              type="text" 
              placeholder="https://..."
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full border border-border-brand rounded-lg px-3 py-2 text-[12px] focus:border-teal outline-none"
            />
          </div>
          {imageUrl && imageUrl.startsWith('http') && (
            <div className="mt-2 relative rounded-lg overflow-hidden h-20 border border-teal/20">
              <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold text-muted uppercase tracking-widest">Description</label>
          <div className="relative">
            <FileText className="absolute left-3 top-3 text-muted/40" size={16} />
            <textarea name="description" rows={4} placeholder="Key features, specifications..." 
              className="w-full border border-border-brand rounded-xl pl-10 pr-4 py-3 text-sm focus:border-teal focus:ring-4 focus:ring-teal/5 outline-none transition-all resize-none" />
          </div>
        </div>

        <Button 
          type="submit" 
          disabled={loading}
          className="w-full bg-teal hover:bg-teal-dark text-white font-bold py-4 rounded-xl shadow-lg shadow-teal/20 transition-all mt-2"
        >
          {loading ? "Publishing..." : success ? "Published!" : "Publish to Directory"}
        </Button>

        {error && (
          <p className="text-xs text-coral font-medium text-center">{error}</p>
        )}
        {success && (
          <div className="flex items-center justify-center gap-2 text-teal font-bold text-xs animate-in fade-in slide-in-from-bottom-2">
            <CheckCircle2 size={14} /> Product added successfully!
          </div>
        )}
      </form>
    </Card>
  );
}
