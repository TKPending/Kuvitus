import "./globals.css";
import type { Metadata } from "next";
import { ReduxProvider } from "@/app/redux/ReduxProvider";
import { Jua } from "next/font/google"

export const metadata: Metadata = {
  title: "Kuvitus",
  description: "Visualise and achieve your goals",
};

const jua = Jua({
  weight: "400",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ReduxProvider>
        <body className={`${jua.className} max-w-screen`}>{children}</body>
      </ReduxProvider>
    </html>
  );
}
