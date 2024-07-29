import React, { useEffect, useRef, useState } from 'react';
import Avatar, { AvatarSize } from './Avatar';
import { useAuthContext } from '../hooks/useAuthContext';
import { useAuthCRUD } from '../hooks/useAuthCRUD';
import { useDebounce } from '../hooks/useDebounce';
import { useNotesContext } from '../hooks/useNotesContext';

const Header = () => {
	const { user } = useAuthContext();
	const { logout } = useAuthCRUD();
	const {notes, setFilteredNotes, setDebouncedValueForSearchText} = useNotesContext();
	const [showUserMenu, setShowUserMenu] = useState<boolean>(false);
	const [inputContent, setInputContent] = useState<string | null>(null)
	const userMenuRef = useRef<HTMLDivElement>(null);
	const avatarRef = useRef<HTMLDivElement>(null);
	const debouncedSearchText = useDebounce(inputContent);

	const handleLogout = () => {
		logout();
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (
			userMenuRef.current &&
			!userMenuRef.current.contains(event.target as Node) &&
			avatarRef.current &&
			!avatarRef.current.contains(event.target as Node)
		) {
			setShowUserMenu(false);
		}
	};

	useEffect(() => {
		if (showUserMenu) {
			document.addEventListener('mousedown', handleClickOutside);
		} else {
			document.removeEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [showUserMenu]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputContent(e.target.value);
	};

	useEffect(()=>{
		if(inputContent && notes){
			const wordsArray = inputContent.split(" ").filter(word => word)
			const filteredNotes = wordsArray.reduce((acc, word) => {
				return acc.filter(note =>
					note.content?.toLowerCase().includes(word.toLowerCase()) ||
					note.title?.toLowerCase().includes(word.toLowerCase())
				);
			}, notes);

			setFilteredNotes(filteredNotes)
			setDebouncedValueForSearchText(wordsArray);
		}

		if(!inputContent) {
			setFilteredNotes(null)
			setDebouncedValueForSearchText(null)
		}

	}, [debouncedSearchText])

  return (
	<header className="header-container">
		<div className="left-side-header">
			<div className="logo"></div>
			<span> Home </span>
		</div>

		<div className="search-input-container">
			<input
				type="text"
				placeholder='Search'
				className="search-input"
				onChange={handleInputChange}
			/>
		</div>

		<div className="right-side-header">
			<div
			ref={avatarRef}
			onClick={() => setShowUserMenu((prev) => !prev)}
			>
			<Avatar />
			</div>
			<div
			ref={userMenuRef}
			className={`user-menu ${showUserMenu ? 'show-user-menu' : ''}`}
			>
			<span>{user?.email}</span>
			<Avatar size={AvatarSize.large} /> {/* Pass size prop here */}
			<span>Hi, {user?.username}</span>
			<button className="logout-button" onClick={handleLogout}>
				Logout
			</button>
			</div>
		</div>
	</header>
	);
};

export default Header;
