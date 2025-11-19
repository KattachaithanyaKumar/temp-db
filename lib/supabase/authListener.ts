"use client";

import { store } from "@/lib/store";
import { setUser } from "@/lib/slices/AuthSlice";
import { createSupabaseClient } from "./client";

let initialized = false;

export const initAuthListener = () => {
  if (initialized) return;
  initialized = true;

  const supabase = createSupabaseClient();

  const { data: subscription } = supabase.auth.onAuthStateChange(
    (_event, session) => {
      store.dispatch(setUser(session?.user ?? null));
    }
  );

  return () => {
    subscription.subscription.unsubscribe();
  };
};
