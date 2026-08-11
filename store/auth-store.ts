import { create } from "zustand";
import { supabase } from "@/lib/supabase/supabase";

interface Profile {
  id: string;
  username: string;
  full_name: string;
  avatar_url: string | null;
  created_at: string | null;
  updated_at: string | null;
}

interface AuthState {
  userId: string | null;
  profile: Profile | null;
  loading: boolean;
  setSession: (userId: string | null) => Promise<void>;
  clear: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  userId: null,
  profile: null,
  loading: true,

  setSession: async (userId) => {
    if (!userId) {
      set({ userId: null, profile: null, loading: false });
      return;
    }

    set({ loading: true });

    const { data: profile, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      console.error("Failed to load profile:", error.message);
    }

    set({ userId, profile: profile ?? null, loading: false });
  },

  clear: () => set({ userId: null, profile: null, loading: false }),
}));