"use client";

import Logo from "@/app/components/Logo";
import { ConfigProvider, Input, Modal, theme } from "antd";
import { FcGoogle } from "react-icons/fc";
import type { ModalProps } from "antd";
import { useState } from "react";
import { createSupabaseClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

interface AuthModalProps extends ModalProps {
  initialMode: "login" | "signup";
}

const AuthModal = (props: AuthModalProps) => {
  const [mode, setMode] = useState<"login" | "signup">(props.initialMode);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);

  const supabase = createSupabaseClient();
  const router = useRouter();

  const handleSubmit = async () => {
    if (!email || !password) return;
    setLoading(true);

    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          console.error("Login error:", error);
          alert(error.message || "Invalid login credentials");
          return;
        }

        console.log("Logged in!");

        router.push("/dashboard");
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) {
          console.error("Signup error:", error);
          alert(error.message || "Failed to sign up");
          return;
        }

        console.log("Signup success:", data);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoadingGoogle(true);
      const supabase = createSupabaseClient();

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (error) {
        console.error(error);
      }
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingGoogle(false);
    }
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: "#4F46E5",
          colorBgBase: "#0D0D1A",
          colorTextBase: "#F3F4F6",
          colorBgContainer: "#1C1C28",
          colorBorder: "#2D2D42",
          colorTextSecondary: "#A1A1B3",
          fontFamily: "var(--font-inter), sans-serif",
        },
        components: {
          Modal: {
            headerBg: "#1C1C28",
            contentBg: "#1C1C28",
            footerBg: "#1C1C28",
            titleColor: "#F9FAFB",
            colorText: "#E5E7EB",
            colorIcon: "#A1A1B3",
            colorIconHover: "#FFFFFF",
            borderRadiusLG: 12,
            boxShadow: "0 8px 40px rgba(0, 0, 0, 0.55)",
          },
          Button: {
            colorPrimary: "#4F46E5",
            colorPrimaryHover: "#6366F1",
            colorPrimaryActive: "#4338CA",
            borderRadius: 8,
          },
        },
      }}
    >
      <Modal {...props} footer={null}>
        <div className="p-5 grid gap-5">
          <Logo />

          <div className="grid gap-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">
                  {mode === "login" ? "Welcome back" : "Create an account"}
                </h1>
                <p className="font-thin text-[16px]">
                  {mode === "login"
                    ? "Enter your credentials to access your account"
                    : "Sign up with your email and password"}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loadingGoogle}
              className="flex items-center justify-center gap-3 w-full
             border border-(--light-gray) px-5 py-2.5 rounded-lg
             bg-transparent hover:bg-(--light-gray) active:scale-[0.98]
             transition-all duration-200 cursor-pointer select-none
             text-(--white) font-medium shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <FcGoogle className="text-xl" />
              <span>
                {loadingGoogle ? "Redirecting..." : "Login with Google"}
              </span>
            </button>

            <div className="flex items-center w-full">
              <div className="grow border-t border-(--light-gray)"></div>
              <span className="mx-3 text-(--text-light) text-xs uppercase tracking-wider">
                or
              </span>
              <div className="grow border-t border-(--light-gray)"></div>
            </div>

            <div className="grid gap-3">
              <Input
                placeholder="Enter Email"
                size="large"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
              />
              <Input
                placeholder="Enter Password"
                size="large"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />

              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="px-6 py-2.5 bg-(--blue) hover:bg-(--blue-2)
              text-white font-medium rounded-lg 
              shadow-md hover:shadow-lg active:scale-[0.98]
              transition-all duration-200 ease-in-out
              focus:outline-none focus:ring-2 focus:ring-(--blue)/50 cursor-pointer
              disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading
                  ? mode === "login"
                    ? "Logging in..."
                    : "Signing up..."
                  : mode === "login"
                  ? "Login"
                  : "Sign Up"}
              </button>

              <button
                type="button"
                className="text-xs text-(--text-light) underline"
                onClick={() =>
                  setMode((m) => (m === "login" ? "signup" : "login"))
                }
              >
                {mode === "login"
                  ? "Need an account?"
                  : "Already have an account?"}
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </ConfigProvider>
  );
};

export default AuthModal;
