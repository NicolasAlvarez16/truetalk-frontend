import "./register.scss"

const Register = () => {
    return (
        <div className="register">
            <div className="card">
                <div className="left">
                    <h1>Welcome to hive</h1>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse et blandit dolor, non eleifend nisl. 
                        Nulla imperdiet sed urna ac lobortis. Vestibulum ante massa, consequat faucibus viverra non, porttitor in mauris. 
                        Aliquam ultricies massa ex, vel volutpat nulla tristique in. Donec in suscipit leo, a venenatis eros. 
                        Praesent semper volutpat volutpat.
                    </p>
                    <span>Do you have an account?</span>
                    <button>Login</button>
                </div>
                <div className="right">
                    <h1>Register</h1>
                    <form>
                        <input type="text" placeholder="email"/>
                        <input type="tel" placeholder="phone number"/>
                        <input type="password" placeholder="password"/>
                        <button>Register</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register
