import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BUS102 study list",
  description: "A study to-do list for your classes, with due dates.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
