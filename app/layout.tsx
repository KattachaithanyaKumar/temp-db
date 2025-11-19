import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProviders } from "./components/providers";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "TempDB",
  description: "Create a temporary database for testing and POCs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-inter antialiased min-h-screen bg-[var(--background)] text-[var(--white)]">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
