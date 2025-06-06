"use client"
import { getCurrentUser } from "@/services/AuthServices";
import { Tuser } from "@/types/types";
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";


interface IUserProviderValues {
    user:Tuser | null,
    isLoading: boolean,
    // setUser: (user:Tuser| null) => void,
    setUser: Dispatch<SetStateAction<Tuser | null>>
    setIsLoading: Dispatch<SetStateAction<boolean>>
}

const UserContext = createContext<IUserProviderValues | undefined>(undefined)

const UserProvider = ({children}: {children: React.ReactNode}) =>{

    const [user, setUser] = useState<Tuser | null>(null)
    const [isLoading, setIsLoading] = useState(true)

   

    useEffect(()=>{

        const handleUser = async() =>{
            const user = await getCurrentUser()
            setUser(user)
            setIsLoading(false)
        }

        handleUser()
    },[isLoading])

    return(
        <UserContext.Provider value={{user, setUser, isLoading, setIsLoading}}>
            {children}
        </UserContext.Provider>
    )

}

 export const useUser = () =>{
    const context = useContext(UserContext)
    if(context == undefined){
        throw new Error( "useUser must be used the UserProvider context ")
    }
    return context
}

export default UserProvider