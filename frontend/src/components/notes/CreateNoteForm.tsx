import React, { useState, useEffect, useRef, useCallback } from 'react';
import { NoteInput, Note } from '../../types';
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

interface CreateNoteFormProps {
	setCanGetLocalNotes: React.Dispatch<React.SetStateAction<boolean>>;
  }

  const CreateNoteForm: React.FC<CreateNoteFormProps> = ({ setCanGetLocalNotes }) => {
	const [isFocused, setIsFocused] = useState<boolean>(false);
	const formRef = useRef<HTMLFormElement | null>(null);
	const {postNote, putNote, deleteNote} = useNoteCRUD();
	const [currentNoteId, setCurrentNoteId] = useState<string | undefined>()
	const [noteStatus, setNoteStatus] = useState<NoteStatus>(NoteStatus.NotCreated)
	const [clickedOutsideForm, setClickedOutsideForm] = useState<boolean>(false)
	const [noteCreatedOrUpdated, setNoteCreatedOrUpdated] = useState<boolean>(false);

	const canGetLocalNotes = noteCreatedOrUpdated && clickedOutsideForm;

	console.log("CreateNoteForm rerendered")

	const [formData, setFormData] = useState<FormData>({
		title: null,
		content: null
	});

	const debouncedFormData = useDebounce(formData);

    useEffect(() => {
        const currentNote: NoteInput = {
            title: debouncedFormData.title,
            content: debouncedFormData.content,
        };

        const handleNotes = async () => {
            if (noteStatus === NoteStatus.NotCreated && (debouncedFormData.title || debouncedFormData.content)) {
                const noteIdFromDB = await postNote(currentNote);
                setCurrentNoteId(noteIdFromDB);
                setNoteStatus(NoteStatus.Created);
				setNoteCreatedOrUpdated(true)
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
					setNoteCreatedOrUpdated(false)
                } else {
					console.log("Error: something went wrong. There is no id")
				}
            }
        };

        handleNotes();

    }, [debouncedFormData]);

  // For when the input is on focus
	const handleShowFullForm = () => {
		setIsFocused(true);
		setClickedOutsideForm(false)
	};

  // When clicking outside the form, set the focus to false
	const handleClickOutside = useCallback((e: MouseEvent) => {
		if (formRef.current && !formRef.current.contains(e.target as Node)) {
		setIsFocused(false);

		setFormData({
			title: null,
			content: null
		});
		setNoteStatus(NoteStatus.NotCreated);

		if (noteCreatedOrUpdated) {
			setCanGetLocalNotes(true);
		}
		// Reset the state
		setNoteCreatedOrUpdated(false);
		}

	}, [noteCreatedOrUpdated, setCanGetLocalNotes]);

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
		document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [handleClickOutside]);

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
