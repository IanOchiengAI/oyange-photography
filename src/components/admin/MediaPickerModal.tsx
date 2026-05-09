import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import MediaLibrary from "./MediaLibrary";
import { Image } from "lucide-react";

interface MediaPickerModalProps {
  onSelect: (url: string) => void;
  children: React.ReactNode;
}

export const MediaPickerModal = ({ onSelect, children }: MediaPickerModalProps) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (url: string) => {
    onSelect(url);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-7xl w-[95vw] h-[85vh] p-0 overflow-hidden flex flex-col rounded-xl border-border bg-card">
        <DialogHeader className="p-4 border-b border-border bg-muted/30">
          <DialogTitle className="font-display flex items-center gap-2 text-foreground">
            <Image className="w-5 h-5 text-primary" /> Select Media
          </DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-hidden">
          <MediaLibrary onSelect={handleSelect} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MediaPickerModal;
