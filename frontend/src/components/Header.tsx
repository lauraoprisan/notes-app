import React from 'react'
import Avatar from './Avatar'

const Header = () => {
  return (
    <header className="header-container">
        <div className="left-side-header">
            <div className="logo"></div>
            <span> Home </span>
        </div>
        <div className="right-side-header">
            <Avatar/>
        </div>
    </header>
  )
}

export default Header
