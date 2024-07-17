import React, { useState, useEffect, useRef, useCallback } from 'react';
import { NoteInput, Note } from '../../types';
import { useDebounce } from '../../hooks/useDebounce';
import useNoteCRUD from '../../hooks/useNoteCRUD';
import useDetectClickInsideElement from '../../hooks/useDetectClickInsideElement';



enum NoteStatus {
    NotCreated,
    Created,
}

interface CreateNoteFormProps {
	setWorkingOnCreateNoteForm: React.Dispatch<React.SetStateAction<boolean>>;
  }

  const CreateNoteForm: React.FC<CreateNoteFormProps> = ({ setWorkingOnCreateNoteForm }) => {

	const [isFocused, setIsFocused] = useState<boolean>(false);
	const formRef = useRef<HTMLFormElement | null>(null);
	const {postNote, putNote, deleteNote} = useNoteCRUD();
	const [currentNoteId, setCurrentNoteId] = useState<string | undefined>()
	const [noteStatus, setNoteStatus] = useState<NoteStatus>(NoteStatus.NotCreated)


    const isClickInside = useDetectClickInsideElement(formRef);

	console.log("CreateNoteForm rerendered")

	const [formData, setFormData] = useState<NoteInput>({
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
            } else if (noteStatus === NoteStatus.Created && (debouncedFormData.title || debouncedFormData.content)) {
                if (currentNoteId) {
                	await putNote(currentNoteId, currentNote);
                } else {
					console.log("Error: something went wrong. There is no id")
				}
            } else if (noteStatus === NoteStatus.Created && !debouncedFormData.title && !debouncedFormData.content) {
                if (currentNoteId) {
                    await deleteNote(currentNoteId);
                    setNoteStatus(NoteStatus.NotCreated); //reset the noteStatus for an upcoming one
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
		setWorkingOnCreateNoteForm(true)
	};


	useEffect(()=>{
		if(!isClickInside){
			setIsFocused(false);
			setFormData({
				title: null,
				content: null
			});

			setNoteStatus(NoteStatus.NotCreated); //reset the noteStatus for an upcoming one

			setWorkingOnCreateNoteForm(false)
		}

	}, [isClickInside])


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
