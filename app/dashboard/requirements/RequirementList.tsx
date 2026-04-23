"use client";

import React from "react";
import { Badge } from "@/components/ui/Badge";
import { RequirementForm } from "@/app/requirements/RequirementForm";
import { Button } from "@/components/ui/Button";
import { ClipboardList, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { deleteRequirement } from "@/app/requirements/actions";

export function RequirementList({ initialRequirements }: { initialRequirements: any[] }) {
  const [requirements, setRequirements] = React.useState(initialRequirements);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this requirement?")) {
      const res = await deleteRequirement(id);
      if (res.success) {
        setRequirements(requirements.filter(r => r.id !== id));
      } else {
        alert(res.error);
      }
    }
  };

  if (requirements.length === 0) {
    return (
      <div className="py-24 text-center">
        <ClipboardList size={48} className="text-muted/20 mx-auto mb-4" />
        <h3 className="font-serif font-bold text-xl text-ink mb-2">No Requests Yet</h3>
        <p className="text-sm text-muted max-w-xs mx-auto mb-8">
          Post your first requirement to start receiving quotes from verified suppliers.
        </p>
        <RequirementForm />
      </div>
    );
  }

  return (
    <div className="divide-y divide-sand">
      {requirements.map((req) => (
        <div key={req.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-sand/30 transition-colors">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <Badge className={cn("text-[10px] px-2 uppercase font-bold", 
                req.status === "Active" ? "bg-teal text-white border-none" : "bg-amber-100 text-amber-700 border-none"
              )}>
                {req.status}
              </Badge>
              <span className="text-[12px] text-muted">{new Date(req.createdAt).toLocaleDateString()}</span>
            </div>
            <h3 className="font-sans font-bold text-xl text-ink mb-2">{req.title}</h3>
            <p className="text-sm text-muted line-clamp-2 max-w-2xl italic leading-relaxed">
              {req.description}
            </p>
            <div className="flex gap-4 mt-4 text-[12px] font-medium text-ink">
              <span className="bg-sand px-2 py-1 rounded">Qty: {req.quantity}</span>
              <span className="bg-sand px-2 py-1 rounded">Budget: {req.budget}</span>
            </div>
          </div>
          
          <div className="flex gap-3 shrink-0">
            <RequirementForm requirement={req} />
            <Button 
              variant="outline" 
              onClick={() => handleDelete(req.id)}
              className="text-red-500 border-red-100 hover:bg-red-50 font-bold"
            >
              <Trash2 size={16} className="mr-2" /> Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
