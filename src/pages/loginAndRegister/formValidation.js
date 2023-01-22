export function formValidation(email, password, confirmPassword) {
    return {
        email: emailValidation(email),
        password: passwordValidation(password),
        confirmPassword: confirmPasswordValidation(password, confirmPassword)
    }
}

const emailValidation = (email) => {
    if(!email) {
        return "Email is required"
    } else {
        return ''
    }
}

const passwordValidation = (password) => {
    if(!password) {
        return "Password is required"
    } else if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i.test(password)) {
        return "Password must be at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character"
    } else {
        return ""
    }
}

const confirmPasswordValidation = (password, confirmPassword) => {
    if(!confirmPassword) {
        return "Confrim Password is required"
    } else if(password !== confirmPassword) {
        return "Passwords do no match"
    } else {
        return ''
    }
}