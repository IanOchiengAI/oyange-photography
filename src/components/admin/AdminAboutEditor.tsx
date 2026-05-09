import { useState, useEffect } from "react";
import { useUpsertContent, useSiteContent } from "@/hooks/useSiteContent";
import { useImageUpload } from "@/hooks/useImageUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import MediaPickerModal from "./MediaPickerModal";

const textFields = [
  { key: "heading_line1", label: "Heading Line 1", fallback: "Every Frame" },
  { key: "heading_line2", label: "Heading Line 2 (gradient)", fallback: "Tells a Story" },
  { key: "paragraph1", label: "Paragraph 1", fallback: "Based in the heart of Nairobi, Oyange Photography has been crafting visual narratives for over a decade.", textarea: true },
  { key: "paragraph2", label: "Paragraph 2", fallback: "From intimate weddings in the Rift Valley to high-end commercial campaigns.", textarea: true },
  { key: "stat1_num", label: "Stat 1 Number", fallback: "200+" },
  { key: "stat1_label", label: "Stat 1 Label", fallback: "Projects" },
  { key: "stat2_num", label: "Stat 2 Number", fallback: "12" },
  { key: "stat2_label", label: "Stat 2 Label", fallback: "Years" },
  { key: "stat3_num", label: "Stat 3 Number", fallback: "50+" },
  { key: "stat3_label", label: "Stat 3 Label", fallback: "Awards" },
];

const AdminAboutEditor = () => {
  const { data: content, isLoading } = useSiteContent("about");
  const upsert = useUpsertContent();
  const { upload, uploading } = useImageUpload();
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
      await upsert.mutateAsync({ section: "about", key, value: values[key] || "" });
      toast.success(`Saved`);
    } catch {
      toast.error("Failed to save");
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const url = await upload(file, `about/${Date.now()}-${key}.${file.name.split(".").pop()}`);
      await upsert.mutateAsync({ section: "about", key, value: url });
      setValues((v) => ({ ...v, [key]: url }));
      toast.success("Image uploaded successfully");
    } catch {
      toast.error("Upload failed — check you are logged in as admin");
    }
  };

  if (isLoading) return <p className="text-muted-foreground">Loading...</p>;

  return (
    <div className="space-y-8">
      <h2 className="font-display text-2xl font-bold text-foreground">About Section</h2>

      {textFields.map((f) => (
        <div key={f.key} className="space-y-2">
          <Label htmlFor={f.key} className="text-muted-foreground">{f.label}</Label>
          {f.textarea ? (
            <Textarea 
              id={f.key}
              value={values[f.key] ?? f.fallback} 
              onChange={(e) => setValues({ ...values, [f.key]: e.target.value })} 
              className="bg-card border-border text-foreground" 
            />
          ) : (
            <Input 
              id={f.key}
              value={values[f.key] ?? f.fallback} 
              onChange={(e) => setValues({ ...values, [f.key]: e.target.value })} 
              className="bg-card border-border text-foreground" 
            />
          )}
          <Button 
            size="sm" 
            onClick={() => save(f.key)} 
            disabled={upsert.isPending}
            aria-label={`Save ${f.label}`}
          >
            Save Changes
          </Button>
        </div>
      ))}

      <div className="rounded-lg border border-border bg-muted/20 p-4 mb-2">
        <p className="text-xs text-muted-foreground leading-relaxed">
          <span className="text-foreground font-semibold">About section layout:</span> Two overlapping images appear on the right side of the About section.
          The <span className="text-primary">top image</span> is large (background) — use a landscape or action shot.
          The <span className="text-primary">bottom image</span> is smaller (foreground) — ideal for a portrait or face shot of Oyange.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { key: "about_img1", label: "Top Image (large background)", hint: "Best: landscape, wide shot, action" },
          { key: "about_img2", label: "Bottom Image (foreground — client portrait)", hint: "Best: portrait, face shot, close-up of Oyange" },
        ].map(({ key, label, hint }) => (
          <div key={key} className="space-y-2">
            <Label htmlFor={key} className="text-muted-foreground">{label}</Label>
            <p className="text-xs text-muted-foreground/60">{hint}</p>
            {values[key] && <img src={values[key]} alt={label} className="w-full h-48 object-cover rounded-md border border-border" />}
            <div className="flex gap-2">
              <MediaPickerModal onSelect={async (url) => {
                try {
                  await upsert.mutateAsync({ section: "about", key, value: url });
                  setValues((v) => ({ ...v, [key]: url }));
                  toast.success("Image updated");
                } catch {
                  toast.error("Failed to update image");
                }
              }}>
                <Button
                  type="button"
                  variant="outline"
                  className="shrink-0 bg-background"
                  aria-label={`Browse media library for ${label}`}
                >
                  Browse Library
                </Button>
              </MediaPickerModal>
              <Input
                id={key}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={(e) => handleImageUpload(e, key)}
                disabled={uploading}
                className="bg-card border-border text-foreground w-full"
                aria-label={`Upload ${label} from your device`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminAboutEditor;
