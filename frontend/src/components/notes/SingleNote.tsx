import React, { useRef, useState } from 'react';
import { Note } from '../../types';
import NoteOptions from './noteOptions/NoteOptions';
import EditModal from '../modal/EditModal';
import NoteEditMode from './NoteEditMode';
import { useNotesContext } from '../../hooks/useNotesContext';

// Define the Props interface
interface SingleNoteProps {
    note: Note;
}

const SingleNote: React.FC<SingleNoteProps> = ({ note }) => {
    const [isEditModeOn, setIsEditModeOn] = useState<boolean>(false);
    const { filteredNotesMap, debouncedValueForSearchText } = useNotesContext();
    const currentNoteRef = useRef<HTMLDivElement>(null);
    const isEmptyNote = !note.title && !note.content;

    const handleEnableEditMode = () => {
        setIsEditModeOn(true);
    };

    const handleCloseModal = () => {
        setIsEditModeOn(false);
    };

    const highlightSearchedText = (text: string | null, searchedTexts: string[] | null): JSX.Element => {
		// if(!filteredNotesMap?.has(note._id)) return <>{text}</>;
		if (!text || !searchedTexts || searchedTexts.length === 0) return <>{text}</>;

		// Create a single regular expression pattern from the searched texts
		const regex = new RegExp(`(${searchedTexts.join('|')})`, 'gi');

		// Split the text by the regex pattern
		const fragmentedText = text.split(regex);

		// Map over the fragments to apply highlighting
		return (
			<>
				{fragmentedText.map((part, index) => (
					// Check if the part is a match for any of the search terms
					searchedTexts?.some(term => term.toLowerCase() === part.toLowerCase()) ? (
						<span className="searched-text-highlight" key={index}>{part}</span>
					) : (
						part
					)
				))}
			</>
		);
    };

    // function splitByDelimiter(text: string, delimiter: string) {
    //     const result: string[] = [];
    //     let startIndex = 0;
    //     let index = text.indexOf(delimiter);

    //     while (index !== -1) {
    //         result.push(text.slice(startIndex, index)); //leftpart
    //         result.push(text.slice(index, index + delimiter.length));
    //         startIndex = index + delimiter.length;
    //         index = text.indexOf(delimiter, startIndex);
    //     }

    //     result.push(text.slice(startIndex));//rightparte
	// 	//check for second word in leftpart and right part
    //     return result;
    // }

    return (
        <>
            <div
                className={`single-note grid-item ${note.backgroundColor ? note.backgroundColor : ''} ${isEditModeOn ? 'hide-while-edit-mode' : ''}`}
                ref={currentNoteRef}
            >
                <div className="single-note-main-content" onClick={handleEnableEditMode}>
                    <h2>{highlightSearchedText(note.title, debouncedValueForSearchText)}</h2>
                    {isEmptyNote ? (
                        <span className="empty-note">Empty note</span>
                    ) : (
                        <div className="display-static-large-text">
                            {highlightSearchedText(note.content, debouncedValueForSearchText)}
                        </div>
                    )}
                </div>
                <NoteOptions note={note} />
            </div>

            <EditModal openModal={isEditModeOn} onClose={handleCloseModal}>
                <NoteEditMode note={note} />
            </EditModal>
        </>
    );
};

export default SingleNote;
