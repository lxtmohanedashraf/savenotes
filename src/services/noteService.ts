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
