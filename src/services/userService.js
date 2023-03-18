export async function registerUser(email, password) {
    await fetch("http://143.42.26.143:8000/api/users/register-user", {
        method: 'POST',
        body: JSON.stringify({
            email: email,
            password: password,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    .then((response) => console.log(response.json()))
    .catch((err) => {
        console.log(err.message)
    })
}
