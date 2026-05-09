import { useState } from "react";
import { usePackages, useUpsertPackage, useDeletePackage } from "@/hooks/usePortfolio";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Trash2, Plus, Save, GripVertical } from "lucide-react";
import { toast } from "sonner";

const AdminPackagesEditor = () => {
  const { data: packages, isLoading } = usePackages();
  const upsertMutation = useUpsertPackage();
  const deleteMutation = useDeletePackage();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", price_label: "", features: "", highlighted: false, sort_order: 0 });

  const startEdit = (pkg: any) => {
    setEditingId(pkg.id);
    setForm({
      name: pkg.name,
      price_label: pkg.price_label,
      features: pkg.features.join("\n"),
      highlighted: pkg.highlighted,
      sort_order: pkg.sort_order,
    });
  };

  const startNew = () => {
    setEditingId("new");
    setForm({ name: "", price_label: "", features: "", highlighted: false, sort_order: (packages?.length || 0) * 10 });
  };

  const handleSave = async () => {
    if (!form.name.trim() || !form.price_label.trim()) {
      toast.error("Name and price are required");
      return;
    }
    const features = form.features.split("\n").map(f => f.trim()).filter(Boolean);
    const payload: any = {
      name: form.name.trim(),
      price_label: form.price_label.trim(),
      features,
      highlighted: form.highlighted,
      sort_order: form.sort_order,
    };
    if (editingId !== "new") payload.id = editingId;

    try {
      await upsertMutation.mutateAsync(payload);
      toast.success("Package saved");
      setEditingId(null);
    } catch {
      toast.error("Failed to save");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this package?")) return;
    try {
      await deleteMutation.mutateAsync(id);
      toast.success("Package deleted");
    } catch {
      toast.error("Failed to delete");
    }
  };

  if (isLoading) return <p className="text-muted-foreground">Loading...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-bold text-foreground">Packages</h2>
        <Button onClick={startNew} size="sm"><Plus className="w-4 h-4 mr-1" /> Add Package</Button>
      </div>

      {editingId && (
        <div className="border border-border rounded-lg p-4 mb-6 space-y-4 bg-card">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="pkg-name">Package Name</Label>
              <Input id="pkg-name" placeholder="Package name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pkg-price">Price Label</Label>
              <Input id="pkg-price" placeholder="Price label (e.g. From KSh 15,000)" value={form.price_label} onChange={e => setForm(f => ({ ...f, price_label: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pkg-features">Features (one per line)</Label>
              <textarea
                id="pkg-features"
                placeholder="Features (one per line)"
                value={form.features}
                onChange={e => setForm(f => ({ ...f, features: e.target.value }))}
                rows={5}
                className="w-full bg-transparent border border-border rounded-md px-3 py-2 text-sm font-body text-foreground focus:ring-1 focus:ring-primary outline-none"
              />
            </div>
            <div className="flex items-center gap-3">
              <Switch id="pkg-highlight" checked={form.highlighted} onCheckedChange={v => setForm(f => ({ ...f, highlighted: v }))} />
              <Label htmlFor="pkg-highlight" className="text-sm text-muted-foreground font-body cursor-pointer">Highlighted (Most Popular)</Label>
            </div>
            <div className="space-y-2">
              <Label htmlFor="pkg-sort">Sort Order</Label>
              <Input id="pkg-sort" type="number" placeholder="Sort order" value={form.sort_order} onChange={e => setForm(f => ({ ...f, sort_order: parseInt(e.target.value) || 0 }))} />
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSave} size="sm" aria-label={editingId === "new" ? "Create new package" : "Update package details"}>
              <Save className="w-4 h-4 mr-1" aria-hidden="true" /> Save
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setEditingId(null)} aria-label="Cancel editing">Cancel</Button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {packages?.map(pkg => (
          <div key={pkg.id} className="flex items-center justify-between border border-border rounded-md px-4 py-3 bg-card">
            <div className="flex items-center gap-3">
              <GripVertical className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-foreground">{pkg.name}</p>
                <p className="text-xs text-muted-foreground">{pkg.price_label} · {pkg.features.length} features {pkg.highlighted && "⭐"}</p>
              </div>
            </div>
            <div className="flex gap-1">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => startEdit(pkg)} 
                aria-label={`Edit package ${pkg.name}`}
              >
                Edit
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleDelete(pkg.id)}
                aria-label={`Delete package ${pkg.name}`}
              >
                <Trash2 className="w-4 h-4 text-destructive" aria-hidden="true" />
              </Button>
            </div>
          </div>
        ))}
        {packages?.length === 0 && <p className="text-sm text-muted-foreground">No packages yet. Default ones will show on the site.</p>}
      </div>
    </div>
  );
};

export default AdminPackagesEditor;
