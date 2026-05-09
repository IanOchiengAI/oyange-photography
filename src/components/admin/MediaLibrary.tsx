import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Folder, Image as ImageIcon, UploadCloud, Trash2, Plus, Check } from "lucide-react";
import { useImageUpload } from "@/hooks/useImageUpload";

const DEFAULT_FOLDERS = ["hero", "portfolio", "couples", "adventure", "graduation", "products", "events", "about"];

interface MediaFile {
  name: string;
  path: string;
  url: string;
}

interface MediaLibraryProps {
  onSelect?: (url: string) => void;
}

export const MediaLibrary = ({ onSelect }: MediaLibraryProps) => {
  const [folders, setFolders] = useState<string[]>(DEFAULT_FOLDERS);
  const [currentFolder, setCurrentFolder] = useState<string>("portfolio");
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(false);
  const { upload, uploading } = useImageUpload();
  const [newFolderName, setNewFolderName] = useState("");
  const [isAddingFolder, setIsAddingFolder] = useState(false);

  const fetchFiles = async (folder: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.storage.from("site-images").list(folder, {
        limit: 100,
        offset: 0,
        sortBy: { column: "created_at", order: "desc" },
      });

      if (error) throw error;

      if (data) {
        const fileList = data
          .filter((f) => f.id) // Filter out subdirectories without IDs
          .map((f) => {
            const path = folder ? `${folder}/${f.name}` : f.name;
            const { data: urlData } = supabase.storage.from("site-images").getPublicUrl(path);
            return {
              name: f.name,
              path,
              url: urlData.publicUrl,
            };
          });
        setFiles(fileList);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load images");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles(currentFolder);
  }, [currentFolder]);

  // Fetch unique prefixes/folders from root? 
  // For now, relying on DEFAULT_FOLDERS + any dynamically added by the user during the session.

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const ext = file.name.split(".").pop();
      const path = currentFolder ? `${currentFolder}/${Date.now()}.${ext}` : `${Date.now()}.${ext}`;
      await upload(file, path);
      toast.success("Image uploaded successfully");
      fetchFiles(currentFolder); // refresh current folder
    } catch (err) {
      // upload hook already toasts error
    }
  };

  const handleDelete = async (path: string) => {
    if (!window.confirm("Are you sure you want to delete this image? This might break pages where it is used.")) return;
    try {
      const { error } = await supabase.storage.from("site-images").remove([path]);
      if (error) throw error;
      toast.success("Image deleted");
      setFiles((prev) => prev.filter((f) => f.path !== path));
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete image");
    }
  };

  const addFolder = () => {
    if (!newFolderName.trim()) return;
    const cleanName = newFolderName.trim().toLowerCase().replace(/[^a-z0-9-]/g, "-");
    if (!folders.includes(cleanName)) {
      setFolders([...folders, cleanName]);
    }
    setCurrentFolder(cleanName);
    setIsAddingFolder(false);
    setNewFolderName("");
  };

  return (
    <div className="flex flex-col md:flex-row h-full w-full bg-background border border-border rounded-xl overflow-hidden shadow-sm">
      {/* Sidebar - Folders */}
      <div className="w-full md:w-64 bg-card border-r border-border flex flex-col">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
            <Folder className="w-4 h-4 text-primary" /> Folders
          </h3>
          <Button variant="ghost" size="icon" onClick={() => setIsAddingFolder(!isAddingFolder)} aria-label="Add folder">
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {isAddingFolder && (
          <div className="p-3 border-b border-border bg-muted/30 flex gap-2">
            <Input
              size={1}
              autoFocus
              className="h-8 text-xs bg-background"
              placeholder="Folder name"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addFolder()}
            />
            <Button size="icon" className="h-8 w-8 shrink-0" onClick={addFolder}>
              <Check className="w-4 h-4" />
            </Button>
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {folders.map((folder) => (
            <button
              key={folder}
              onClick={() => setCurrentFolder(folder)}
              className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors ${
                currentFolder === folder
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              }`}
            >
              <Folder className={`w-4 h-4 ${currentFolder === folder ? "fill-primary/20" : ""}`} />
              <span className="capitalize">{folder.replace("-", " ")}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content - Files */}
      <div className="flex-1 flex flex-col min-h-0 bg-card/30">
        <div className="p-4 border-b border-border flex items-center justify-between bg-card">
          <div className="flex items-center gap-3">
            <h2 className="font-display text-lg font-semibold capitalize text-foreground">
              {currentFolder.replace("-", " ")}
            </h2>
            <span className="bg-muted text-muted-foreground text-xs px-2 py-0.5 rounded-full">
              {files.length} items
            </span>
          </div>

          <div className="relative">
            <Button disabled={uploading}>
              <UploadCloud className="w-4 h-4 mr-2" />
              {uploading ? "Uploading..." : "Upload File"}
            </Button>
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer disabled:cursor-not-allowed"
              onChange={handleUpload}
              disabled={uploading}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 lg:p-6">
          {loading ? (
            <div className="flex items-center justify-center p-12 text-muted-foreground">Loading media...</div>
          ) : files.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-center bg-muted/20 border border-dashed border-border rounded-xl">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                <ImageIcon className="w-6 h-6 text-muted-foreground" />
              </div>
              <p className="text-foreground font-medium mb-1">No images in this folder</p>
              <p className="text-sm text-muted-foreground max-w-sm mb-4">
                Upload some images to populate the <span className="capitalize font-medium">{currentFolder.replace("-", " ")}</span> folder.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {files.map((file) => (
                <div key={file.path} className="group relative aspect-square rounded-xl overflow-hidden border border-border bg-black/5">
                  <img src={file.url} alt={file.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col">
                    <div className="p-2 flex justify-end">
                      <Button 
                        size="icon" 
                        variant="destructive" 
                        className="w-7 h-7 rounded-full shadow-md z-10"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(file.path);
                        }}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                    
                    <div className="mt-auto p-3 bg-gradient-to-t from-black/80 to-transparent">
                      <p className="text-white text-xs truncate mb-2">{file.name}</p>
                      {onSelect && (
                        <Button 
                          size="sm" 
                          className="w-full h-8 text-xs font-semibold" 
                          onClick={() => onSelect(file.url)}
                        >
                          Select Image
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MediaLibrary;
