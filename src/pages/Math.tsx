import { supabaseInstance } from "@/config/supabase.config";
import { useFetch } from "../hooks/use-fetch";
import { useAuthStore } from "@/features/auth/auth-store";
import { type SchoolLevelOverviewType } from "@/database/overview.datatypes";
import SchoolLevelOverview from "@/components/Layout/overview/SchoolLevelOverview";
export default function Math() {
  const { userId } = useAuthStore();

  // Fetch subject overview data
  const {
    data: overview,
    error,
    loading,
  } = useFetch(async () => {
    const { data, error } = await supabaseInstance.rpc("subject_overview", {
      user_id: userId,
      subject_id: 1,
    });
    if (error) throw error;
    return data;
  });

  if (error) return <div>Error: {error}</div>;
  if (loading || !overview) return <div>Loading...</div>;

  return (
    <div>
      {overview.map((level: SchoolLevelOverviewType) => (
        <SchoolLevelOverview key={level.id} {...level} />
      ))}
    </div>
  );
}
