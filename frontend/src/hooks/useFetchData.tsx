import { useState } from 'react';
import axios, {AxiosResponse} from 'axios';
import { useNotesContext } from './useNotesContext';
import { Note } from '../types';

const useFetchData = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { addNotes } = useNotesContext();

    const getNotes = async () => {
        console.log("getNotes called from hook")
        setIsLoading(true);
        try {
            const response: AxiosResponse = await axios.get<Note[]>('http://localhost:4000/api/notes');
            addNotes(response.data);
        } catch (error) {
            console.error('Failed to fetch notes:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return { getNotes, isLoading };
};

export default useFetchData;
