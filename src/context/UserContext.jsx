import React,{useState} from 'react'

export const UserContext = React.createContext()
export const UserProvider = ({children}) =>{
    const[currentUser,setCurrentUser]=useState(null)
    const[users,setUsers]= useState([{}])
    return(
        <UserContext.Provider value={{currentUser,setCurrentUser,users,setUsers}}>
            {children}
        </UserContext.Provider>
    )
}
