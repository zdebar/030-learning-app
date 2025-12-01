import HomeIcon from "./HomeIcon";
import MathIcon from "./MathIcon";
import HeaderButton from "@/components/Layout/header/HeaderButton";
import UserAvatar from "@/components/Layout/header/UserAvatar";
import ThemeSwitch from "@/features/theme/ThemeSwitch";
import { useAuthStore } from "@/features/auth/auth-store";

export default function Header() {
  const { userId } = useAuthStore();

  return (
    <header className="flex justify-between">
      <nav
        role="navigation"
        aria-label="Hlavní navigace"
        className="flex justify-between"
      >
        <HeaderButton to="/" aria-label="Domů">
          <HomeIcon />
        </HeaderButton>
        <HeaderButton to="/math" aria-label="Uživatelský dashboard">
          <MathIcon />
        </HeaderButton>
      </nav>
      <nav
        role="navigation"
        aria-label="Uživatelská navigace"
        className="flex justify-between"
      >
        <ThemeSwitch />
        <HeaderButton
          to="/profile"
          aria-label="Nastavení uživatele"
          disabled={!userId}
        >
          <UserAvatar />
        </HeaderButton>
      </nav>
    </header>
  );
}
