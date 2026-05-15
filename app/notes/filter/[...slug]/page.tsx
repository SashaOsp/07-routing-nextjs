import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";

interface Props {
  params: Promise<{
    slug: string[];
  }>;
}

export default async function Page({ params }: Props) {
  const { slug } = await params;

  const tag = slug?.[0];

  const queryClient = new QueryClient();
  const tagForQuery = tag === "all" ? undefined : tag;

  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, tagForQuery],
    queryFn: () => fetchNotes("", 1, tagForQuery),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
