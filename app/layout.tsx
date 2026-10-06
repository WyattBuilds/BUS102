import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wyatt Hoffman",
  description: "a freshman at UH Manoa studying entreprenuership",
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
