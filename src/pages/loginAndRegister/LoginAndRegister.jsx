import { useRef, useState, useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/authContext"
import { registerUser } from "../../services/userService"
import { formValidation } from "./formValidation"
import "./loginAndRegister.scss"

function LoginAndRegister(props) {

    const { login } = useContext(AuthContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [formErrors, setFormErrors] = useState('')

    const handleLogin = () => {
        login()
    }

    const rightPanelActive = useRef(null)

    const activateRightPanel = () => {
        rightPanelActive.current.classList.add("right-panel-active");
        setFormErrors('');
    }

    const deactivateRightPanle = () => {
        rightPanelActive.current.classList.remove("right-panel-active")
        setFormErrors('');
    }

    const setErrors = (email, password, confirmPassword=null) => {
        Object.entries(formValidation(email, password, confirmPassword)).forEach((entry) => {
            const [key, value] = entry
            setFormErrors((prevState) => ({ ...prevState, [key]: value }))
        })
    }

    const handleSignUpSubmit = (e) => {
        e.preventDefault()
        setErrors(email, password, confirmPassword)
        if (!formErrors.email && !formErrors.password && !formErrors.confirmPassword) {
            registerUser(email, password)
        }
    }

    const handleSignInSubmit = (e) => {
        e.preventDefault()
        setErrors(email, password)
    }

    return (
        <div className="login">
            <div className={`container ${props.isRightPanelActive}`} id="container" ref={rightPanelActive}>
                <div className="form-container sign-up-container">
                    <form onSubmit={handleSignUpSubmit}>
                        <h1>Create Account</h1><br></br>
                        {/* <div className="social-container">
                            <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                            <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                            <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                        </div> */}
                        {/* <span>or use your email for registration</span> */}
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        {formErrors.email && <span className="error">{formErrors.email}</span>}
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        {formErrors.password && <span className="error">{formErrors.password}</span>}
                        <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                        {formErrors.confirmPassword && <span className="error">{formErrors.confirmPassword}</span>}
                        {/* <input type="tel" id="phone" name="phone" placeholder="Phone Number"/> */}
                        <br></br><button type="submit">Sign Up</button>
                    </form>
                </div>
                <div className="form-container sign-in-container">
                    <form onSubmit={handleSignInSubmit}>
                        <h1>Sign in</h1><br></br>
                        {/* <div className="social-container">
                            <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                            <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                            <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                        </div> */}
                        {/* <span>or use your account</span> */}
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        {formErrors.email && <span className="error">{formErrors.email}</span>}
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        {formErrors.password && <span className="error">{formErrors.password}</span>}
                        <a href="#">Forgot your password?</a>
                        <button onClick={handleLogin}>Sign In</button>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <Link to="/login">
                                <button className="ghost" id="signIn" onClick={deactivateRightPanle}>Sign In</button>
                            </Link>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Hello, Friend!</h1>
                            <p>Enter your personal details and start journey with us</p>
                            <Link to="/register">
                                <button className="ghost" id="signUp" onClick={activateRightPanel}>Sign Up</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            {/* It will be nice to use this footer to redirect to a landing page where the project and the roadmap is explained */}
            {/* <footer>
                <p>
                    Created with <i className="fa fa-heart"></i> by
                    <a target="_blank" href="https://florin-pop.com">Florin Pop</a>
                    - Read how I created this and how you can join the challenge
                    <a target="_blank" href="https://www.florin-pop.com/blog/2019/03/double-slider-sign-in-up-form/">here</a>.
                </p>
            </footer> */}
        </div> 
    )
}

export default LoginAndRegister
