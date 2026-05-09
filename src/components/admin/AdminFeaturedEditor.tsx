import { useState } from "react";
import { useFeaturedProjects, useUpsertFeaturedProject, useDeleteFeaturedProject } from "@/hooks/usePortfolio";
import { useImageUpload } from "@/hooks/useImageUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, Plus } from "lucide-react";
import { toast } from "sonner";
import type { Tables } from "@/integrations/supabase/types";
import MediaPickerModal from "./MediaPickerModal";

const AdminFeaturedEditor = () => {
  const { data: items, isLoading } = useFeaturedProjects();
  const upsert = useUpsertFeaturedProject();
  const remove = useDeleteFeaturedProject();
  const { upload, uploading } = useImageUpload();
  const [editing, setEditing] = useState<Partial<Tables<"featured_projects">> | null>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editing) return;
    try {
      const url = await upload(file, `featured/${Date.now()}.${file.name.split(".").pop()}`);
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
        year: editing.year || "",
        image_url: editing.image_url,
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
        <h2 className="font-display text-2xl font-bold text-foreground">Featured Projects</h2>
        <Button 
          size="sm" 
          onClick={() => setEditing({ title: "", category: "", year: "", image_url: "", sort_order: (items?.length ?? 0) })}
          aria-label="Add new featured project"
        >
          <Plus className="w-4 h-4 mr-1" aria-hidden="true" /> Add
        </Button>
      </div>

      {editing && (
        <div className="p-6 rounded-lg border border-border bg-card space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="featured-title" className="text-muted-foreground">Title</Label>
              <Input id="featured-title" value={editing.title || ""} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className="bg-background border-border text-foreground" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="featured-category" className="text-muted-foreground">Category</Label>
              <Input id="featured-category" value={editing.category || ""} onChange={(e) => setEditing({ ...editing, category: e.target.value })} className="bg-background border-border text-foreground" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="featured-year" className="text-muted-foreground">Year</Label>
              <Input id="featured-year" value={editing.year || ""} onChange={(e) => setEditing({ ...editing, year: e.target.value })} className="bg-background border-border text-foreground" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="featured-image" className="text-muted-foreground">Image</Label>
            {editing.image_url && <img src={editing.image_url} alt="Featured project preview" className="w-40 h-28 object-cover rounded-md" />}
            <div className="flex gap-2">
              <MediaPickerModal onSelect={(url) => setEditing({ ...editing, image_url: url })}>
                <Button 
                  type="button" 
                  variant="outline" 
                  className="shrink-0 bg-background"
                  aria-label="Browse media library for featured project image"
                >
                  Browse Library
                </Button>
              </MediaPickerModal>
              <Input 
                id="featured-image" 
                type="file" 
                accept="image/*" 
                onChange={handleImageUpload} 
                disabled={uploading} 
                className="bg-background border-border text-foreground w-full" 
                aria-label="Upload featured project image from your device"
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
              <p className="text-muted-foreground text-xs">{item.category} · {item.year}</p>
            </div>
            <Button size="sm" variant="ghost" onClick={() => setEditing(item)}>Edit</Button>
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={() => { remove.mutate(item.id); toast.success("Deleted"); }}
              aria-label={`Delete featured project ${item.title}`}
            >
              <Trash2 className="w-4 h-4 text-destructive" aria-hidden="true" />
            </Button>
          </div>
        ))}
        {(!items || items.length === 0) && <p className="text-muted-foreground text-sm">No featured projects yet.</p>}
      </div>
    </div>
  );
};

export default AdminFeaturedEditor;
