import { supabaseInstance } from "@/config/supabase.config";
import { useFetchStorage } from "@/hooks/use-fetch-storage";
import { useAuthStore } from "@/features/auth/auth-store";
import { type SchoolLevelOverviewType } from "@/components/Layout/overview/overview.datatypes";
import SchoolLevelOverview from "@/components/Layout/overview/SchoolLevelOverview";
export default function MathOverview() {
  const { userId } = useAuthStore();

  // Fetch subject overview data
  const {
    data: overview,
    error,
    loading,
  } = useFetchStorage<SchoolLevelOverviewType[]>(
    `math_overview_${userId}_1`,
    async () => {
      const { data, error } = await supabaseInstance.rpc(
        "get_subject_overview",
        {
          user_id: userId,
          subject_id: 1,
        }
      );
      if (error) throw error;
      return data;
    }
  );

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
