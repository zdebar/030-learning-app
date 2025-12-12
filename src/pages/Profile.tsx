import { useAuthStore } from "@/features/auth/auth-store";
import PropertyView from "@/components/UI/PropertyView";
import SignoutButton from "@/features/auth/SignoutButton";
import { useToastStore } from "@/features/toast/toast-store";

export default function Profile() {
  const { userEmail } = useAuthStore();
  const { showToast } = useToastStore();

  return (
    <>
      <PropertyView label="Uživatel:" className="h-input" value={userEmail} />
      <SignoutButton className="w-full" />
      <button
        onClick={() => {
          showToast("This is a toast message!", "info");
          console.log("Toast triggered");
        }}
        className="mt-4 p-2 bg-blue-500 text-white rounded"
      >
        toast
      </button>
    </>
  );
}
