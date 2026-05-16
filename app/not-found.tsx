import css from "./not-found.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page Missing",
  description: "Sorry, the page you are looking for does not exist.",
  openGraph: {
    title: "Page Not Found",
    description: "Sorry, the page you are looking for does not exist.",
    url: process.env.OG_NOTES_URL || "http://localhost:3000/",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 800,
        alt: "Page Not Found Preview",
      },
    ],
  },
};

export default function NotFound() {
  return (
    <div className={css.container}>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
}
