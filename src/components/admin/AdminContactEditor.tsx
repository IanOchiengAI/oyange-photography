import { useState, useEffect } from "react";
import { useUpsertContent, useSiteContent } from "@/hooks/useSiteContent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const fields = [
  { key: "heading_line1", label: "Heading Line 1", fallback: "Let's Create" },
  { key: "heading_line2", label: "Heading Line 2 (gradient)", fallback: "Together" },
  { key: "address", label: "Address", fallback: "Westlands, Nairobi, Kenya" },
  { key: "email", label: "Email", fallback: "hello@oyangephotography.co.ke" },
  { key: "phone", label: "Phone", fallback: "+254 700 000 000" },
  { key: "instagram", label: "Instagram Username (no @)", fallback: "oyange_photography" },
  { key: "facebook", label: "Facebook Page slug", fallback: "oyangephotography" },
  { key: "instagram_feed_url", label: "Instagram Feed Embed/URL", fallback: "" },
];

const AdminContactEditor = () => {
  const { data: content, isLoading } = useSiteContent("contact");
  const upsert = useUpsertContent();
  const [values, setValues] = useState<Record<string, string>>({});

  useEffect(() => {
    if (content) {
      const map: Record<string, string> = {};
      content.forEach((r) => (map[r.key] = r.value));
      setValues(map);
    }
  }, [content]);

  const save = async (key: string) => {
    try {
      await upsert.mutateAsync({ section: "contact", key, value: values[key] || "" });
      toast.success("Saved");
    } catch {
      toast.error("Failed to save");
    }
  };

  if (isLoading) return <p className="text-muted-foreground">Loading...</p>;

  return (
    <div className="space-y-8">
      <h2 className="font-display text-2xl font-bold text-foreground">Contact Section</h2>
      {fields.map((f) => (
        <div key={f.key} className="space-y-4 p-4 border border-border rounded-lg bg-card">
          <div className="space-y-2">
            <Label htmlFor={`contact-${f.key}`} className="text-muted-foreground">{f.label}</Label>
            <Input
              id={`contact-${f.key}`}
              value={values[f.key] ?? f.fallback}
              onChange={(e) => setValues({ ...values, [f.key]: e.target.value })}
              className="bg-transparent border-border text-foreground"
            />
          </div>
          <Button size="sm" onClick={() => save(f.key)} disabled={upsert.isPending}>Save {f.label}</Button>
        </div>
      ))}
    </div>
  );
};

export default AdminContactEditor;
