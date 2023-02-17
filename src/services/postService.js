export async function userPosts(uuid) {
    return await fetch("http://localhost:8002/api/posts/user-posts?uuid=" + uuid, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    .then(response => response.json())
    .then(response => {
        if (response.status === 200) {
            return response.data.user_posts
        }
        return false
    })
    .catch((err) => {
        console.log(err.message)
    })
}