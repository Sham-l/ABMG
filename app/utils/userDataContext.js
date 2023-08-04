import { View, Text } from 'react-native'
import React,{createContext,useState,useEffect} from 'react'




const UserContext=createContext()

function UserDataContextProvider({children}) {

const [userId,setUserId]=useState(null)
const [isLoading,setIsLoading]=useState(true)
const [isLoggedIn,setIsLoggedIn]=useState(false)
const [tempUserId,setTempUserId]=useState(null)

  return (
    <UserContext.Provider value={{userId,setUserId,isLoading,setIsLoading,isLoggedIn,setIsLoggedIn,tempUserId,setTempUserId}}>
        {children}
    </UserContext.Provider>
  )
}


export {UserContext,UserDataContextProvider}