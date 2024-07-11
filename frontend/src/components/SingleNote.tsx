import React from 'react'
import { Note } from '../types';

// Define the Props interface
interface SingleNoteProps {
    note: Note;
  }

const SingleNote: React.FC<SingleNoteProps> = ({ note }) => {



  return (
    <div className="single-note grid-item">
        <h2>{note.title}</h2>
        <p>
            {note.content}
        </p>
        <ul>
            <li>edit note</li>
        </ul>

    </div>
  )
}

export default SingleNote
