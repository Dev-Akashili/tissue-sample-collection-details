import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tissue Sample Collection Details",
  description: "Tissue sample collection details for developer assessment"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
