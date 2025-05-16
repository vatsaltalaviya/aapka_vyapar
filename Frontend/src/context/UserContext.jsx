import React, { createContext, useState } from 'react'

export const UserContextData = createContext();
const UserContext = ({children}) => {
    const [userEmail, setuserEmail] = useState('')
    
  return (
    <UserContextData.Provider value={[userEmail, setuserEmail]}>
        {children}
    </UserContextData.Provider>
  )
}

export default UserContext