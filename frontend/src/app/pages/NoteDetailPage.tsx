import { GlassCard } from "@/components/common/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useNotesApi from "@/hooks/useNotesApi";
import type { Note } from "@/types";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function NoteDetailPage() {
  const [note, setNote] = useState<Note | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();
  const { getNotesById, updateNote } = useNotesApi();

  useEffect(() => {
    const fetchNote = async () => {
      if (!id) return;

      setIsLoading(true);

      try {
        const fetchedNote = await getNotesById(id);
        if (fetchedNote) {
          setNote(fetchedNote);
        }
      } catch (error) {
        console.error("Error fetching note:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNote();
  }, [getNotesById, id]);

  const hanleBack = () => {
    navigate(-1);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNote((prev) => prev && { ...prev, title: e.target.value });
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote((prev) => prev && { ...prev, content: e.target.value });
  };

  const handleSave = async () => {
    if (!note) return;
    setIsLoading(true);
    await updateNote(note.id, note);
    setIsLoading(false);
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center py-32 text-muted-foreground animate-pulse">
        ading note details...
      </div>
    );

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
      <Button onClick={handleSave}>Save Note</Button>
    </GlassCard>
  );
}

export default NoteDetailPage;
