import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"];

// Note: A Supabase storage policy should also enforce this server-side
export const useImageUpload = () => {
  const [uploading, setUploading] = useState(false);

  const upload = async (file: File, path?: string): Promise<string> => {
    // Validation
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      const error = "Unsupported file type. Please upload a JPEG, PNG, or WebP image.";
      toast.error(error);
      throw new Error(error);
    }

    if (file.size > MAX_FILE_SIZE) {
      const error = `File is too large (${(file.size / 1024 / 1024).toFixed(1)}MB). Max size is 5MB.`;
      toast.error(error);
      throw new Error(error);
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.info("This is a large file, it may take a moment to upload and load on the site.");
    }

    setUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const filePath = path || `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error } = await supabase.storage
        .from("site-images")
        .upload(filePath, file, { upsert: true });
      if (error) throw error;
      const { data } = supabase.storage.from("site-images").getPublicUrl(filePath);
      return data.publicUrl;
    } finally {
      setUploading(false);
    }
  };

  return { upload, uploading };
};

