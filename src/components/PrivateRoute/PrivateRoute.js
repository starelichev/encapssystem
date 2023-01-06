import React from 'react'
import {Navigate} from 'react-router-dom'

export const PrivateRoute = ({ isLoggedIn, children }) => {
    if (isLoggedIn) return children
    return <Navigate to='/login'/>
}