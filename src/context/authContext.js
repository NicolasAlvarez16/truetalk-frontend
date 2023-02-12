import { useState } from "react"
import { useEffect } from "react"
import { createContext } from "react"
import { loginUser } from "../services/userService"

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    // DEPRECATED
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    )
    // DEPRECATED

    const [token, setToken] = useState(
        JSON.parse(localStorage.getItem("token")) || null
    )
    
    const login = async (email, password) => {
        // TODO later combined with the backend services user-service an alethia-service
        const currentToken = await loginUser(email, password)
        setToken(currentToken)
        setCurrentUser({id:3, name:"Elon Musk", img:"https://i.kym-cdn.com/entries/icons/mobile/000/027/100/_103330503_musk3.jpg"})
    }

    // DEPRECATED
    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser))
    }, [currentUser])
    // DEPRECATED

    useEffect(() => {
        localStorage.setItem("token", JSON.stringify(token))
    }, [token])

    return(
        <AuthContext.Provider value={{ token, currentUser, login }}>
            {children}
        </AuthContext.Provider>
    )
}
