import { useNotes, useCreateNote } from "../services/noteService";
import { Note } from "../types";
import { useRouter } from "@tanstack/react-router";

const Home = () => {
  const { data: notes = [], isLoading, isError } = useNotes();
  const createNoteMutation = useCreateNote();
  const router = useRouter();

  const handleCreateNote = () => {
    createNoteMutation.mutate(undefined);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div className="text-red-600">Error loading notes.</div>;
  }

  return (
    <div className="container mx-auto p-16">
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        <div
          onClick={handleCreateNote}
          className="p-6 border bg-white hover:bg-slate-400 border-gray-300 rounded-lg shadow-md cursor-pointer flex items-center justify-center text-primary font-semibold hover:bg-secondary hover:text-secondary-foreground transition"
        >
          + Create Note
        </div>
        {notes.map((note: Note) => (
          <div
            key={note.id}
            className="text-center hover:bg-secondary p-8 border border-gray-300 rounded-lg shadow-md cursor-pointer"
            onClick={() => router.navigate({ to: `/notes/${note.id}` })}
          >
            <h3 className="text-lg font-semibold">{note.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
