import React, { useEffect, useRef, useState } from 'react'
import Modal from '../../modal/Modal'
import { Note } from '../../../types';
import useNoteCRUD from '../../../hooks/useNoteCRUD';
import useDetectClickInsideElement from '../../../hooks/useDetectClickInsideElement';

interface MoreOptionsProps {
    note: Note;
}

const MoreOptions: React.FC<MoreOptionsProps> = ({note }) => {
	const [openModal, setOpenModal] = useState<boolean>(false)
	const {deleteNote} = useNoteCRUD();
	const noteOptionListItemRef = useRef<HTMLLIElement>(null);
	const isClickInside = useDetectClickInsideElement(noteOptionListItemRef);


	useEffect(()=>{
		if(!isClickInside){
			setOpenModal(false)
		}
	},[isClickInside])


	const toggleModal = () => {
        setOpenModal(prev => !prev);
    };

	const handleDeleteNote = async() => {
        try {
            await deleteNote(note._id)
        } catch (error) {
            console.error(error)
        }

    }
  return (
    <li ref={noteOptionListItemRef} >
		<button className="more-options-icon  note-option-icon" onClick={toggleModal}/>
		{/* <div className="more-tag icon-tag">More</div> */}

		<Modal openModal={openModal}>
			<ul className="more-options-list">
				<li><button onClick={handleDeleteNote}>Delete</button></li>
			</ul>
		</Modal>
	</li>
  )
}

export default MoreOptions

