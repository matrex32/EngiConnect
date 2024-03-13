import React from 'react'
import { createContext, useState } from 'react'

/**
 * Context to hold and provide user-specific data to other components.
 */
const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [currentUserData, setCurrentUserData] = useState(null);

    const updateCurrentUser = (updatedData) => {
        setCurrentUserData(updatedData);
    };

    return (
        <UserContext.Provider value={{ currentUserData, updateCurrentUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;