import { useState } from "react"
import { useEffect } from "react"
import { createContext } from "react"
import { loginUser } from "../services/userService"

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [token, setToken] = useState(
        JSON.parse(localStorage.getItem("token")) || null
    )
    
    const login = async (email, password) => {
        // TODO:
        // Use axios instead
        let currentToken = await loginUser(email, password)
        if (!currentToken) {
            alert("Invalid email or password")
            setToken(null)
            return
        }
        setToken(currentToken)
    }

    useEffect(() => {
        setTimeout(() => {
            localStorage.setItem("token", JSON.stringify(token))
        }, 100)
    }, [token])

    return(
        <AuthContext.Provider value={{ token, login }}>
            {children}
        </AuthContext.Provider>
    )
}
