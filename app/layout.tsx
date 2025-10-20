import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nathan Zhang",
  description: "Software engineer interested in building high-performance systems, optimizing AI models, and designing distributed data infrastructure.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
