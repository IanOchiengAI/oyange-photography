import { useState } from "react";
import { useServices, useUpsertService, useDeleteService } from "@/hooks/usePortfolio";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Plus } from "lucide-react";
import { toast } from "sonner";
import type { Tables } from "@/integrations/supabase/types";

const iconOptions = ["Heart", "Camera", "Building2", "Sparkles", "Image", "Film", "Globe", "Users", "Star"];

const AdminServicesEditor = () => {
  const { data: items, isLoading } = useServices();
  const upsert = useUpsertService();
  const remove = useDeleteService();
  const [editing, setEditing] = useState<Partial<Tables<"services">> | null>(null);

  const saveItem = async () => {
    if (!editing?.title) {
      toast.error("Title is required");
      return;
    }
    try {
      await upsert.mutateAsync({
        id: editing.id,
        title: editing.title,
        description: editing.description || "",
        icon_name: editing.icon_name || "Camera",
        sort_order: editing.sort_order ?? 0,
      });
      setEditing(null);
      toast.success("Saved");
    } catch {
      toast.error("Failed to save");
    }
  };

  if (isLoading) return <p className="text-muted-foreground">Loading...</p>;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl font-bold text-foreground">Services</h2>
        <Button 
          size="sm" 
          onClick={() => setEditing({ title: "", description: "", icon_name: "Camera", sort_order: (items?.length ?? 0) })}
          aria-label="Add new service"
        >
          <Plus className="w-4 h-4 mr-1" aria-hidden="true" /> Add
        </Button>
      </div>

      {editing && (
        <div className="p-6 rounded-lg border border-border bg-card space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="service-title" className="text-muted-foreground">Title</Label>
              <Input id="service-title" value={editing.title || ""} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className="bg-background border-border text-foreground" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="service-icon" className="text-muted-foreground">Icon</Label>
              <select
                id="service-icon"
                value={editing.icon_name || "Camera"}
                onChange={(e) => setEditing({ ...editing, icon_name: e.target.value })}
                className="w-full bg-background border border-border text-foreground rounded-md px-3 py-2 text-sm"
              >
                {iconOptions.map((i) => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="service-sort" className="text-muted-foreground">Sort Order</Label>
              <Input id="service-sort" type="number" value={editing.sort_order ?? 0} onChange={(e) => setEditing({ ...editing, sort_order: Number(e.target.value) })} className="bg-background border-border text-foreground" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="service-desc" className="text-muted-foreground">Description</Label>
            <Textarea id="service-desc" value={editing.description || ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })} className="bg-background border-border text-foreground" />
          </div>
          <div className="flex gap-3">
            <Button 
              size="sm" 
              onClick={saveItem} 
              disabled={upsert.isPending}
              aria-label={editing.id ? "Update service details" : "Create new service"}
            >
              {editing.id ? "Update" : "Create"}
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setEditing(null)} aria-label="Cancel editing">Cancel</Button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {items?.map((item) => (
          <div key={item.id} className="flex items-center gap-4 p-4 rounded-lg border border-border bg-card">
            <div className="flex-1">
              <p className="text-foreground font-medium text-sm">{item.title}</p>
              <p className="text-muted-foreground text-xs">{item.icon_name} · {item.description?.slice(0, 50)}</p>
            </div>
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={() => setEditing(item)}
              aria-label={`Edit service ${item.title}`}
            >
              Edit
            </Button>
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={() => { remove.mutate(item.id); toast.success("Deleted"); }}
              aria-label={`Delete service ${item.title}`}
            >
              <Trash2 className="w-4 h-4 text-destructive" aria-hidden="true" />
            </Button>
          </div>
        ))}
        {(!items || items.length === 0) && <p className="text-muted-foreground text-sm">No services yet.</p>}
      </div>
    </div>
  );
};

export default AdminServicesEditor;
