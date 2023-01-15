import { useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/authContext"
import "./login.scss"

const Login = () => {

    const {login} = useContext(AuthContext)

    const handleLogin = () => {
        login()
    }

    return (
        <div className="login">
            <div className="card">
                <div className="left">
                    <h1>Hello World</h1>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse et blandit dolor, non eleifend nisl. 
                        Nulla imperdiet sed urna ac lobortis. Vestibulum ante massa, consequat faucibus viverra non, porttitor in mauris. 
                        Aliquam ultricies massa ex, vel volutpat nulla tristique in. Donec in suscipit leo, a venenatis eros. 
                        Praesent semper volutpat volutpat.
                    </p>
                    <span>Don't have an account?</span>
                    <Link to="/register">
                        <button>Register</button>
                    </Link>
                </div>
                <div className="right">
                    <h1>Login</h1>
                    <form>
                        <input type="text" placeholder="username"/>
                        <input type="password" placeholder="password"/>
                        <button onClick={handleLogin}>Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
