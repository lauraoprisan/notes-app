import React, { useEffect, useRef, useState } from 'react'
import Modal from '../modal/Modal'
import useNoteCRUD from '../../hooks/useNoteCRUD';
import { Note } from '../../types';

interface NoteOptionsProps {
    note: Note;
}

const NoteOptions: React.FC<NoteOptionsProps> = ({note}) => {
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [isClickInside, setIsClickInside] = useState<boolean>(false);
    const {deleteNote} = useNoteCRUD();
    const containerRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        const handleDocumentClick = (event: MouseEvent) => {
            if (containerRef?.current?.contains(event.target as Node)) {
                setIsClickInside(true);
            } else {
                setIsClickInside(false);
                setOpenModal(false)
            }
        };

        document.addEventListener('mousedown', handleDocumentClick);

        return () => {
            document.removeEventListener('mousedown', handleDocumentClick);
        };
    }, []);

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

    <ul ref={containerRef}  className={`note-options-container ${isClickInside ? "on-focus-note-options": ""}`}>
        <li>
            <button
                className="more-options-icon  note-option-icon"
                onClick={toggleModal}
            />
            {/* <div className="more-tag icon-tag">More</div> */}

            <Modal openModal={openModal}>
                <ul className="more-options-list">
                    <li><button onClick={handleDeleteNote}>Delete</button></li>
                </ul>
            </Modal>
        </li>
       
        {/* <li>
            <div className="more-options-icon  note-option-icon"></div>
            <div className="more-tag icon-tag">bf</div>
        </li> */}
    </ul>


  )
}

export default NoteOptions
