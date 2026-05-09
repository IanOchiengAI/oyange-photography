import { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Trash2, Mail, MailOpen } from "lucide-react";
import { toast } from "sonner";

interface Submission {
  id: string;
  name: string;
  email: string;
  project_type: string | null;
  message: string | null;
  read: boolean;
  created_at: string;
}

interface Props {
  onUnreadCountChange?: (count: number) => void;
}

const AdminMessagesViewer = ({ onUnreadCountChange }: Props) => {
  const { data: submissions = [], isLoading: loading } = useQuery({
    queryKey: ["contact_submissions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contact_submissions")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Submission[];
    },
  });

  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: async ({ id, read }: { id: string; read: boolean }) => {
      const { error } = await supabase
        .from("contact_submissions")
        .update({ read })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contact_submissions"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("contact_submissions")
        .delete()
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contact_submissions"] });
      toast.success("Message deleted");
    },
  });

  useEffect(() => {
    if (submissions) {
      onUnreadCountChange?.(submissions.filter((s) => !s.read).length);
    }
  }, [submissions, onUnreadCountChange]);

  const toggleRead = (id: string, currentRead: boolean) => {
    updateMutation.mutate({ id, read: !currentRead });
  };

  const deleteSubmission = (id: string) => {
    deleteMutation.mutate(id);
  };

  if (loading) return <p className="text-muted-foreground">Loading messages...</p>;

  if (submissions.length === 0)
    return <p className="text-muted-foreground">No messages yet.</p>;

  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-foreground mb-6">Messages</h2>
      <div className="rounded-md border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Status</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Project</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="w-20">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {submissions.map((s) => (
              <TableRow key={s.id} className={s.read ? "opacity-60" : ""}>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleRead(s.id, s.read)}
                    aria-label={s.read ? "Mark as unread" : "Mark as read"}
                    title={s.read ? "Mark unread" : "Mark read"}
                  >
                    {s.read ? <MailOpen className="w-4 h-4" aria-hidden="true" /> : <Mail className="w-4 h-4 text-primary" aria-hidden="true" />}
                  </Button>
                </TableCell>
                <TableCell className="font-medium">{s.name}</TableCell>
                <TableCell>{s.email}</TableCell>
                <TableCell>{s.project_type || "—"}</TableCell>
                <TableCell className="max-w-xs truncate">{s.message || "—"}</TableCell>
                <TableCell className="text-muted-foreground text-xs whitespace-nowrap">
                  {new Date(s.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteSubmission(s.id)}
                    className="text-destructive hover:text-destructive"
                    aria-label={`Delete message from ${s.name}`}
                  >
                    <Trash2 className="w-4 h-4" aria-hidden="true" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminMessagesViewer;
