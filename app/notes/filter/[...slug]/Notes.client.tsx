"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchNotes } from "@/lib/api";
import { useDebouncedCallback } from "use-debounce";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import css from "./page.module.css";
import Link from "next/link";

type Props = {
  tag?: string;
};

export default function NotesClient({ tag }: Props) {
  const [note, setNote] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ["notes", note, currentPage, tag],
    queryFn: () =>
      fetchNotes(note, currentPage, tag === "all" ? "" : (tag ?? "")),
    placeholderData: keepPreviousData,
  });

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setNote(value);
    setCurrentPage(1);
  }, 300);

  const totalPages = data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={debouncedSearch} />
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
        <Link href="/notes/action/create">Create note +</Link>
      </header>
      {data && !isLoading && <NoteList notes={data.notes} />}
    </div>
  );
}
