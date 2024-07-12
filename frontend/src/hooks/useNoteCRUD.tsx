import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useNotesContext } from './useNotesContext';
import { Note, NoteInput } from '../types';

// this hook manages all the CRUD operations on note, managing both DB and the react state management for notes
const useNoteCRUD = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { addNote, addNotes, updateNote, removeNote } = useNotesContext();

    const getNotes = async () => {
        console.log("getNotes called from hook");
        setIsLoading(true);
        try {
            const response: AxiosResponse<Note[]> = await axios.get<Note[]>('http://localhost:4000/api/notes');
            addNotes(response.data);
        } catch (error) {
            console.error('Failed to fetch notes:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const postNote = async (noteData: NoteInput) => {
        console.log("postNote called from hook");
        setIsLoading(true);
        try {
            const response: AxiosResponse<Note> = await axios.post<Note>('http://localhost:4000/api/notes', noteData);
            addNote(response.data);
            return response.data._id;
        } catch (error) {
            console.error('Failed to post the note:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const putNote = async (id: string, noteData: NoteInput) => {
        setIsLoading(true);
        try {
            const response: AxiosResponse<Note> = await axios.put<Note>(`http://localhost:4000/api/notes/${id}`, noteData);
            updateNote(response.data);
        } catch (error) {
            console.error('Failed to update the note:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const deleteNote = async (id: string) => {
        console.log("deleteNote called from hook");
        setIsLoading(true);
        try {
            await axios.delete(`http://localhost:4000/api/notes/${id}`);
            removeNote(id);
        } catch (error) {
            console.error('Failed to delete the note:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return { getNotes, postNote, putNote, deleteNote, isLoading };
};

export default useNoteCRUD;
