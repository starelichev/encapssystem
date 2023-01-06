import React from 'react'
import { Navigate } from 'react-router-dom'

export const PublicRoute = ({ isLoggedIn, children }) => {
        if (!isLoggedIn) {
                return children
        }
        return <Navigate to='/'/>
}