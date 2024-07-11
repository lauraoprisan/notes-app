// Note type for using it when the user creates a new note
export interface NoteInput {
    title: string | null;
    content: string | null;
}

// Note type for the note from the database
export interface Note {
    _id: string;
    title: string | null;
    content: string | null;
    createdAt: string;
    updatedAt: string;
    __v: number;
}