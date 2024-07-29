import { useState, useEffect } from 'react';
import SingleNote from '../components/notes/SingleNote';
import Masonry from 'react-masonry-css'
import CreateNoteForm from '../components/notes/CreateNoteForm';
import { useNotesContext } from '../hooks/useNotesContext';

import { Note } from '../types';
import { useAuthContext } from '../hooks/useAuthContext';
import useNoteCRUD from '../hooks/useNoteCRUD';


	const NotesPage = () => {
		const { user } = useAuthContext()
		const { getNotes, isLoading } = useNoteCRUD();
		const { notes, filteredNotes } = useNotesContext();
		const [notesToShow, setNotesToShow] = useState<Note[] | null >(null)
		const [workingOnCreateNoteForm, setWorkingOnCreateNoteForm] = useState<boolean>(false);

		//this is for the masonry grid
		const breakpointColumnsObj = {
		  default: 4,
		  1100: 3,
		  850: 2,
		  670: 1
		};


		// fetch notes from DB on the first render and whenever the user changes (dependent on local storage)
		// set notesToShow at first render to notes
		useEffect(() => {
			const fetchNotes = async () => {
				const notesFromDB = await getNotes();
				setNotesToShow(notesFromDB ?? []);
			};
			fetchNotes();
		}, [user]);


		//do not get local notes (from context) while working on the create note form
		useEffect(() => {
			if (!workingOnCreateNoteForm) {
				if(filteredNotes){
					setNotesToShow(filteredNotes)
				} else {
					setNotesToShow(notes)
				}
			}

		}, [notes, workingOnCreateNoteForm, filteredNotes]);

	return (
		<div className="inside-container">
			<CreateNoteForm setWorkingOnCreateNoteForm={setWorkingOnCreateNoteForm} />
			{isLoading && <span>Loading</span>}

			{!isLoading && (
				<div className="elements-container masonry-grid">
					{filteredNotes?.length===0 ? (				//filteredNotes === [] if the search is done but no results and filteredNotes===null if no search is done
						 <p>No matching results</p>
					) : notesToShow?.length === 0 && <p>You have no notes</p>}
					<Masonry
					breakpointCols={breakpointColumnsObj}
					className="my-masonry-grid"
					columnClassName="my-masonry-grid_column"
					>
						{notesToShow?.map(note => (
							<SingleNote key={note._id} note={note}/>
						))}
					</Masonry>
				</div>
			)}
		</div>
	)
}

export default NotesPage
