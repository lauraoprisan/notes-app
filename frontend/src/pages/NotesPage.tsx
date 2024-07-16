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

		const breakpointColumnsObj = {
		  default: 4,
		  1100: 3,
		  850: 2,
		  670: 1
		};

		// fetch notes from DB on the first render
		useEffect(() => {
			const fetchNotes = async () => {
				await getNotes();
			};
			fetchNotes();
		}, [user]);


	return (
		<div className="inside-container">
			<CreateNoteForm/>
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
