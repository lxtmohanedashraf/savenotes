import React, { useState, useEffect } from "react";
import { useParams } from "@tanstack/react-router";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useUpdateNote, useSingleNote } from "../services/noteService";
import "./NodeEditor.css";

const NoteEditor: React.FC = () => {
  const { noteId } = useParams({ from: "/notes/$noteId" });
  const { data: note, isLoading } = useSingleNote(noteId);
  const updateNoteMutation = useUpdateNote(noteId);

  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [note]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (title !== note?.title || content !== note?.content) {
        updateNoteMutation.mutate({ title, content });
      }
    }, 1000);

    return () => clearTimeout(handler);
  }, [title, content, note?.title, note?.content, updateNoteMutation]);

  if (isLoading || !note) return <div>Loading...</div>;

  return (
    <div className="note-editor">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Untitled"
        className="note-title"
      />
      <ReactQuill
        value={content}
        onChange={setContent}
        placeholder="Type your content here..."
        className="note-content"
      />
    </div>
  );
};

export default NoteEditor;
