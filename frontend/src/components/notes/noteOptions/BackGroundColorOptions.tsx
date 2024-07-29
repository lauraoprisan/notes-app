
import React, { MouseEventHandler, useEffect, useRef, useState } from 'react'
import Modal from '../../modal/Modal'
import { Note } from '../../../types';
import useNoteCRUD from '../../../hooks/useNoteCRUD';
import useDetectClickInsideElement from '../../../hooks/useDetectClickInsideElement';

interface BackGroundColorOptionsProps {
    note: Note;
    setNoteBgColorForCreateNoteForm?: React.Dispatch<React.SetStateAction<ColorOption>>;
}

export enum ColorOption {
    None = 'none',
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

const BackGroundColorOptions: React.FC<BackGroundColorOptionsProps> = ({note, setNoteBgColorForCreateNoteForm}) => {

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


    const handleUpdateBackgroundColor: MouseEventHandler<HTMLUListElement> = async (event) => {
        const target = event.target as HTMLLIElement;
        const backgroundColor = target.dataset.backgroundColor as ColorOption;

        if (backgroundColor) {

            if(setNoteBgColorForCreateNoteForm){
                setNoteBgColorForCreateNoteForm(backgroundColor);
            }

            if (note) {
                await putNote(note._id, {backgroundColor} );
            }

            // Remove selected-color class from all li elements
            const ul = target.parentElement as HTMLUListElement;
            const liElements = ul.querySelectorAll('li');
            liElements.forEach(li => li.classList.remove('selected-color'));

            // Add selected-color class to the clicked li element
            target.classList.add('selected-color');
        }
    };


    //set selected-color for the note.backgroundColor
    useEffect(() => {
        const liChosenColor = document.querySelector(`li[data-background-color="${note.backgroundColor}"]`);
        if (liChosenColor) {
            const lis = liChosenColor.parentElement?.querySelectorAll('li');
            lis?.forEach(li => li.classList.remove('selected-color'));
            liChosenColor.classList.add('selected-color');
        }
    }, [openModal, note.backgroundColor]);

  return (
    <li ref={noteOptionListItemRef}  >
		<button className="background-color-menu-icon note-option-icon" onClick={toggleModal}/>
		{/* <div className="more-tag icon-tag">More</div> */}

        {/* I added both className and dataset with the same value just for preference in working with both now */}
		<Modal openModal={openModal}>
			<ul className="color-options-list more-options-list" onClick={handleUpdateBackgroundColor}>
                <li className={`no-color`} data-background-color={ColorOption.None}></li>
                <li className={` ${ColorOption.Red}`} data-background-color={ColorOption.Red}></li>
                <li className={` ${ColorOption.Brown}`} data-background-color={ColorOption.Brown}></li>
                <li className={` ${ColorOption.Orange}`} data-background-color={ColorOption.Orange}></li>
                <li className={` ${ColorOption.Yellow}`} data-background-color={ColorOption.Yellow}></li>
                <li className={` ${ColorOption.Green}`} data-background-color={ColorOption.Green}></li>
                <li className={` ${ColorOption.Blue}`} data-background-color={ColorOption.Blue}></li>
                <li className={` ${ColorOption.Pink }`} data-background-color={ColorOption.Pink}></li>
                <li className={` ${ColorOption.Purple}`} data-background-color={ColorOption.Purple}></li>
                <li className={` ${ColorOption.Grey}`} data-background-color={ColorOption.Grey}></li>
			</ul>
		</Modal>
	</li>
  )
}

export default BackGroundColorOptions

