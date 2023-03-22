import { useState } from "react"
import { useEffect } from "react"
import { createContext } from "react"
import axios from "axios"

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [token, setToken] = useState(
        JSON.parse(localStorage.getItem("token")) || null
    )
    
    const login = async (email, password) => {
        axios.post("https://143.42.26.143:8000/api/users/login", { 
                email: email,
                password: password
            }, {
                headers: { 'Content-Type': 'application/json' }
            }
        ).then(res => {
            console.log(res.data.data.token)
            setToken(res.data.data.token)
            window.location.href = '/'
        }).catch(_ => {
            alert("Invalid user")
            setToken(null)
        })
    }

    useEffect(() => {
        localStorage.setItem("token", JSON.stringify(token))        
    }, [token])

    return(
        <AuthContext.Provider value={{ token, login }}>
            {children}
        </AuthContext.Provider>
    )
}
