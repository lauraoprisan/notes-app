import { useState, useEffect } from 'react';
import SingleNote from '../components/SingleNote';
import Masonry from 'react-masonry-css'
import CreateNoteForm from '../components/notes/CreateNoteForm';
import { useNotesContext } from '../hooks/useNotesContext';
import useFetchData from '../hooks/useNoteCRUD';
import { Note } from '../types';


	const NotesPage = () => {
		const { getNotes, isLoading } = useFetchData();
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
			 getNotes();
		}, []);

		// setting to see all notes on the first render (because then the notesToShow will be null) and setting again all notes when the note that was created / created&updated in the same time after the form has been closed; this is in order to not see realtime the new note
		useEffect(() => {
			if (notes) {
			  if (notesToShow === null || canGetLocalNotes) {
				setNotesToShow(notes);
				setCanGetLocalNotes(false);
			  }
			}
		  }, [notes, canGetLocalNotes]);



	return (
		<div className="inside-container">
			<CreateNoteForm
				setCanGetLocalNotes={setCanGetLocalNotes}
			/>
			{isLoading && <span>Loading</span>}
			{!isLoading && (
				<div className="elements-container masonry-grid">
					{notesToShow?.length === 0 && <p>You have no notes</p>}
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
