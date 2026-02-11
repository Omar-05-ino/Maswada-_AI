import type {
  SummireNoteDTO,
  SummireNoteResponseDTO,
  TranslateNoteDTO,
  TranslateNoteResponseDTO,
} from "@/types";
import { useAuth } from "@clerk/clerk-react";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

function useAIFeaturesAPI() {
  const { getToken } = useAuth();

  const translateNote = async (note: TranslateNoteDTO) => {
    const token = await getToken();

    if (!token) return;

    const response = await fetch(`${API_BASE_URL}/api/ai/translate`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Translation API Error:", errorText);
      throw new Error(`Translation failed: ${response.status} - ${errorText}`);
    }

    const data: TranslateNoteResponseDTO = await response.json();
    return data.result;
  };

  const summrize = async (note: SummireNoteDTO) => {
    const token = await getToken();

    if (!token) return;

    const response = await fetch(`${API_BASE_URL}/api/ai/summarize`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("summrize API Error:", errorText);
      throw new Error(`summrize failed: ${response.status} - ${errorText}`);
    }

    const data: SummireNoteResponseDTO = await response.json();
    return data.result;
  };

  return {
    translateNote,
    summrize,
  };
}

export default useAIFeaturesAPI;
