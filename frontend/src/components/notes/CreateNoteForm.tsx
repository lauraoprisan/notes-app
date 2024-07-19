import React, { useState, useEffect, useRef, useCallback } from 'react';
import { NoteInput, Note } from '../../types';
import { useDebounce } from '../../hooks/useDebounce';
import useNoteCRUD from '../../hooks/useNoteCRUD';
import useDetectClickInsideElement from '../../hooks/useDetectClickInsideElement';
import NoteOptions from './noteOptions/NoteOptions';
import { ColorOption } from './noteOptions/BackGroundColorOptions';



enum NoteStatus {
    NotCreated,
    Created,
}

interface CreateNoteFormProps {
	setWorkingOnCreateNoteForm: React.Dispatch<React.SetStateAction<boolean>>;
  }

  const CreateNoteForm: React.FC<CreateNoteFormProps> = ({ setWorkingOnCreateNoteForm }) => {

	const [isFocused, setIsFocused] = useState<boolean>(false);
	const formSectionRef = useRef<HTMLDivElement | null>(null);
	const {postNote, putNote, deleteNote} = useNoteCRUD();
	const [onWorkingNote, setOnWorkingNote] = useState<Note>()
	const [noteStatus, setNoteStatus] = useState<NoteStatus>(NoteStatus.NotCreated)
	const [temporaryBackgroundColor, setTemporaryBackgroundColor] = useState<ColorOption>(ColorOption.None)
	const [isNoteDeletedFromOptions, setIsNoteDeletedFromOptions] = useState<boolean>(false)


    const isClickInside = useDetectClickInsideElement(formSectionRef);

	// console.log("CreateNoteForm rerendered")

	const [formData, setFormData] = useState<NoteInput>({
		title: null,
		content: null,
		backgroundColor:null
	});

	const debouncedFormData = useDebounce(formData);

    useEffect(() => {
        const currentNote: NoteInput = {
            title: debouncedFormData.title,
            content: debouncedFormData.content,
			backgroundColor: debouncedFormData.backgroundColor
        };

        const handleNotes = async () => {
            if (noteStatus === NoteStatus.NotCreated && (debouncedFormData.title || debouncedFormData.content)) {
                const noteFromDB = await postNote(currentNote);
                setOnWorkingNote(noteFromDB);
                setNoteStatus(NoteStatus.Created);
            } else if (noteStatus === NoteStatus.Created && (debouncedFormData.title || debouncedFormData.content || debouncedFormData.backgroundColor)) {
                if (onWorkingNote) {
                	await putNote(onWorkingNote._id, currentNote);
                } else {
					console.log("Error: something went wrong. There is no id")
				}
            } else if (noteStatus === NoteStatus.Created && !debouncedFormData.title && !debouncedFormData.content ) {
                if (onWorkingNote) {
                    await deleteNote(onWorkingNote._id);
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
		if(!isClickInside || isNoteDeletedFromOptions){
			setIsFocused(false);
			setFormData({
				title: null,
				content: null
			});

			setNoteStatus(NoteStatus.NotCreated); //reset the noteStatus for an upcoming one

			setWorkingOnCreateNoteForm(false)
			setTemporaryBackgroundColor(ColorOption.None)
			setIsNoteDeletedFromOptions(false)
		}

	}, [isClickInside, isNoteDeletedFromOptions])


	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
		...prevData,
		[name]: value,
		}));
	};

	return (
		<div className={`create-note-section ${temporaryBackgroundColor} ${isFocused ? 'focused' : ''}`} ref={formSectionRef}>
			<form className="create-note-form">
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
				{/* <input
					type="text"
					className="create-note-description-input"
					placeholder="Create a note..."
					name="content"
					value={formData.content ?? ''}
					onFocus={handleShowFullForm}
					onChange={handleInputChange}
				/> */}
				<textarea
					className="create-note-description-textarea"
					name="content"
					placeholder="Create a note..."
					value={formData.content ?? ''}
					onFocus={handleShowFullForm}
					onChange={handleInputChange}
				>
				</textarea>
			</form>
			{isFocused && noteStatus === NoteStatus.Created && onWorkingNote &&(

				//probably a good idea to create a noteOptions context later
				<NoteOptions
					note={onWorkingNote}
					setNoteBgColorForCreateNoteForm={setTemporaryBackgroundColor}
					setIsNoteDeletedFromOptions={setIsNoteDeletedFromOptions}
				/>
			)}
		</div>

	);
};

export default CreateNoteForm;
