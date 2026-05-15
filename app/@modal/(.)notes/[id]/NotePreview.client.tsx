"use client";

import css from "./NotePreview.module.css";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import Modal from "@/components/Modal/Modal";

type Props = {
  id: string;
};

export default function NotePreviewClient({ id }: Props) {
  const router = useRouter();

  const close = () => router.back();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <Modal onClose={close}>
      <div className={css.container}>
        <button className={css.backBtn} onClick={close}>
          Close
        </button>
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error loading note.</p>}
        {data && (
          <div className={css.container}>
            <div className={css.item}>
              <div className={css.header}>
                <h2>{data.title}</h2>
              </div>
              <p className={css.tag}>{data.tag}</p>
              <p className={css.content}>{data.content}</p>
              <p className={css.date}>{data.createdAt}</p>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
