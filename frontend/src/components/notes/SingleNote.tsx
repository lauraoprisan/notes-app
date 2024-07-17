import React, { useEffect, useRef, useState } from 'react'
import { Note } from '../../types';
import NoteOptions from './NoteOptions';
import EditModal from '../modal/EditModal';


// Define the Props interface
interface SingleNoteProps {
    note: Note;
  }

const SingleNote: React.FC<SingleNoteProps> = ({ note }) => {
	const [isEditModeOn, setIsEditModeOn] = useState<boolean>
	(false)
	const currentNoteRef = useRef<HTMLDivElement>(null);

	const handleEnableEditMode = () => {
		setIsEditModeOn(true)
	}

	const handleCloseModal = () => {
        setIsEditModeOn(false);
    };

	// useEffect(()=>{
	// 	if(isEditModeOn){
	// 		const notePosition = currentNoteRef.current?.getBoundingClientRect()
	// 		console.log("notePosition, ", notePosition?.top)
	// 	}
	// }, [isEditModeOn])


  return (
	<>

		<div className={`single-note grid-item ${isEditModeOn ? " hide-while-edit-mode": ""}`} ref={currentNoteRef} >
			<div className="single-note-main-content" onClick={handleEnableEditMode}>
				<h2>{note.title}</h2>
				<p>
					{note.content}
				</p>
			</div>
			<NoteOptions note={note}/>

		</div>
		<EditModal openModal={isEditModeOn} onClose={handleCloseModal}>
				<div  className={`single-note grid-item ${isEditModeOn ? "edit-mode-note": ""}`}>
					<div className="single-note-main-content">
						<h2>{note.title}</h2>
						<p>
							{note.content}
						</p>
					</div>
					<NoteOptions note={note}/>
				</div>
		</EditModal>

	</>


  )
}

export default SingleNote
