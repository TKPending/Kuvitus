import "./globals.css";
import type { Metadata } from "next";
import { ReduxProvider } from "@/app/redux/ReduxProvider";

export const metadata: Metadata = {
  title: "Kuvitus",
  description: "Visualise and achieve your goals",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ReduxProvider>
        <body>{children}</body>
      </ReduxProvider>
    </html>
  );
}
