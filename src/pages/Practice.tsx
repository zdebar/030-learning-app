import { supabaseInstance } from "@/config/supabase.config";
import { useFetchStorage } from "@/hooks/use-fetch-storage";
import { useAuthStore } from "@/features/auth/auth-store";
import { useParams } from "react-router-dom";
import Explanation from "@/features/practice/Explanation";
import { findSessionIndex } from "@/features/practice/practice.utils";

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

  const sessionIndex = findSessionIndex(
    data?.user_progress.pointsAchieved,
    data?.user_progress.pointsRequired
  );

  const exercise = data?.exercise;

  if (error) return <div>Error: {error}</div>;
  if (loading || !data) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex justify-between">
        <h1>{data.explanation.name}</h1>
        <p>
          Skóre: {data?.user_progress?.points_achieved?.[sessionIndex] || 0} /{" "}
          {data?.user_progress?.points_required?.[sessionIndex] || 0}
        </p>
      </div>
      <Explanation content={data.explanation.content} />
      <p>Název: {exercise.name}</p>
      <p>Typ cvičení: {exercise.type}</p>
      <p>Maximální zisk bodů: {exercise.points}</p>
      <p>Úkol: {exercise.content.question}</p>
      <p>Zadání: {exercise.content.asignment}</p>
      {/* {exercise.content.solutions.map((sol, idx: number) => (
        <div key={idx} className="mb-4">
          <h3>Řešení {idx + 1}:</h3>
        </div>
      ))} */}
    </div>
  );
}
