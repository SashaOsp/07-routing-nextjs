import NotePreviewClient from "./NotePreview.client";

type Props = {
  id: string;
};

export default function NotePreview({ id }: Props) {
  return <NotePreviewClient id={id} />;
}
