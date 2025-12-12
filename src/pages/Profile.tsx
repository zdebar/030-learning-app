import { useAuthStore } from "@/features/auth/auth-store";
import PropertyView from "@/components/UI/PropertyView";
import SignoutButton from "@/features/auth/SignoutButton";

export default function Profile() {
  const { userEmail } = useAuthStore();

  return (
    <>
      <PropertyView label="Uživatel:" className="h-input" value={userEmail} />
      <SignoutButton className="w-full" />
    </>
  );
}
