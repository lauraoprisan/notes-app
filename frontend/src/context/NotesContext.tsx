import { createContext, ReactNode, useState } from 'react';
import { Note } from '../types';

export interface NotesContextType {
    notes: Note[] | null,
    addNotes: (notesFromDatabase: Note[]) => void,
    addNote: (newNote: Note) => void,
    updateNote: (updatedNote: Note) => void,
}

interface NotesProviderProps {
    children: ReactNode;
  }

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const NotesProvider: React.FC<NotesProviderProps> = ({ children }) => {
    const [notes, setNotes] = useState<Note[] | null>(null);

    console.log(notes)
    const addNotes =  (notesFromDatabase: Note[] | null) => {
        setNotes(notesFromDatabase)
    }


    const addNote = (newNote : Note) => {
        setNotes(prevNotes => (prevNotes ? [newNote, ...prevNotes] : [newNote]));
    };

    const updateNote = (updatedNote: Note) => {
        setNotes((prevNotes) => {
            if (!prevNotes) return [updatedNote];
            return prevNotes.map((note) =>
                note._id === updatedNote._id ? updatedNote : note
            );
        });
    };


    return (
        <NotesContext.Provider value={{
            notes,
            addNotes,
            addNote,
            updateNote

        }}>
            {children}
        </NotesContext.Provider>
    );
};

export default NotesContext;
