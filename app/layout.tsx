import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nathan Zhang",
  description: "Software engineer interested in building high-performance systems, optimizing AI models, and designing distributed data infrastructure.",
  icons: {
    icon: "/favicon-cube.svg",
  },
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
