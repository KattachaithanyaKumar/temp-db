"use client";

import Logo from "@/app/components/Logo";
import { Input, Modal } from "antd";
import { FcGoogle } from "react-icons/fc";
import type { ModalProps } from "antd";
import { useEffect, useState } from "react";
import { createSupabaseClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/app/hooks/useAppDispatch";
import { setError, setUser, setLoading } from "@/lib/slices/AuthSlice";
import toast from "react-hot-toast";

interface AuthModalProps extends ModalProps {
  initialMode: "login" | "signup";
}

const AuthModal = (props: AuthModalProps) => {
  const [mode, setMode] = useState<"login" | "signup">(props.initialMode);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);

  const supabase = createSupabaseClient();
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    setMode(props.initialMode);
  }, [props.initialMode]);

  const handleSubmit = async () => {
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }

    setLoadingLogin(true);

    try {
      dispatch(setLoading(true));

      if (mode === "login") {
        const { error, data } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          dispatch(setError(error.message));
          toast.error(error.message || "Invalid login credentials");
          return;
        }

        dispatch(setUser(data.user));
        toast.success("Logged in successfully!");
        router.push("/dashboard");
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) {
          dispatch(setError(error.message));
          toast.error(error.message || "Signup failed");
          return;
        }

        toast.success("Signup successful! Check your email to verify.");
      }
    } finally {
      setLoadingLogin(false);
      dispatch(setLoading(false));
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoadingGoogle(true);
      toast.loading("Redirecting to Google...", { id: "google-login" });

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (error) {
        toast.error("Google login failed");
        console.error(error);
        return;
      }

      toast.success("Google login successful!", { id: "google-login" });
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      toast.error("Google login failed");
    } finally {
      setLoadingGoogle(false);
    }
  };

  return (
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
            <Input.Password
              placeholder="Enter Password"
              size="large"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />

            <button
              type="button"
              onClick={handleSubmit}
              disabled={loadingLogin}
              className="px-6 py-2.5 bg-(--blue) hover:bg-(--blue-2)
              text-white font-medium rounded-lg 
              shadow-md hover:shadow-lg active:scale-[0.98]
              transition-all duration-200 ease-in-out
              focus:outline-none focus:ring-2 focus:ring-(--blue)/50 cursor-pointer
              disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loadingLogin
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
  );
};

export default AuthModal;
