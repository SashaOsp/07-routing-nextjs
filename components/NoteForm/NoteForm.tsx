"use client";

import css from "./NoteForm.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createNote } from "@/lib/api";
import { useNoteStore } from "@/lib/store/noteStore";

export default function NoteForm() {
  const router = useRouter();

  const queryClient = useQueryClient();

  const { draft, setDraft, clearDraft } = useNoteStore();

  const mutation = useMutation({
    mutationFn: createNote,

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });

      clearDraft();

      router.push("/notes/filter/all");
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    mutation.mutate({
      title: draft.title,
      content: draft.content,
      tag: draft.tag,
    });
  };

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target;

    setDraft({
      ...draft,
      [name]: value,
    });
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>

        <input
          id="title"
          name="title"
          type="text"
          className={css.input}
          value={draft.title}
          onChange={handleChange}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>

        <textarea
          id="content"
          name="content"
          rows={8}
          className={css.textarea}
          value={draft.content}
          onChange={handleChange}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>

        <select
          id="tag"
          name="tag"
          className={css.select}
          value={draft.tag}
          onChange={handleChange}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="submit"
          className={css.submitButton}
          disabled={mutation.isPending}
        >
          Create note
        </button>

        <button
          type="button"
          className={css.cancelButton}
          disabled={mutation.isPending}
          onClick={() => {
            clearDraft();
            router.back();
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
