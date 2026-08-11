"use client";

import { useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase/supabase";
import { useAuthStore } from "@/store/auth-store";

export default function AuthListener() {
  const setSession = useAuthStore((s) => s.setSession);
  const initialized = useRef(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      initialized.current = true;
      setSession(session?.user.id ?? null);
    });

    return () => subscription.unsubscribe();
  }, [setSession]);

  return null;
}