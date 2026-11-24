import type { Metadata } from "next";
import { Analytics } from '@vercel/analytics/next';
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";


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
    <html lang="en" data-theme="night" suppressHydrationWarning className={inter.variable}>
      <head>
        {/* set day/night before first paint to avoid a flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("theme");if(t!=="day"&&t!=="night")t=matchMedia("(prefers-color-scheme: light)").matches?"day":"night";document.documentElement.dataset.theme=t}catch(e){}`,
          }}
        />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"></link>
      </head>
      <body className={`${inter.variable} ${citadel.variable} font-inter antialiased`}>
        <SmoothScroll />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
