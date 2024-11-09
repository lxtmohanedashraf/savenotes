import { http, HttpResponse } from "msw";
import { Note } from "../types";

let notes: Note[] = JSON.parse(localStorage.getItem("notes") || "[]");
if (notes.length === 0) {
  notes = [
    { id: "1", title: "Note Title 1", content: "Content for note 1" },
    { id: "2", title: "Note Title 2", content: "Content for note 2" },
    { id: "3", title: "Note Title 3", content: "Content for note 3" },
    { id: "4", title: "Note Title 4", content: "Content for note 4" },
    { id: "5", title: "Note Title 5", content: "Content for note 5" },
    { id: "6", title: "Note Title 6", content: "Content for note 6" },
    { id: "7", title: "Note Title 7", content: "Content for note 7" },
    { id: "8", title: "Note Title 8", content: "Content for note 8" },
  ];
}

const saveNotesToLocalStorage = () => {
  localStorage.setItem("notes", JSON.stringify(notes));
};

export const notesHandler = [
  http.get("/api/notes", () => {
    return HttpResponse.json(notes);
  }),

  http.post("/api/notes", async ({ request }) => {
    const { title, content } = (await request.json()) as {
      title: string;
      content: string;
    };
    const newNote: Note = {
      id: (notes.length + 1).toString(),
      title,
      content,
    };
    notes = [...notes, newNote];
    saveNotesToLocalStorage();
    return HttpResponse.json(newNote, { status: 201 });
  }),
];
