import type { Metadata } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const bebasNeue = Bebas_Neue({ subsets: ["latin"], weight: "400", variable: "--font-bebas" });

export const metadata: Metadata = {
  title: "Sahil Pal • Software Engineer & Full Stack Developer",
  description: "Software Engineer. Full Stack Web Developer — building fast, scalable, and beautiful web experiences.",
  openGraph: {
    title: "Sahil Pal • Software Engineer & Full Stack Developer",
    description: "Building fast, scalable B2B products and full-stack web experiences.",
    url: "https://sahilpal.dev",
    siteName: "Sahil Pal",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sahil Pal • Software Engineer & Full Stack Developer",
    description: "Building fast, scalable B2B products and full-stack web experiences.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${bebasNeue.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col overflow-x-hidden" suppressHydrationWarning>
        <ThemeProvider>{children}</ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
