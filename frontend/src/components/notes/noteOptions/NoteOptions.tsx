import React, { useEffect, useRef, useState } from 'react'
import { Note } from '../../../types';
import MoreOptions from './MoreOptions';
import useDetectClickInsideElement from '../../../hooks/useDetectClickInsideElement';
import BackGroundColorOptions, { ColorOption } from './BackGroundColorOptions';

interface NoteOptionsProps {
    note: Note;
    setNoteBgColorForCreateNoteForm?: React.Dispatch<React.SetStateAction<ColorOption>>;
    setIsNoteDeletedFromOptions?:React.Dispatch<React.SetStateAction<boolean>>;
}

const NoteOptions: React.FC<NoteOptionsProps> = ({note, setNoteBgColorForCreateNoteForm, setIsNoteDeletedFromOptions}) => {

    const [closeAllModals, setCloseAllModals] = useState<boolean>(false)
    const containerRef = useRef<HTMLUListElement>(null);
    const isClickInside = useDetectClickInsideElement(containerRef);


  return (

    <ul ref={containerRef}  className={`note-options-container ${isClickInside ? "on-focus-note-options": ""}`}>
       <BackGroundColorOptions
          note={note}
          setNoteBgColorForCreateNoteForm={setNoteBgColorForCreateNoteForm}

        />
       <MoreOptions
        	note={note}
			    setIsNoteDeletedFromOptions={setIsNoteDeletedFromOptions}
		    />
       {/* <MoreOptions note={note}  /> */}
       {/* <EditBackgroundColor/> */}


    </ul>
  )
}

export default NoteOptions

