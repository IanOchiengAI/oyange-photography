import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useSiteContent = (section?: string) => {
  return useQuery({
    queryKey: ["site_content", section],
    queryFn: async () => {
      let q = supabase.from("site_content").select("*");
      if (section) q = q.eq("section", section);
      const { data, error } = await q;
      if (error) throw error;
      return data;
    },
  });
};

export const useContentValue = (section: string, key: string, fallback: string) => {
  const { data } = useSiteContent(); // no filter — all sections share one cached query
  const row = data?.find((r) => r.section === section && r.key === key);
  return row?.value ?? fallback;
};

export const useUpsertContent = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ section, key, value }: { section: string; key: string; value: string }) => {
      const { error } = await supabase
        .from("site_content")
        .upsert({ section, key, value }, { onConflict: "section,key" });
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["site_content"] }),
  });
};
