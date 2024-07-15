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

export interface User {
    _id: string | null;
    username: string;
    email: string
}

export interface UserBaseInputData {
	email: string;
	password: string;
}

export interface  UserSignupInputData extends UserBaseInputData {
	username: string;
}

export interface UserLoginInputData extends UserBaseInputData {}