"use client";

import React, { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Loader2, UploadCloud, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  onUploadComplete: (url: string) => void;
  bucket?: string;
  folder?: string;
  label?: string;
  accept?: string;
}

export function FileUpload({ 
  onUploadComplete, 
  bucket = "uploads", 
  folder = "general",
  label = "Upload File",
  accept = "image/*"
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);
    setSuccess(false);

    if (!supabase) {
      setError("Storage service not configured.");
      setUploading(false);
      return;
    }

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `${folder}/${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from(bucket)
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      onUploadComplete(publicUrl);
      setSuccess(true);
    } catch (err: any) {
      console.error("Upload error:", err);
      setError(err.message || "Failed to upload file");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border-brand rounded-xl cursor-pointer bg-sand/20 hover:bg-sand/40 transition-colors relative overflow-hidden group">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          {uploading ? (
            <Loader2 className="w-8 h-8 text-teal animate-spin" />
          ) : success ? (
            <CheckCircle2 className="w-8 h-8 text-teal" />
          ) : error ? (
            <AlertCircle className="w-8 h-8 text-coral" />
          ) : (
            <UploadCloud className="w-8 h-8 text-muted/40 group-hover:text-teal transition-colors" />
          )}
          <p className="mt-2 text-sm text-muted font-medium">
            {uploading ? "Uploading..." : success ? "Upload Successful" : label}
          </p>
          <p className="text-[10px] text-muted/60 mt-1 uppercase tracking-widest font-bold">
            {accept === "image/*" ? "PNG, JPG, WEBP" : "PDF, DOCX"}
          </p>
        </div>
        <input 
          type="file" 
          className="hidden" 
          accept={accept} 
          onChange={handleUpload} 
          disabled={uploading}
        />
      </label>
      {error && <p className="text-[11px] text-coral font-medium">{error}</p>}
    </div>
  );
}
