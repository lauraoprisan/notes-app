import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { NoteInput, Note } from '../../types';
import { useNotesContext } from '../../hooks/useNotesContext';
import { useDebounce } from '../../hooks/useDebounce';

interface FormData {
  title: string | null,
  content: string | null
}

enum NoteStatus {
    NotCreated,
    Created,
}

const CreateNoteForm = () => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement | null>(null);
  const { addNote, updateNote } = useNotesContext();
  const [noteStatus, setNoteStatus] = useState<NoteStatus>(NoteStatus.NotCreated)
  const [formData, setFormData] = useState<FormData>({
      title: null,
      content: null
    });

  const debouncedFormData = useDebounce(formData);


  useEffect(() => {
    if (debouncedFormData.title || debouncedFormData.content) {
      const newNote: NoteInput = {
        title: debouncedFormData.title,
        content: debouncedFormData.content,
      };

    //   if (noteStatus === NoteStatus.NotCreated) {
    //     addNote(newNote);
    //     setNoteStatus(NoteStatus.Created) // if no error occured;
    //   } else {
    //     updateNote(newNote);
    //   }
    }
  }, [debouncedFormData]);

  // For when the input is on focus
  const handleShowFullForm = () => {
    setIsFocused(true);
  };

  // When clicking outside the form, set the focus to false
  const handleClickOutside = (e: MouseEvent) => {
    if (formRef.current && !formRef.current.contains(e.target as Node)) {
      setIsFocused(false)
      setFormData({
        title: null,
        content: null
      });
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <form
      className={`create-note-form ${isFocused ? 'focused' : ''}`}
      ref={formRef}
    >
      {isFocused && (
        <input
          type="text"
          className="create-note-title-input"
          placeholder="Title"
          name="title"
          value={formData.title ?? ''}
          onChange={handleInputChange}
        />
      )}
      <input
        type="text"
        className="create-note-description-input"
        placeholder="Create a note..."
        name="content"
        value={formData.content ?? ''}
        onFocus={handleShowFullForm}
        onChange={handleInputChange}
      />
    </form>
  );
};

export default CreateNoteForm;
