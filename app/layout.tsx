import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.nlzhang.com"),
  title: "Nathan Zhang",
  description: "Software engineer interested in building high-performance systems, optimizing AI models, and designing distributed data infrastructure. UCLA Computer Science student with experience at Capital One and Scale AI.",
  keywords: ["Nathan Zhang", "Software Engineer", "UCLA", "Computer Science", "Machine Learning", "Distributed Systems", "Full Stack Developer", "Capital One", "Scale AI"],
  authors: [{ name: "Nathan Zhang" }],
  creator: "Nathan Zhang",
  publisher: "Nathan Zhang",
  icons: {
    icon: "/favicon-cube.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.nlzhang.com",
    title: "Nathan Zhang",
    description: "Software engineer interested in building high-performance systems, optimizing AI models, and designing distributed data infrastructure.",
    siteName: "Nathan Zhang Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Nathan Zhang - Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nathan Zhang",
    description: "Software engineer interested in building high-performance systems, optimizing AI models, and designing distributed data infrastructure.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://www.nlzhang.com",
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Nathan Zhang",
    url: "https://www.nlzhang.com",
    email: "nlzhang@ucla.edu",
    jobTitle: "Software Engineer",
    affiliation: {
      "@type": "Organization",
      name: "UCLA",
    },
    alumniOf: {
      "@type": "Organization",
      name: "UCLA",
    },
    description: "Software engineer interested in building high-performance systems, optimizing AI models, and designing distributed data infrastructure.",
    sameAs: [
      "https://www.linkedin.com/in/nathan-zhang-718422269/",
      "https://github.com/nathanplt",
    ],
    knowsAbout: [
      "Software Engineering",
      "Machine Learning",
      "Distributed Systems",
      "Full Stack Development",
      "C++",
      "Python",
      "React",
      "AWS",
    ],
  };

  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
