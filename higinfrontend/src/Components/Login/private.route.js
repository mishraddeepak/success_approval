import React from 'react'
import {Navigate} from 'react-router-dom'

const PrivateRoute=({children,allowedRole})=>{
    const token =localStorage.getItem('authToken')
    const userRole = localStorage.getItem('userRole')

    if(!token||userRole!==allowedRole){
        return <Navigate to='/' replace/>
    }
    return children
}

export default PrivateRoute