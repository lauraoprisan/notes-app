import React from 'react'
import Avatar from './Avatar'
import { useAuthContext } from '../hooks/useAuthContext'
import { useAuthCRUD } from '../hooks/useAuthCRUD'

const Header = () => {
	const { user } = useAuthContext()
	const { logout } = useAuthCRUD()

	const handleLogout = () => {
        logout()
    }

	return (
	<header className="header-container">
		<div className="left-side-header">
			<div className="logo"></div>
			<span> Home </span>
		</div>
		<div className="right-side-header">
			<Avatar/>
		</div>
		<span>{user?.username}</span>
		<button onClick={handleLogout}>Logout</button>
	</header>
	)
}

export default Header
