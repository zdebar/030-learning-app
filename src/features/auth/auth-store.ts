import { create } from "zustand";
import type { Session } from "@supabase/supabase-js";
import { supabaseInstance } from "@/config/supabase.config";

interface AuthState {
  userId: string | null;
  userEmail: string | null;
  loading: boolean;
  setSession: (session: Session | null) => void;
  handleLogout: () => Promise<void>;
  initSession: () => () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  userId: null,
  userEmail: null,
  loading: true,

  setSession: (session) => {
    set({
      userId: session?.user?.id || null,
      userEmail: session?.user?.email || null,
      loading: false,
    });
  },

  handleLogout: async () => {
    const { error } = await supabaseInstance.auth.signOut();
    if (error) {
      console.error("Error logging out:", error.message);
    } else {
      set({ userId: null, userEmail: null, loading: false });
    }
  },

  initSession: () => {
    supabaseInstance.auth.getSession().then(({ data: { session } }) => {
      useAuthStore.getState().setSession(session);
    });

    const {
      data: { subscription },
    } = supabaseInstance.auth.onAuthStateChange((_event, session) => {
      useAuthStore.getState().setSession(session);
    });

    return () => subscription.unsubscribe();
  },
}));
