import { createContext, ReactNode, useState } from 'react';
import { Note } from '../types';

export interface NotesContextType {
    notes: Note[] | null,
    getNotesFromLocal: () =>  Note[] | null,
    addNotes: (notesFromDatabase: Note[]) => void,
    addNote: (newNote: Note) => void,
    updateNote: (updatedNote: Note) => void,
    removeNote: (id: string) => void
}

interface NotesProviderProps {
    children: ReactNode;
  }

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const NotesProvider: React.FC<NotesProviderProps> = ({ children }) => {
    const [notes, setNotes] = useState<Note[] | null>(null);

    const getNotesFromLocal = () => {
         return notes
    }

    const addNotes =  (notesFromDatabase: Note[] | null) => {
        setNotes(notesFromDatabase)
    }

    const addNote = (newNote : Note) => {
        setNotes(prevNotes => (prevNotes ? [newNote, ...prevNotes] : [newNote]));
    };

    const updateNote = (updatedNote: Note) => {
        setNotes((prevNotes) => {
            if (!prevNotes) return [updatedNote];
            return prevNotes.map(note => note._id === updatedNote._id ? updatedNote : note);
        });
    };

    const removeNote = (id: string) => {
        setNotes((prevNotes) => {
            return prevNotes ? prevNotes.filter(note => note._id !== id) : [];
        });
    };


    return (
        <NotesContext.Provider value={{
            notes,
            getNotesFromLocal,
            addNotes,
            addNote,
            updateNote,
            removeNote

        }}>
            {children}
        </NotesContext.Provider>
    );
};

export default NotesContext;
