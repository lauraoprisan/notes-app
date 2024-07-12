import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { NoteInput, Note } from '../../types';
import { useNotesContext } from '../../hooks/useNotesContext';
import { useDebounce } from '../../hooks/useDebounce';
import useNoteCRUD from '../../hooks/useNoteCRUD';

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
	const {postNote, putNote, deleteNote} = useNoteCRUD();
	const [currentNoteId, setCurrentNoteId] = useState<string | undefined>()
	const [noteStatus, setNoteStatus] = useState<NoteStatus>(NoteStatus.NotCreated)

	const [formData, setFormData] = useState<FormData>({
		title: null,
		content: null
	});

	const debouncedFormData = useDebounce(formData);

    useEffect(() => {
        console.log("useEffect called from CreateNoteForm");
        console.log("debouncedFormData from CreateNoteForm", debouncedFormData);

        const currentNote: NoteInput = {
            title: debouncedFormData.title,
            content: debouncedFormData.content,
        };

        const handleNotes = async () => {
            if (noteStatus === NoteStatus.NotCreated && (debouncedFormData.title || debouncedFormData.content)) {
                const noteIdFromDB = await postNote(currentNote);
                setCurrentNoteId(noteIdFromDB);
                setNoteStatus(NoteStatus.Created);
            } else if (noteStatus === NoteStatus.Created && (debouncedFormData.title || debouncedFormData.content)) {
                if (currentNoteId) {
                	await putNote(currentNoteId, currentNote);
                } else {
					console.log("Error: something went wrong. There is no id")
				}
            } else if (noteStatus === NoteStatus.Created && !debouncedFormData.title && !debouncedFormData.content) {
                if (currentNoteId) {
                    await deleteNote(currentNoteId);
                    setNoteStatus(NoteStatus.NotCreated);
                }
            }
        };

        handleNotes();

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
		setNoteStatus(NoteStatus.NotCreated)
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
