import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useNotesContext } from './useNotesContext';
import { Note, NoteInput } from '../types';
import { ColorOption } from '../components/notes/noteOptions/BackGroundColorOptions';

// this hook manages all the CRUD operations on note, managing both DB and the react state management for notes
const useNoteCRUD = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { notes, addNote, addNotes, updateNote, removeNote, filteredNotes } = useNotesContext();


    const getAuthToken = () => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        return user?.token;
    };

    const getNotes = async () => {
        setIsLoading(true);
        try {
            const token = getAuthToken();
            const response: AxiosResponse<Note[]> = await axios.get<Note[]>(`${process.env.REACT_APP_API_URL}/api/notes`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            addNotes(response.data);

            return response.data as Note[]; //this helps in managing get local notes behavior

        } catch (error) {
            console.error('Failed to fetch notes:', error);
        } finally {
            setIsLoading(false);

        }
    };

    const postNote = async (noteData: NoteInput) => {
        setIsLoading(true);
        try {
            const token = getAuthToken();
            const response: AxiosResponse<Note> = await axios.post<Note>(`${process.env.REACT_APP_API_URL}/api/notes`, noteData, {
                headers: { Authorization: `Bearer ${token}` }
            });

            addNote(response.data);
            return response.data;
        } catch (error) {
            console.error('Failed to post the note:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const putNote = async (id: string, noteData: NoteInput) => {
        setIsLoading(true);
        try {
            const token = getAuthToken();
            const response: AxiosResponse<Note> = await axios.put<Note>(`${process.env.REACT_APP_API_URL}/api/notes/${id}`, noteData, {
                headers: { Authorization: `Bearer ${token}` }
            });

            updateNote(response.data);

        } catch (error) {
            console.error('Failed to update the note:', error);
        } finally {
            setIsLoading(false);
        }
    };



    const deleteNote = async (id: string) => {
        setIsLoading(true);
        try {
           const token = getAuthToken();
            await axios.delete(`${process.env.REACT_APP_API_URL}/api/notes/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

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
