import type {
  SummireNoteDTO,
  SummireNoteResponseDTO,
  ToneDTO,
  ToneResponseDTO,
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

  const summarize = async (note: SummireNoteDTO) => {
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
      console.error("Summarize API Error:", errorText);
      throw new Error(`Summarize failed: ${response.status} - ${errorText}`);
    }

    const data: SummireNoteResponseDTO = await response.json();
    return data.result;
  };

  const changeTone = async (note: ToneDTO) => {
    const token = await getToken();

    if (!token) return;

    const response = await fetch(`${API_BASE_URL}/api/ai/rewrite`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Change Tone API Error:", errorText);
      throw new Error(`Change tone failed: ${response.status} - ${errorText}`);
    }

    const data: ToneResponseDTO = await response.json();
    return data.result;
  };

  return {
    translateNote,
    summarize,
    changeTone,
  };
}

export default useAIFeaturesAPI;
