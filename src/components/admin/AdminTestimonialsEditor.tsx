import { useState } from "react";
import { useTestimonials, useUpsertTestimonial, useDeleteTestimonial } from "@/hooks/usePortfolio";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Plus, MessageSquareQuote } from "lucide-react";
import { toast } from "sonner";
import type { Tables } from "@/integrations/supabase/types";
import MediaPickerModal from "./MediaPickerModal";

const AdminTestimonialsEditor = () => {
  const { data: items, isLoading } = useTestimonials();
  const upsert = useUpsertTestimonial();
  const remove = useDeleteTestimonial();
  const [editing, setEditing] = useState<Partial<Tables<"testimonials">> | null>(null);

  const saveItem = async () => {
    if (!editing?.client_name || !editing?.quote) {
      toast.error("Fill in name and quote");
      return;
    }
    try {
      await upsert.mutateAsync({
        id: editing.id,
        client_name: editing.client_name,
        client_title: editing.client_title || "",
        quote: editing.quote,
        avatar_url: editing.avatar_url || null,
        sort_order: editing.sort_order ?? 0,
      });
      setEditing(null);
      toast.success("Saved");
    } catch (e) {
      console.error(e);
      toast.error("Failed to save");
    }
  };

  if (isLoading) return <p className="text-muted-foreground">Loading...</p>;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl font-bold text-foreground flex items-center gap-2">
          <MessageSquareQuote className="w-6 h-6 text-primary" />
          Testimonials
        </h2>
        <Button 
          size="sm" 
          onClick={() => setEditing({ client_name: "", client_title: "", quote: "", sort_order: (items?.length ?? 0) })}
          aria-label="Add new testimonial"
        >
          <Plus className="w-4 h-4 mr-1" aria-hidden="true" /> Add
        </Button>
      </div>

      {editing && (
        <div className="p-6 rounded-lg border border-border bg-card space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="client-name" className="text-muted-foreground">Client Name</Label>
              <Input 
                id="client-name"
                value={editing.client_name || ""} 
                onChange={(e) => setEditing({ ...editing, client_name: e.target.value })} 
                className="bg-background border-border text-foreground" 
                placeholder="e.g. Sarah & James"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="client-title" className="text-muted-foreground">Client Title / Category</Label>
              <Input 
                id="client-title"
                value={editing.client_title || ""} 
                onChange={(e) => setEditing({ ...editing, client_title: e.target.value })} 
                className="bg-background border-border text-foreground" 
                placeholder="e.g. Wedding Clients"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="client-quote" className="text-muted-foreground">Quote</Label>
            <Textarea 
              id="client-quote"
              value={editing.quote || ""} 
              onChange={(e) => setEditing({ ...editing, quote: e.target.value })} 
              className="bg-background border-border text-foreground min-h-[100px]" 
              placeholder="What did they say about your work?"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-muted-foreground">Client Photo (optional)</Label>
            <div className="flex items-center gap-3">
              {editing.avatar_url && (
                <img src={editing.avatar_url} alt="Preview" className="w-12 h-12 rounded-full object-cover border border-border" />
              )}
              <MediaPickerModal onSelect={(url) => setEditing({ ...editing, avatar_url: url })}>
                <Button type="button" variant="outline" size="sm" className="bg-background">
                  {editing.avatar_url ? "Change Photo" : "Choose Photo"}
                </Button>
              </MediaPickerModal>
              {editing.avatar_url && (
                <Button type="button" variant="ghost" size="sm" onClick={() => setEditing({ ...editing, avatar_url: null })}>
                  Remove
                </Button>
              )}
            </div>
          </div>
          <div className="space-y-2 max-w-[150px]">
            <Label htmlFor="client-sort" className="text-muted-foreground">Sort Order</Label>
            <Input
              id="client-sort"
              type="number"
              value={editing.sort_order ?? 0}
              onChange={(e) => setEditing({ ...editing, sort_order: Number(e.target.value) })}
              className="bg-background border-border text-foreground"
            />
          </div>
          <div className="flex gap-3">
            <Button size="sm" onClick={saveItem} disabled={upsert.isPending}>
              {editing.id ? "Update Testimonial" : "Create Testimonial"}
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setEditing(null)}>Cancel</Button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {items?.map((item) => (
          <div key={item.id} className="flex items-center gap-4 p-4 rounded-lg border border-border bg-card">
            <div className="flex-1">
              <p className="text-foreground font-medium text-sm">"{item.quote.substring(0, 80)}..."</p>
              <p className="text-muted-foreground text-xs mt-1">{item.client_name} · {item.client_title}</p>
            </div>
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={() => setEditing(item)}
              aria-label={`Edit testimonial from ${item.client_name}`}
            >
              Edit
            </Button>
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={() => { remove.mutate(item.id); toast.success("Deleted"); }}
              aria-label={`Delete testimonial from ${item.client_name}`}
            >
              <Trash2 className="w-4 h-4 text-destructive" aria-hidden="true" />
            </Button>
          </div>
        ))}
        {(!items || items.length === 0) && <p className="text-muted-foreground text-sm">No testimonials yet. Add one above.</p>}
      </div>
    </div>
  );
};

export default AdminTestimonialsEditor;
