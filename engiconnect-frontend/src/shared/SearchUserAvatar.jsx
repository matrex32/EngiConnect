import React from 'react';
import { Avatar } from '@mui/material';

function SearchUserAvatar({ size, profileImagePath }) {

    const imageUrlWithTimestamp = profileImagePath ? `${profileImagePath}?timestamp=${new Date().getTime()}` : null;

    return (
        <Avatar
            src={imageUrlWithTimestamp}
            alt="User Avatar"
            style={{ width: size, height: size }}
        />
    );
}

export default SearchUserAvatar;
