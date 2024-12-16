import "./globals.css";
import type { Metadata } from "next";
import { Toaster } from "sonner";
import Navbar from "@/components/core/Navbar";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import Footer from "@/components/core/Footer";

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
      <body>
        <NextThemesProvider attribute="class" defaultTheme="light">
          <Navbar />
          <div className="mt-16 dark:bg-black">{children}</div>
          <Footer />
          <Toaster
            toastOptions={{
              unstyled: false,
              classNames: {
                error: "bg-red-500 text-slate-100",
                success: "bg-green-500 text-slate-100",
                warning: "bg-yellow-400",
                info: "bg-blue-400"
              }
            }}
          />
        </NextThemesProvider>
      </body>
    </html>
  );
}
