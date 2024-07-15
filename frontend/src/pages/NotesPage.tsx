import { useState, useEffect } from 'react';
import SingleNote from '../components/SingleNote';
import Masonry from 'react-masonry-css'
import CreateNoteForm from '../components/notes/CreateNoteForm';
import { useNotesContext } from '../hooks/useNotesContext';

import { Note } from '../types';
import { useAuthContext } from '../hooks/useAuthContext';
import useNoteCRUD from '../hooks/useNoteCRUD';


	const NotesPage = () => {
		const { user } = useAuthContext()
		console.log("user from notespage: ", user)
		const { getNotes, isLoading } = useNoteCRUD();
		const { notes } = useNotesContext();
		const [notesToShow, setNotesToShow] = useState<Note[] | null>(null);
		const [canGetLocalNotes, setCanGetLocalNotes] = useState<boolean>(false);

		const breakpointColumnsObj = {
		  default: 4,
		  1100: 3,
		  850: 2,
		  670: 1
		};

		// fetch notes from DB on the first render
		useEffect(() => {
			const getNotesFromDB = async ()=>{
				await getNotes();
				// setNotesToShow(notes)
			}
			getNotesFromDB()
		}, [user]);

		// setting to see all notes on the first render (because then the notesToShow will be null) and setting again all notes when the note that was created / created&updated in the same time after the form has been closed; this is in order to not see realtime the new note

		useEffect(() => {
			console.log("canGetLocalNotes")
			if (notes) {
			  if (canGetLocalNotes) {
				setNotesToShow(notes);
				setCanGetLocalNotes(false);
			  }
			}
		  }, [canGetLocalNotes]);

		 // Fetch notes from DB whenever user changes




	return (
		<div className="inside-container">
			<CreateNoteForm
				setCanGetLocalNotes={setCanGetLocalNotes}
			/>
			{isLoading && <span>Loading</span>}
			{!isLoading && (
				<div className="elements-container masonry-grid">
					{notes?.length === 0 && <p>You have no notes</p>}
					<Masonry
					breakpointCols={breakpointColumnsObj}
					className="my-masonry-grid"
					columnClassName="my-masonry-grid_column"
					>
						{notes?.map(note => (
							<SingleNote key={note._id} note={note}/>
						))}
					</Masonry>
				</div>
			)}
		</div>
	)
}

export default NotesPage
