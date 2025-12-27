import type { Metadata } from "next";
import { Epilogue, Poppins } from "next/font/google";
import { SquarespaceHeader } from "@/components/squarespace-header";
import { pageImages } from "@/lib/page-images";
import { squarespaceBodyClass } from "@/lib/squarespace-body";
import "./globals.css";

const epilogue = Epilogue({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-body",
  display: "swap",
});

const heroImage = pageImages["home"]?.[0];

export const metadata: Metadata = {
  title: {
    default: "Nader Bahsoun",
    template: "%s | Nader Bahsoun",
  },
  description:
    "Visual artist and photographer exploring memory, place, and archives through image, film, and installation.",
  openGraph: {
    title: "Nader Bahsoun",
    description:
      "Visual artist and photographer exploring memory, place, and archives through image, film, and installation.",
    type: "website",
    images: heroImage ? [{ url: heroImage }] : undefined,
  },
  twitter: {
    card: "summary_large_image",
    title: "Nader Bahsoun",
    description:
      "Visual artist and photographer exploring memory, place, and archives through image, film, and installation.",
    images: heroImage ? [heroImage] : undefined,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${epilogue.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://assets.squarespace.com/universal/styles-compressed/commerce-2bd20f6587654ec4-min.en-US.css"
        />
        <link
          rel="stylesheet"
          href="https://static1.squarespace.com/static/versioned-site-css/653146cbbf386b36d5f26d0e/75/5c5a519771c10ba3470d8101/653146cbbf386b36d5f26d16/1717/site.css"
        />
        <link
          rel="stylesheet"
          href="https://static1.squarespace.com/static/vta/5c5a519771c10ba3470d8101/versioned-assets/1766184538619-72W2T78VKF7EGEIPSK0V/static.css"
        />
      </head>
      <body className={squarespaceBodyClass}>
        <div id="siteWrapper" className="clearfix site-wrapper">
          <SquarespaceHeader />
          {children}
        </div>
      </body>
    </html>
  );
}
