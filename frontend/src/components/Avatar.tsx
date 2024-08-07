import React, { useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext';
import userProfilePlaceholder from '../user-placeholder.png'

export enum AvatarSize {
  small, large
}

interface AvatarProps {
  size?: AvatarSize;
}

const Avatar: React.FC<AvatarProps> = ({ size = AvatarSize.small }) => {
  const { user } = useAuthContext();


  console.log("user?.profileImageURL: ", user?.profileImageURL)
  return (
    <div className="avatar-container">
        <img className={`avatar-image ${size === AvatarSize.large ? 'large' : 'small'}`} src={user?.profileImageURL || userProfilePlaceholder}
          referrerPolicy="no-referrer"
        />
    </div>
  )
}

export default Avatar
