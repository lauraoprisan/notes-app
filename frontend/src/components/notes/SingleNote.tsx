import React, { useEffect, useRef, useState } from 'react'
import { Note } from '../../types';
import NoteOptions from './noteOptions/NoteOptions';
import EditModal from '../modal/EditModal';
import NoteEditMode from './NoteEditMode';


// Define the Props interface
interface SingleNoteProps {
    note: Note;
  }

const SingleNote: React.FC<SingleNoteProps> = ({ note }) => {
	const [isEditModeOn, setIsEditModeOn] = useState<boolean>
	(false)
	const currentNoteRef = useRef<HTMLDivElement>(null);
	const isEmptyNote = !note.title && !note.content

	const handleEnableEditMode = () => {
		setIsEditModeOn(true)
	}

	const handleCloseModal = () => {
        setIsEditModeOn(false);
    };

  return (
	<>
		<div className={`single-note grid-item ${note.backgroundColor ? note.backgroundColor : ''} ${isEditModeOn ? 'hide-while-edit-mode' : ''}`} ref={currentNoteRef}>
			<div className="single-note-main-content" onClick={handleEnableEditMode}>
				<h2>{note.title}</h2>
				{isEmptyNote? (
					<span className="empty-note">Empty note</span>
				) :(
					<div
					className="display-static-large-text">
						{note.content}
					</div>
				)}
			</div>
			<NoteOptions note={note}/>

		</div>

		<EditModal openModal={isEditModeOn} onClose={handleCloseModal}>
			<NoteEditMode note = {note}/>
		</EditModal>

	</>


  )
}

export default SingleNote
