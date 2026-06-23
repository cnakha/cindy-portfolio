import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ScrollToTop from "@/components/ScrollToTop";

export const metadata: Metadata = {
  title: "Cindy Nakhammouane",
  description: "Fullstack Developer and Designer Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://use.typekit.net/ntg4sdf.css"
        />
      </head>
      <body>
        <ScrollToTop />
        <Navbar />
        {children}
      </body>
    </html>
  );
}