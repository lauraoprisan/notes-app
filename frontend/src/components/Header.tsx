import React, { useEffect, useRef, useState } from 'react';
import Avatar, { AvatarSize } from './Avatar';
import { useAuthContext } from '../hooks/useAuthContext';
import { useAuthCRUD } from '../hooks/useAuthCRUD';

const Header = () => {
  const { user } = useAuthContext();
  const { logout } = useAuthCRUD();
  const [showUserMenu, setShowUserMenu] = useState<boolean>(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);

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

  return (
    <header className="header-container">
      <div className="left-side-header">
        <div className="logo"></div>
        <span> Home </span>
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
