import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/features/auth/auth-store";
import Button from "@/components/UI/buttons/Button";
import PropertyView from "@/components/UI/PropertyView";

export default function Home() {
  const navigate = useNavigate();
  const { userId, userEmail } = useAuthStore();

  return (
    <>
      {!userId ? (
        <Button onClick={() => navigate("/login")} className="w-full grow-0">
          Sign in / Sign up
        </Button>
      ) : (
        <div>
          <PropertyView
            label="Uživatel:"
            className="h-input"
            value={userEmail}
          />
        </div>
      )}
    </>
  );
}
