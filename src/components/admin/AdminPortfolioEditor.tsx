import { useState } from "react";
import { usePortfolioItems, useUpsertPortfolioItem, useDeletePortfolioItem } from "@/hooks/usePortfolio";
import { useImageUpload } from "@/hooks/useImageUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, Plus } from "lucide-react";
import { toast } from "sonner";
import type { Tables } from "@/integrations/supabase/types";
import MediaPickerModal from "./MediaPickerModal";

const spanOptions = ["", "md:col-span-2 md:row-span-2", "md:col-span-2", "md:row-span-2"];

const AdminPortfolioEditor = () => {
  const { data: items, isLoading } = usePortfolioItems();
  const upsert = useUpsertPortfolioItem();
  const remove = useDeletePortfolioItem();
  const { upload, uploading } = useImageUpload();
  const [editing, setEditing] = useState<Partial<Tables<"portfolio_items">> | null>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editing) return;
    try {
      const url = await upload(file, `portfolio/${Date.now()}.${file.name.split(".").pop()}`);
      setEditing({ ...editing, image_url: url });
    } catch {
      toast.error("Upload failed");
    }
  };

  const saveItem = async () => {
    if (!editing?.title || !editing?.category || !editing?.image_url) {
      toast.error("Fill in title, category, and image");
      return;
    }
    try {
      await upsert.mutateAsync({
        id: editing.id,
        title: editing.title,
        category: editing.category,
        image_url: editing.image_url,
        span_class: editing.span_class || "",
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
        <h2 className="font-display text-2xl font-bold text-foreground">Portfolio Items</h2>
        <Button 
          size="sm" 
          onClick={() => setEditing({ title: "", category: "", image_url: "", span_class: "", sort_order: (items?.length ?? 0) })}
          aria-label="Add new portfolio item"
        >
          <Plus className="w-4 h-4 mr-1" aria-hidden="true" /> Add
        </Button>
      </div>

      {editing && (
        <div className="p-6 rounded-lg border border-border bg-card space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="portfolio-title" className="text-muted-foreground">Title</Label>
                <Input id="portfolio-title" value={editing.title || ""} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className="bg-background border-border text-foreground" placeholder="e.g. Sunset Vows" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="portfolio-category" className="text-muted-foreground">Category / Album</Label>
                <Input 
                  id="portfolio-category" 
                  value={editing.category || ""} 
                  onChange={(e) => setEditing({ ...editing, category: e.target.value })} 
                  className="bg-background border-border text-foreground" 
                  placeholder="e.g. Wedding, Portrait, Commercial" 
                  aria-describedby="category-help"
                />
                <p id="category-help" className="text-[10px] text-muted-foreground">Photos with the same category will be grouped into one 'Album' filter.</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="grid-layout" className="text-muted-foreground">Grid Layout Size</Label>
                <select
                  id="grid-layout"
                  value={editing.span_class || ""}
                  onChange={(e) => setEditing({ ...editing, span_class: e.target.value })}
                  className="w-full bg-background border border-border text-foreground rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-primary outline-none"
                >
                  <option value="">Square (1x1)</option>
                  <option value="md:col-span-2">Wide (2x1)</option>
                  <option value="md:row-span-2">Tall (1x2)</option>
                  <option value="md:col-span-2 md:row-span-2">Large (2x2)</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="sort-order" className="text-muted-foreground">Sort Order</Label>
                <Input id="sort-order" type="number" value={editing.sort_order ?? 0} onChange={(e) => setEditing({ ...editing, sort_order: Number(e.target.value) })} className="bg-background border-border text-foreground" />
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="portfolio-image" className="text-muted-foreground">Image</Label>
            {editing.image_url && <img src={editing.image_url} alt="Portfolio item preview" className="w-40 h-28 object-cover rounded-md" />}
            <div className="flex gap-2">
              <MediaPickerModal onSelect={(url) => setEditing({ ...editing, image_url: url })}>
                <Button 
                  type="button" 
                  variant="outline" 
                  className="shrink-0 bg-background"
                  aria-label="Browse media library for portfolio item image"
                >
                  Browse Library
                </Button>
              </MediaPickerModal>
              <Input 
                id="portfolio-image" 
                type="file" 
                accept="image/*" 
                onChange={handleImageUpload} 
                disabled={uploading} 
                className="bg-background border-border text-foreground w-full" 
                aria-label="Upload portfolio image from your device"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <Button size="sm" onClick={saveItem} disabled={upsert.isPending}>{editing.id ? "Update" : "Create"}</Button>
            <Button size="sm" variant="ghost" onClick={() => setEditing(null)}>Cancel</Button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {items?.map((item) => (
          <div key={item.id} className="flex items-center gap-4 p-4 rounded-lg border border-border bg-card">
            <img src={item.image_url} alt={item.title} className="w-20 h-14 object-cover rounded" />
            <div className="flex-1">
              <p className="text-foreground font-medium text-sm">{item.title}</p>
              <p className="text-muted-foreground text-xs">{item.category} — Order: {item.sort_order}</p>
            </div>
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={() => setEditing(item)}
              aria-label={`Edit portfolio item ${item.title}`}
            >
              Edit
            </Button>
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={() => { remove.mutate(item.id); toast.success("Deleted"); }}
              aria-label={`Delete portfolio item ${item.title}`}
            >
              <Trash2 className="w-4 h-4 text-destructive" aria-hidden="true" />
            </Button>
          </div>
        ))}
        {(!items || items.length === 0) && <p className="text-muted-foreground text-sm">No portfolio items yet. Add one above.</p>}
      </div>
    </div>
  );
};

export default AdminPortfolioEditor;;
