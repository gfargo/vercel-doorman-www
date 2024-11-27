import { Toaster } from "@/components/ui/toaster";
import { Inter } from "next/font/google";
import { Footer } from "./_components/Footer";
import { Header } from "./_components/Header";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Vercel Doorman - Secure Your Vercel Deployments with Code",
  description:
    "Manage Vercel Firewall rules as code, enabling version control and automated deployment of your project's security configuration.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
