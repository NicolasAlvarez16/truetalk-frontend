export async function registerUser(email, password) {
    await fetch("http://localhost:8000/api/users/register-user", {
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

export async function loginUser(email, password) {
    return await fetch("http://localhost:8000/api/users/login", {
        method: 'POST',
        body: JSON.stringify({
            email: email,
            password: password
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    .then(response => response.json())
    .then(response => {
        if(response.status === 200) {
            return response.data.token
        }
        return null
    })
    .catch((err) => {
        console.log(err.message)
    })
}

export async function userProfile(uuid) {
    return await fetch("http://localhost:8000/api/users/user-profile?uuid=" + uuid, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    .then(response => response.json())
    .then(response => {
        if (response.status === 200) {
            return {
                name: response.data.name, 
                country: response.data.country, 
                language:response.data.language
            }
        }
        return false
    })
    .catch((err) => {
        console.log(err.message)
    })
}
