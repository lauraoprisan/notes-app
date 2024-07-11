
import { useContext } from 'react';
import NotesContext, {NotesContextType } from '../context/NotesContext';


//making sure the NotesContext is not undefined when accesed
export const useNotesContext = (): NotesContextType => {
    const context = useContext(NotesContext);
    if (context === undefined) {
      throw new Error('useNotesContext must be used within a NotesProvider');
    }
    return context;
};