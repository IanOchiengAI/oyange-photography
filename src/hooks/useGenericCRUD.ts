import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type PublicSchema = Database["public"];
type TableName = keyof PublicSchema["Tables"];

export function createCRUDHooks<T extends TableName>(tableName: T) {
  return {
    useList: (
      orderBy: keyof PublicSchema["Tables"][T]["Row"] = "created_at" as keyof PublicSchema["Tables"][T]["Row"],
      ascending = true
    ) =>
      useQuery({
        queryKey: [tableName],
        queryFn: async () => {
          const { data, error } = await supabase
            .from(tableName as string)
            .select("*")
            .order(orderBy as string, { ascending });
          if (error) throw error;
          return data;
        },
      }),

    useUpsert: () => {
      const qc = useQueryClient();
      return useMutation({
        mutationFn: async (
          item: PublicSchema["Tables"][T]["Insert"] & { id?: string | number }
        ) => {
          if (item.id) {
            const { error } = await supabase
              .from(tableName as string)
              .update(item as PublicSchema["Tables"][T]["Update"])
              .eq("id" as any, item.id);
            if (error) throw error;
          } else {
            const { error } = await supabase.from(tableName as string).insert(item as PublicSchema["Tables"][T]["Insert"]);
            if (error) throw error;
          }
        },
        onSuccess: () => qc.invalidateQueries({ queryKey: [tableName] }),
      });
    },

    useDelete: () => {
      const qc = useQueryClient();
      return useMutation({
        mutationFn: async (id: string | number) => {
          const { error } = await supabase
            .from(tableName as string)
            .delete()
            .eq("id" as any, id);
          if (error) throw error;
        },
        onSuccess: () => qc.invalidateQueries({ queryKey: [tableName] }),
      });
    },
  };
}
