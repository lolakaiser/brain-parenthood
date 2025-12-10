import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import { AuthProvider } from "@/context/AuthContext";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Brain Parenthood - Resilience Toolkit for Startups",
  description: "A 12-Week Resilience and Performance Toolkit for Early-Stage Startups",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script src="https://web.squarecdn.com/v1/square.js" async></script>
      </head>
      <body className={spaceGrotesk.className}>
        <AuthProvider>
          <Navigation />
          <main className="min-h-screen px-6 md:px-8 lg:px-12">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
