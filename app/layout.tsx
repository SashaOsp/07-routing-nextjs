import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";

export const robotoFont = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "NoteHub",
  description:
    "A modern workspace for capturing thoughts, planning your day, and keeping everything important in one place.",

  openGraph: {
    title: "Og NoteHub",
    description:
      "A modern workspace for capturing thoughts, planning your day, and keeping everything important in one place.",
    url: process.env.OG_NOTES_URL || "http://localhost:3000",

    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 800,
        alt: "NoteHub",
      },
    ],
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${robotoFont.variable}`}>
      <body>
        <TanStackProvider>
          <Header />
          <div>
            {children}
            {modal}
          </div>
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
