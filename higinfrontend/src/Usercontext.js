import React,{createContext, useContext, useState} from 'react'

export const UserContext = createContext()

export const UserProvider = ({children})=>{
const [role,setRole]=useState('')
return(
    <UserContext.Provider value={{role,setRole}}>
        {children}
    </UserContext.Provider>
)
}

export const useUser=()=>{
    return useContext(UserContext)
}