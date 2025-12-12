import { useState } from "react";
import { useToastStore } from "@/features/toast/toast-store";
import ButtonAsyncModal from "../../components/UI/buttons/ButtonAsyncModal";
import { useAuthStore } from "@/features/auth/auth-store";

/**
 * Button for signing out the user.
 */
export default function DeleteUserButton({
  className,
}: {
  className?: string;
}) {
  const { handleLogout } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToastStore();

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await handleLogout();
      showToast("Úspěšně jste se odhlásili.", "success");
    } catch (error) {
      console.error("Error on user logout:", error);
      showToast(
        "Nastala chyba při odhlašování. Zkuste to prosím později.",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ButtonAsyncModal
      message="Smazat uživatele"
      isLoading={isLoading}
      loadingMessage="Probíhá mazání uživatele..."
      modalTitle="Potvrzení smazání uživatele"
      modalDescription="Opravdu chcete smazat svého uživatele?"
      onConfirm={handleDelete}
      className={`grow-0 shape-button-rectangular color-button ${className}`}
    />
  );
}
