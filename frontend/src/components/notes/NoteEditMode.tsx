import React, { useEffect, useRef, useState } from 'react'
import NoteOptions from './noteOptions/NoteOptions'
import { Note, NoteInput, NoteInputForEditOrDelete } from '../../types'
import useNoteCRUD from '../../hooks/useNoteCRUD'
import { useDebounce } from '../../hooks/useDebounce'
import { formatDate } from '../../utils/timeAgo'

interface NoteEditModeProps {
    note: Note
}



const NoteEditMode: React.FC<NoteEditModeProps>= ({note}) => {

    const { putNote } = useNoteCRUD();

    const initialFormData = useRef<NoteInput>({
        title: note.title ?? '',
        content: note.content ?? '',
    });

    const [formData, setFormData] = useState<NoteInput>(initialFormData.current);
    const debouncedFormData = useDebounce(formData);

    useEffect(() => {
        const handleEditNote = async () => {
            if (
                debouncedFormData.title !== initialFormData.current.title ||
                debouncedFormData.content !== initialFormData.current.content
            ) {
                await putNote(note._id, debouncedFormData);
                initialFormData.current = debouncedFormData;
            }
        };

        handleEditNote();
    }, [debouncedFormData, note._id, putNote]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };


  return (
    <div  className="single-note edit-mode-note">
        <form className="single-note-main-content edit-note-form ">
            <input
                type="text"
                className="edit-note-title-input"
                placeholder="Title"
                name="title"
                value={formData.title as string}
                onChange={handleInputChange}
            />
            <textarea
                name="content"
                value={formData.content as string}
            	onChange={handleInputChange}
            >
            </textarea>
        </form>
        <span className="last-edit-time"> Edited  {formatDate(note.updatedAt)}</span>
        <NoteOptions note={note}/>
    </div>
  )
}

export default NoteEditMode


{/* <div  className="single-note edit-mode-note">
        <form className="single-note-main-content edit-note-form ">
            <input
                type="text"
                className="edit-note-title-input"
                placeholder="Title"
                name="title"
                value={note.title ?? ''}
                onChange={handleInputChange}
            />
            <textarea
            	onChange={handleInputChange}
            >
                {note.content}
            </textarea>
        </form>
        <NoteOptions note={note}/>
    </div> */}
