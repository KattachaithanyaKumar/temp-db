"use client";

import { Provider } from "react-redux";
import { store } from "@/lib/store";
import { ConfigProvider, theme } from "antd";
import { useEffect } from "react";
import { initAuthListener } from "@/lib/supabase/authListener";
import { Toaster } from "react-hot-toast";

export function AppProviders({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const cleanUp = initAuthListener();
    return () => cleanUp?.();
  }, []);

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
      <Provider store={store}>{children}</Provider>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#1C1C28", // colorBgContainer
            color: "#F3F4F6", // colorTextBase
            border: "1px solid #2D2D42", // colorBorder
            fontFamily: "var(--font-inter), sans-serif",
          },
          success: {
            iconTheme: {
              primary: "#4F46E5", // colorPrimary
              secondary: "#1C1C28",
            },
          },
          error: {
            iconTheme: {
              primary: "#EF4444", // red-500 (consistent with error states)
              secondary: "#1C1C28",
            },
          },
        }}
      />
    </ConfigProvider>
  );
}
