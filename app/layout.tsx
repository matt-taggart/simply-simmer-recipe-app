import "./globals.css";
import "react-loading-skeleton/dist/skeleton.css";

import { Providers } from "@/utils/providers";
import { Toaster } from "@/components/ui/toaster";

export const metadata = {
  title: "Simply Simmer",
  description: "Effortlessly Find and Customize Recipes for Any Meal",
};

export default async function RootLayout({ children }: any) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Providers>
          <main>{children}</main>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
