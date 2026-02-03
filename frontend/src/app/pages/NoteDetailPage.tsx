import { GlassCard } from "@/components/common/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useNotesApi from "@/hooks/useNotesApi";
import type { Note } from "@/types";
import { ArrowLeft, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function NoteDetailPage() {
  const [note, setNote] = useState<Note | null>(null);
  const [userEdits, setUserEdits] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();
  const { getNotesById, updateNote, deleteNote } = useNotesApi();

  useEffect(() => {
    const fetchNote = async () => {
      if (!id) return;

      try {
        const fetchedNote = await getNotesById(id);
        if (fetchedNote) {
          setNote(fetchedNote);
        }
      } catch (error) {
        console.error("Error fetching note:", error);
      }
    };

    fetchNote();
  }, [getNotesById, id]);

  const hanleBack = () => {
    navigate(-1);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNote((prev) => prev && { ...prev, title: e.target.value });
    setUserEdits(true);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote((prev) => prev && { ...prev, content: e.target.value });
    setUserEdits(true);
  };

  const handleSave = async () => {
    if (!note) return;
    await updateNote(note.id, note);
    setUserEdits(false);
  };

  const handleDelete = async () => {
    if (!note) return;
    const res = await deleteNote(note.id);
    if (res) navigate(-1);
  };

  if (!note) return <div>Note not found</div>;

  return (
    <GlassCard className="p-4 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Button
          onClick={hanleBack}
          className="cursor-pointer"
          variant={"outline"}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button
          variant={"destructive"}
          className="cursor-pointer"
          onClick={handleDelete}
        >
          <Trash />
          DELETE
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        <Input
          placeholder="Title"
          className="bg-transparent dark:bg-transparent border-none focus-visible:ring-0 text-xl font-bold"
          value={note.title || ""}
          onChange={handleTitleChange}
        />
        <Textarea
          rows={20}
          className="bg-transparent dark:bg-transparent border-none focus-visible:ring-0 min-h-[500px]"
          placeholder="Content"
          value={note.content || ""}
          onChange={handleContentChange}
        />
      </div>
      <div className="flex items-center justify-end">
        <Button onClick={handleSave} disabled={!userEdits}>
          Save Note
        </Button>
      </div>
    </GlassCard>
  );
}

export default NoteDetailPage;

function deleteNote(id: string) {
  throw new Error("Function not implemented.");
}
