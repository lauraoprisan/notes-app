import React, { useState } from 'react'

export enum AvatarSize {
  small, large
}

interface AvatarProps {
  size?: AvatarSize;
}

const Avatar: React.FC<AvatarProps> = ({ size = AvatarSize.small }) => {

  return (
    <div className="avatar-container">
        <div className={`avatar-image ${size === AvatarSize.large ? 'large' : 'small'}`}></div>
    </div>
  )
}

export default Avatar
