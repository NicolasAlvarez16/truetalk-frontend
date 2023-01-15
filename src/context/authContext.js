import { useState } from "react"
import { useEffect } from "react"
import { createContext } from "react"

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    )
    
    const login = () => {
        // TODO later combined with the backend services user-service an alethia-service
        setCurrentUser({id:1, name:"Nicolas Alvarez"})
    }

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser))
    }, [currentUser])

    return(
        <AuthContext.Provider value={{ currentUser, login }}>
            {children}
        </AuthContext.Provider>
    )
}
