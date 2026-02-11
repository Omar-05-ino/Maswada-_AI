export type Note = {
  id: string;
  userId: string;
  title: string;
  content: string;
  summary: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateNoteDTO = {
  title: string;
  content: string;
};

export type UpdateNoteDTO = {
  title?: string;
  content?: string;
};

export type AutoSaveStatus = "initial" | "saving" | "saved" | "unsaved";

export type TranslateNoteDTO = {
  noteId?: string;
  text?: string;
};

export type TranslateNoteResponseDTO = {
  result: string;
};

export type SummireNoteDTO = {
  noteId?: string;
  text?: string;
};

export type SummireNoteResponseDTO = {
  result: string;
};

export type ToneDTO = {
  text: string;
  mode: "comedy" | "formal" | "casual";
};

export type ToneResponseDTO = {
  result: string;
};
