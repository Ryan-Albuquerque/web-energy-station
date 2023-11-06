import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeAppProvider from "@/providers/theme";
import Header from "./header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Energy Station",
  description: "Web application energy station",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeAppProvider>
          <Header />
          {children}
        </ThemeAppProvider>
      </body>
    </html>
  );
}
