import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const citadel = localFont({
  src: [
    {
      path: "../../public/fonts/CitadelScriptStd.otf",
      weight: "400",
      style: "normal"
    },
  ],
  variable: "--font-citadel",
  display: "swap",
})

export const metadata: Metadata = {
  title: "ethan shih",
  description: "website",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className={`${inter.variable} ${citadel.variable} font-inter antialiased`}>{children}</body>
    </html>
  );
}
