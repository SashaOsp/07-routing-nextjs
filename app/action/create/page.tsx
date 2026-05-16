import CreateNote from "@/components/CreateNote/CreateNote";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Note",
  description:
    "Create a new note by entering a title, adding content, and choosing a tag before saving.",
  openGraph: {
    title: "New Note",
    description:
      "Create a new note by entering a title, adding content, and choosing a tag before saving.",
    url: "https://example.com/notes/action/create",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 600,
        alt: "New Note",
      },
    ],
  },
};
export default function CreateNotePage() {
  return <CreateNote />;
}
