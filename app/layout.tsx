import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "HYDRAI — Hydroponic AI Edge Dashboard",
  description:
    "Sistem hidroponik otonom cerdas berbasis Edge AI untuk optimasi air, nutrisi, dan pengendalian hama secara offline.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-[#f8faf9] text-gray-800">
        {children}
      </body>
    </html>
  );
}
