import { useEffect } from 'react';
import SingleNote from '../components/SingleNote';
import Masonry from 'react-masonry-css'
import CreateNoteForm from '../components/notes/CreateNoteForm';
import { useNotesContext } from '../hooks/useNotesContext';
import useFetchData from '../hooks/useNoteCRUD';

const NotesPage = () => {

	const {getNotes, isLoading} = useFetchData()
	const {notes} = useNotesContext()

    const breakpointColumnsObj = {
        default: 4,
        1100: 3,
        850: 2,
        670: 1
      };

	// get the notes from the DB and store them in the state manager when first loading the component
	useEffect(()=>{
		getNotes()
	},[])

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
