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
        setCurrentUser({id:1, name:"Elon Musk", img:"https://i.kym-cdn.com/entries/icons/mobile/000/027/100/_103330503_musk3.jpg"})
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
