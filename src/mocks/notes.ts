import { http, HttpResponse } from "msw";
import { Note } from "../types";

let notes: Note[] = JSON.parse(localStorage.getItem("notes") || "[]");
if (notes.length === 0) {
  notes = [
    {
      id: "1",
      title: "Egyptian Food",
      content:
        "<h1>Food in Egypt is Very Diverse</h1><p>Egyptian cuisine is a blend of rich flavors, with influences from Mediterranean, Middle Eastern, and African cultures. Popular dishes include koshari, falafel, and shawarma.</p>",
    },
    {
      id: "2",
      title: "The Pyramids of Giza",
      content:
        "<h1>The Wonders of the Ancient Pyramids</h1><p>The Pyramids of Giza are among the most famous landmarks in the world. Built as tombs for the Pharaohs, they continue to mystify historians and tourists alike.</p>",
    },
    {
      id: "3",
      title: "The Nile River",
      content:
        "<h1>The Lifeblood of Egypt</h1><p>The Nile River is the longest river in the world, flowing through eleven countries, including Egypt. It has played a crucial role in shaping Egyptian civilization for thousands of years.</p>",
    },
    {
      id: "4",
      title: "Cairo's Busy Streets",
      content:
        "<h1>Cairo: A City That Never Sleeps</h1><p>Cairo is a bustling metropolis, where the streets are always alive with traffic, markets, and people. The city's vibrant culture, rich history, and modern development blend seamlessly.</p>",
    },
  ];
}

const saveNotesToLocalStorage = () => {
  localStorage.setItem("notes", JSON.stringify(notes));
};

export const notesHandler = [
  http.get("/api/notes", () => {
    return HttpResponse.json(notes);
  }),

  http.get("/api/notes/:noteId", ({ params }) => {
    const note = notes.find((note) => note.id === params.noteId);
    if (note) {
      return HttpResponse.json(note);
    } else {
      return HttpResponse.json({ message: "Note not found" }, { status: 404 });
    }
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

  http.patch("/api/notes/:noteId", async ({ request, params }) => {
    const noteId = params.noteId;
    const updatedData = (await request.json()) as {
      title: string;
      content: string;
    };
    notes = notes.map((note) =>
      note.id === noteId ? { ...note, ...updatedData } : note
    );
    saveNotesToLocalStorage();
    return HttpResponse.json(notes.find((note) => note.id === noteId));
  }),
];
