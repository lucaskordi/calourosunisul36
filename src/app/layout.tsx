import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const erstoria = localFont({
  src: "./fonts/Erstoria.otf",
  variable: "--font-erstoria",
});

export const metadata: Metadata = {
  title: "Bem-vindos, Calouros! Medicina Unisul XXXVI",
  description: "Orientações e dicas para você não se perder no seu primeiro ano letivo!",
  icons: {
    icon: "/favico36.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${erstoria.variable} font-erstoria antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
