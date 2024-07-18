
import React, { useEffect, useRef, useState } from 'react'
import Modal from '../../modal/Modal'
import { Note } from '../../../types';
import useNoteCRUD from '../../../hooks/useNoteCRUD';
import useDetectClickInsideElement from '../../../hooks/useDetectClickInsideElement';

interface BackGroundColorOptionsProps {
    note: Note;
}

enum ColorOption {
    Orange = "orange",
    Yellow = "yellow",
    Blue = "blue",
    Green = "green",
    Purple = "purple",
    Pink = "pink",
    Red = "red",
    Brown ="brown",
    Grey = "grey"
}

const BackGroundColorOptions: React.FC<BackGroundColorOptionsProps> = ({note }) => {

	const [openModal, setOpenModal] = useState<boolean>(false)
	const {putNote} = useNoteCRUD();
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


  return (
    <li ref={noteOptionListItemRef}  >
		<button className="background-color-menu-icon note-option-icon" onClick={toggleModal}/>
		{/* <div className="more-tag icon-tag">More</div> */}

		<Modal openModal={openModal}>
			<ul className="color-options-list more-options-list">
                <li className="no-color selected-color"></li>
                <li className={ColorOption.Red}></li>
                <li className={` ${ColorOption.Orange} selected-color`}></li>
                <li className={` ${ColorOption.Pink }`}></li>
                <li className={` ${ColorOption.Yellow}`}></li>
                <li className={` ${ColorOption.Green}`}></li>
                <li className={` ${ColorOption.Blue}`}></li>
                <li className={` ${ColorOption.Purple}`}></li>
                <li className={` ${ColorOption.Brown}`}></li>
                <li className={` ${ColorOption.Grey}`}></li>

			</ul>
		</Modal>
	</li>
  )
}

export default BackGroundColorOptions

