import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Note } from "../types";
import { useRouter } from "@tanstack/react-router";

export const useNotes = () =>
  useQuery<Note[], Error>({
    queryKey: ["notes"],
    queryFn: async () => {
      const response = await axios.get<Note[]>("/api/notes");
      return response.data;
    },
  });

export const useSingleNote = (noteId: string) =>
  useQuery<Note, Error>({
    queryKey: ["notes", noteId],
    queryFn: async () => {
      const response = await axios.get<Note>(`/api/notes/${noteId}`);
      return response.data;
    },
    enabled: !!noteId, // Ensures the query only runs if noteId is present
  });

export const useCreateNote = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      const response = await axios.post<Note>("/api/notes", {
        title: "New Note",
      });
      return response.data;
    },
    onSuccess: (newNote: Note) => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      router.navigate({ to: `/notes/${newNote.id}` });
    },
  });
};

export const useUpdateNote = (noteId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedNote: Partial<Note>) => {
      const response = await axios.patch<Note>(
        `/api/notes/${noteId}`,
        updatedNote
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      queryClient.invalidateQueries({ queryKey: ["notes", noteId] });
    },
  });
};
