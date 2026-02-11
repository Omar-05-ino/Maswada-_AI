import { GlassCard } from "@/components/common/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useNotesApi from "@/hooks/useNotesApi";
import type { Note } from "@/types";
import { ArrowLeft, Book, Languages, Pencil } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { DeleteDialog } from "@/components/common/DeleteDialog";
import AutoSaveIndicator from "@/components/note/autoSaveIndicator";
import useAutoSave from "@/hooks/useAutoSave";
import useAIFeaturesAPI from "@/hooks/useAIFeaturesAPI";
import { dirArabic } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function NoteDetailPage() {
  const [note, setNote] = useState<Note | null>(null);
  const [userEdits, setUserEdits] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { getNotesById, updateNote, deleteNote } = useNotesApi();
  const { translateNote, summarize, changeTone } = useAIFeaturesAPI();

  const direction = useMemo(
    () => dirArabic(note?.content || ""),
    [note?.content],
  );

  const handleSave = useCallback(async () => {
    if (!note) return;

    await updateNote(note.id, note);
    setUserEdits(false);
    setAutosaveStatus("saved");
  }, [note, updateNote]);

  const { autosaveStatus, setAutosaveStatus } = useAutoSave({
    note,
    userEdits,
    handleSave,
  });

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
    setAutosaveStatus("unsaved");
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote((prev) => prev && { ...prev, content: e.target.value });
    setUserEdits(true);
    setAutosaveStatus("unsaved");
  };

  const handleDelete = async () => {
    if (!note) return;
    const res = await deleteNote(note.id);
    if (res) navigate(-1);
    toast.success("Note deleted");
  };

  const handleTranslate = async () => {
    if (!note) return;
    const result = await translateNote({ noteId: note.id });
    if (result) {
      setNote((prev) => prev && { ...prev, content: result });
      setUserEdits(true);
      setAutosaveStatus("unsaved");
      toast.success("Note translated");
      return;
    }

    toast.error("Failed to translate note");
  };

  const hanleSummrize = async () => {
    if (!note) return;
    const result = await summarize({ noteId: note.id });
    if (result) {
      setNote((prev) => prev && { ...prev, content: result });
      setUserEdits(true);
      setAutosaveStatus("unsaved");
      toast.success("Note summarized");
      return;
    }

    toast.error("Failed to summrize note");
  };

  const handleToneChange = async (tone: "comedy" | "formal" | "casual") => {
    if (!note) return;
    const result = await changeTone({ mode: tone, text: note.content });
    if (result) {
      setNote((prev) => prev && { ...prev, content: result });
      setUserEdits(true);
      setAutosaveStatus("unsaved");
      toast.success("Tone changed");
      return;
    }

    toast.error("Failed to change tone");
  };

  if (!note) return <div>Note not found</div>;

  return (
    <GlassCard className="p-4 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex item-center gap-2">
          <Button
            onClick={hanleBack}
            className="cursor-pointer"
            variant={"outline"}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <AutoSaveIndicator AutoSaveStatus={autosaveStatus} />
        </div>
        <DeleteDialog
          handleDelete={handleDelete}
          title="Delete Note"
          description="Are you sure you want to delete this note?"
          ButtomText="DELETE"
        />
      </div>
      <div className="grid grid-cols-2 gap-2 w-full p-2">
        <Button
          onClick={handleTranslate}
          className="flex items-center justify-center gap-2 h-11 w-full"
        >
          <Languages size={18} />
          <span className="text-sm">Translate</span>
        </Button>

        <Button
          onClick={hanleSummrize}
          className="flex items-center justify-center gap-2 h-11 w-full"
        >
          <Book size={18} />
          <span className="text-sm">Summarize</span>
        </Button>

        <div className="col-span-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center justify-center gap-2 h-11 w-full border-dashed"
              >
                <Pencil size={18} />
                <span>Change Tone</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="center"
              className="w-[calc(100vw-2rem)]"
            >
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={() => handleToneChange("comedy")}
                  className="py-3"
                >
                  Comedy
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleToneChange("formal")}
                  className="py-3"
                >
                  Formal
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleToneChange("casual")}
                  className="py-3"
                >
                  Casual
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <Input
          placeholder="Title"
          className="bg-transparent dark:bg-transparent border-none focus-visible:ring-0 text-xl font-bold"
          value={note.title || ""}
          onChange={handleTitleChange}
        />
        <Textarea
          dir={direction}
          rows={20}
          className="bg-transparent dark:bg-transparent border-none focus-visible:ring-0 min-h-[500px]"
          placeholder="Content"
          value={note.content || ""}
          onChange={handleContentChange}
        />
      </div>
    </GlassCard>
  );
}

export default NoteDetailPage;
