import React, { useEffect, useRef, useState } from 'react'
import { Note } from '../../types';
import MoreOptions from './noteOptions/MoreOptions';
import useDetectClickInsideElement from '../../hooks/useDetectClickInsideElement';

interface NoteOptionsProps {
    note: Note;
}

const NoteOptions: React.FC<NoteOptionsProps> = ({note}) => {

    const [closeAllModals, setCloseAllModals] = useState<boolean>(false)
    const containerRef = useRef<HTMLUListElement>(null);
    const isClickInside = useDetectClickInsideElement(containerRef);

  return (

    <ul ref={containerRef}  className={`note-options-container ${isClickInside ? "on-focus-note-options": ""}`}>
       <MoreOptions note={note} />
       <MoreOptions note={note}  />
       {/* <EditBackgroundColor/> */}


    </ul>
  )
}

export default NoteOptions

