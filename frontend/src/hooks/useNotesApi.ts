import type { Note, CreateNoteDTO, UpdateNoteDTO } from "@/types";
import { useAuth } from "@clerk/clerk-react";
import { useCallback } from "react";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

function useNotesApi() {
  const { getToken } = useAuth();

  const getAllNotes = useCallback(async () => {
    const token = await getToken();
    if (!token) {
      console.error("No token provided");
      return [];
    }
    const response = await fetch(`${API_BASE_URL}/api/notes`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data: { notes: Note[] } = await response.json();
    return data.notes;
  }, [getToken]);

  const createNote = useCallback(
    async (note: CreateNoteDTO) => {
      const token = await getToken();
      if (!token) {
        console.error("No token provided");
        return;
      }
      const response = await fetch(`${API_BASE_URL}/api/notes`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
      });

      const data: { note: Note } = await response.json();

      return data.note;
    },
    [getToken],
  );

  const getNotesById = useCallback(
    async (id: string) => {
      const token = await getToken();
      if (!token) {
        console.error("No token provided");
        return;
      }
      const response = await fetch(`${API_BASE_URL}/api/notes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data: { note: Note } = await response.json();
      return data.note;
    },
    [getToken],
  );

  const updateNote = useCallback(
    async (id: string, note: UpdateNoteDTO) => {
      const token = await getToken();
      if (!token) return;

      const response = await fetch(`${API_BASE_URL}/api/notes/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
      });
      const data: { note: Note } = await response.json();
      return data.note;
    },
    [getToken],
  );

  return {
    getAllNotes,
    createNote,
    getNotesById,
    updateNote,
  };
}

export default useNotesApi;
