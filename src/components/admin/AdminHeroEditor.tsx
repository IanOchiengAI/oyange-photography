import { useState, useEffect } from "react";
import { useUpsertContent, useSiteContent } from "@/hooks/useSiteContent";
import { useImageUpload } from "@/hooks/useImageUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import MediaPickerModal from "./MediaPickerModal";

const fields = [
  { key: "headline", label: "Headline Words (comma separated)", fallback: "Capturing Light, Crafting Legacy" },
  { key: "location", label: "Location Text", fallback: "Nairobi, Kenya" },
  { key: "subtitle", label: "Subtitle", fallback: "Premium photography for those who demand excellence" },
  { key: "trust_text", label: "Trust Badge Text", fallback: "Trusted by 200+ clients across East Africa" },
];

const AdminHeroEditor = () => {
  const { data: content, isLoading } = useSiteContent("hero");
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
      await upsert.mutateAsync({ section: "hero", key, value: values[key] || "" });
      toast.success(`Saved ${key}`);
    } catch {
      toast.error("Failed to save");
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const url = await upload(file, `hero/${key}.${file.name.split(".").pop()}`);
      await upsert.mutateAsync({ section: "hero", key, value: url });
      toast.success("Image uploaded");
    } catch {
      toast.error("Upload failed");
    }
  };

  if (isLoading) return <p className="text-muted-foreground">Loading...</p>;

  return (
    <div className="space-y-8">
      <h2 className="font-display text-2xl font-bold text-foreground">Hero Section</h2>

      {fields.map((f) => (
        <div key={f.key} className="space-y-2">
          <Label htmlFor={f.key} className="text-muted-foreground">{f.label}</Label>
          {f.key === "subtitle" ? (
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

      <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 space-y-3">
        <h3 className="font-display text-base font-bold text-foreground">Share / Social Preview Image</h3>
        <p className="text-xs text-muted-foreground">This image appears when someone shares the website on WhatsApp, iMessage, Instagram, etc. Use a portrait or a strong single photo — ideally square or 1200×630px.</p>
        {values["og_image"] && (
          <img src={values["og_image"]} alt="Share preview" className="w-48 h-32 object-cover rounded-md border border-border" />
        )}
        <div className="flex gap-2">
          <MediaPickerModal onSelect={async (url) => {
            try {
              await upsert.mutateAsync({ section: "hero", key: "og_image", value: url });
              setValues({ ...values, og_image: url });
              toast.success("Share image updated");
            } catch {
              toast.error("Failed to save");
            }
          }}>
            <Button type="button" variant="outline" className="shrink-0 bg-background">
              Choose from Library
            </Button>
          </MediaPickerModal>
          <Input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              try {
                const url = await upload(file, `seo/og-image.${file.name.split(".").pop()}`);
                await upsert.mutateAsync({ section: "hero", key: "og_image", value: url });
                setValues({ ...values, og_image: url });
                toast.success("Share image uploaded");
              } catch {
                toast.error("Upload failed");
              }
            }}
            disabled={uploading}
            className="bg-card border-border text-foreground w-full"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-muted-foreground">Showreel URL (YouTube or Vimeo — leave blank to hide the section)</Label>
        <div className="flex gap-2">
          <Input
            value={values["reel_url"] ?? ""}
            onChange={(e) => setValues({ ...values, reel_url: e.target.value })}
            placeholder="https://www.youtube.com/watch?v=..."
            className="bg-card border-border text-foreground"
          />
          <Button size="sm" onClick={() => upsert.mutateAsync({ section: "video", key: "reel_url", value: values["reel_url"] || "" }).then(() => toast.success("Saved")).catch(() => toast.error("Failed"))} disabled={upsert.isPending}>
            Save
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {["hero_bg", "hero_mid"].map((key) => (
          <div key={key} className="space-y-2">
            <Label htmlFor={key} className="text-muted-foreground">{key === "hero_bg" ? "Background Image" : "Midground Image"}</Label>
            {values[key] && (
              <img src={values[key]} alt={`${key === "hero_bg" ? "Background" : "Midground"} preview`} className="w-full h-40 object-cover rounded-md" />
            )}
            <div className="flex gap-2">
              <MediaPickerModal onSelect={async (url) => {
                try {
                  await upsert.mutateAsync({ section: "hero", key, value: url });
                  toast.success("Image selected");
                } catch {
                  toast.error("Failed to update image");
                }
              }}>
                <Button 
                  type="button" 
                  variant="outline" 
                  className="shrink-0 bg-background"
                  aria-label={`Browse media library for ${key === "hero_bg" ? "background" : "midground"} image`}
                >
                  Browse Library
                </Button>
              </MediaPickerModal>
              <Input id={key} type="file" accept="image/*" onChange={(e) => handleImageUpload(e, key)} disabled={uploading} className="bg-card border-border text-foreground w-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminHeroEditor;
