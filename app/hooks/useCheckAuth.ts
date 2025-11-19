"use client";

import { createSupabaseClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useCheckAuth(type: "public" | "protected" = "public") {
  const router = useRouter();

  useEffect(() => {
    const supabase = createSupabaseClient();

    supabase.auth.getSession().then(({ data }) => {
      const user = data.session?.user;

      if (type === "public" && user) {
        router.replace("/dashboard");
      }

      if (type === "protected" && !user) {
        router.replace("/");
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const user = session?.user;

      if (type === "public" && user) {
        router.replace("/dashboard");
      }

      if (type === "protected" && !user) {
        router.replace("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [router, type]);
}
