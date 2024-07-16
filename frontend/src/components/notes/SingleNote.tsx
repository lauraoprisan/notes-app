import React from 'react'
import { Note } from '../../types';
import NoteOptions from './NoteOptions';

// Define the Props interface
interface SingleNoteProps {
    note: Note;
  }

const SingleNote: React.FC<SingleNoteProps> = ({ note }) => {



  return (
    <div className="single-note grid-item">
		<div className="single-note-main-content">
			<h2>{note.title}</h2>
			<p>
				{note.content}
			</p>
		</div>
        <NoteOptions note={note}/>
    </div>
  )
}

export default SingleNote
