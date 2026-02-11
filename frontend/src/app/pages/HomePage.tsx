import { GlassCard } from "@/components/common/GlassCard";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import type { Note } from "@/types";
import useNotesApi from "@/hooks/useNotesApi";
import { useNavigate } from "react-router-dom";

export function HomePage() {
  const { getAllNotes, createNote } = useNotesApi();
  const [notes, setNotes] = useState<Note[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotes = async () => {
      const notes = await getAllNotes();
      setNotes(notes);
    };
    fetchNotes();
  }, [getAllNotes]);

  const handleCreateNotes = async () => {
    const note = await createNote({
      title: "New Note",
      content: "-",
    });
    if (note) {
      setNotes((prevNotes) => [...prevNotes, note]);
      navigate(`/note/${note.id}`);
    }
  };

  const handleNoteClick = (id: string) => {
    navigate(`/note/${id}`);
  };

  return (
    <div className="space-y-12">
      <GlassCard className="flex flex-col gap-4 px-4 py-10">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">My Notes</h1>
          <Button onClick={handleCreateNotes} className="cursor-pointer">
            <Plus /> Creat Note
          </Button>
        </div>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="search notes" className="pl-8" />
        </div>
        <div className="flex flex-col gap-4">
          {notes.map((note) => (
            <GlassCard
              key={note.id}
              className="p-4 cursor-pointer"
              onClick={() => handleNoteClick(note.id)}
            >
              <h2 className="text-xl font-bold">{note.title}</h2>
            </GlassCard>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
