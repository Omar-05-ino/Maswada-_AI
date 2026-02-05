import type { AutoSaveStatus, Note } from "@/types";
import { useEffect, useState } from "react";

type Props = {
  note: Note | null;
  userEdits: boolean;
  handleSave: () => void;
};

function useAutoSave({ note, userEdits, handleSave }: Props) {
  const [autosaveStatus, setAutosaveStatus] =
    useState<AutoSaveStatus>("initial");

  useEffect(() => {
    if (!note || !userEdits) return;
    const timer = setTimeout(() => {
      setAutosaveStatus("saving");
      handleSave();
      setAutosaveStatus("saved");
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [note?.title, note?.content, userEdits, handleSave]);

  return {
    autosaveStatus,
    setAutosaveStatus,
  };
}

export default useAutoSave;
