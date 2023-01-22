import React,{useState} from 'react'

export const UserContext = React.createContext()
export const UserProvider = ({children}) =>{
    const[currentUser,setCurrentUser]=useState(null)
    const[users,setUsers]= useState([{}])
    const[messages,setMessages]= useState([])
    return(
        <UserContext.Provider value={{currentUser,setCurrentUser,users,setUsers,messages,setMessages}}>
            {children}
        </UserContext.Provider>
    )
}
