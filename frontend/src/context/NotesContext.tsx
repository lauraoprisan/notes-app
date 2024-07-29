import { createContext, ReactNode, useEffect, useState } from 'react';
import { Note } from '../types';

export interface NotesContextType {
    notes: Note[] | null,
    filteredNotes: Note[] | null,
    setFilteredNotes: (filteredNotes: Note[] | null) => void,
    filteredNotesMap: Map<string, Note> | null,
    debouncedValueForSearchText: string[] | null,
    setDebouncedValueForSearchText: (textSeached: string[] | null) => void,
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
    const [filteredNotes, setFilteredNotes] = useState<Note[] | null>(null);
    const [filteredNotesMap, setFilteredNotesMap] = useState< Map<string, Note> | null>(null);
    const [debouncedValueForSearchText, setDebouncedValueForSearchText] = useState<string[]|null>(null) //maybe I should put this in another context or smth; temporarly put here


    console.log("filteredNotes: ", filteredNotes)

    const addNotes =  (notesFromDatabase: Note[] | null) => {
        setNotes(notesFromDatabase)
    }

    const addNote = (newNote : Note) => {
        setNotes(prevNotes => (prevNotes ? [newNote, ...prevNotes] : [newNote]));
    };

    const updateNote = (updatedNote: Note) => {
        setNotes(prevNotes => {
            if (!prevNotes) return [updatedNote];
            return prevNotes.map(note => note._id === updatedNote._id ? updatedNote : note);
        });

        setFilteredNotes(prevFilteredNotes => {
            if (!prevFilteredNotes) return null;
            return prevFilteredNotes.map(note => note._id === updatedNote._id ? updatedNote : note);
        });
    };



    const removeNote = (id: string) => {
        setNotes((prevNotes) => {
            return prevNotes ? prevNotes.filter(note => note._id !== id) : [];
        });

        setFilteredNotes((prevFilteredNotes) => {
            if(!prevFilteredNotes) return null
            return prevFilteredNotes.filter(note => note._id !== id);
        });
    };

    useEffect(()=>{
        if(filteredNotes){
            const notesMap = new Map(filteredNotes.map(note=>[note._id,note]))
            setFilteredNotesMap(notesMap)
        }
    }, [filteredNotes])



    return (
        <NotesContext.Provider value={{
            notes,
            filteredNotes,
            filteredNotesMap,
            debouncedValueForSearchText,
            setFilteredNotes,
            addNotes,
            addNote,
            updateNote,
            removeNote,
            setDebouncedValueForSearchText,

        }}>
            {children}
        </NotesContext.Provider>
    );
};

export default NotesContext;
