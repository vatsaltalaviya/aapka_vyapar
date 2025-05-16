import React from 'react'
import "../Pages/auth.css"

const AuthContainer = ({children}) => {
  return (
    <div className="container">
        <div className="inner-container">
            {children}
        </div>
    </div>
  )
}

export default AuthContainer