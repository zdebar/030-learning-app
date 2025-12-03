import { supabaseInstance } from "@/config/supabase.config";
import { useFetchStorage } from "@/hooks/use-fetch-storage";
import { useAuthStore } from "@/features/auth/auth-store";
import { useParams } from "react-router-dom";
import Explanation from "@/features/practice/Explanation";

export default function Practice() {
  const { userId } = useAuthStore();
  const { id } = useParams();

  // Fetch exercise data
  const { data, error, loading } = useFetchStorage(
    `chapter_practice_${id}_1`,
    async () => {
      const { data, error } = await supabaseInstance.rpc("get_practice", {
        user_id: userId,
        practice_chapter_id: Number(id),
      });
      console.log(data, error);
      if (error) throw error;
      return data;
    }
  );

  if (error) return <div>Error: {error}</div>;
  if (loading || !data) return <div>Loading...</div>;

  return (
    <div>
      <Explanation explanation={data.explanation} />
    </div>
  );
}
