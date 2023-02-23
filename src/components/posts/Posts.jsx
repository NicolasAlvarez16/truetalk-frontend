import Post from "../post/Post"
import "./posts.scss"
import axios from "axios"
import { useQueries } from "@tanstack/react-query"
import { useLocation } from "react-router-dom";

const Posts = ({uuid}) => {

    const path = useLocation().pathname.split("/")[1]

    async function getUserPosts() {
        return axios.get("http://localhost:8002/api/posts/user-posts?uuid=" + uuid).then(res => {
            const data =  res.data.data.user_posts
            const posts = formatPost(data)
            return posts
        })
    }

    async function getFolloweePosts() {
        if (path === 'profile') {
            return []
        }
        return axios.get("http://localhost:8002/api/posts/followee-posts?uuid=" + uuid).then(res => {
            const data = res.data.data.followees_posts
            const posts = formatPost(data)
            return posts
        })
    }

    function formatPost(data) {
        const posts = []

        data.forEach((post) => {
            const postDate = new Date(post.cratedAt * 1000).toLocaleDateString()
            const postTime = new Date(post.cratedAt * 1000).toLocaleTimeString()
            posts.push({
                id: post.id,
                name: post.name,
                user: uuid,
                profilePic: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
                text: post.text,
                date: postDate + " " + postTime,
                likes: post.likes,
                comments: post.comments,
            })
        })

        return posts
    }

    const [userPosts, followeePosts] = useQueries({
        queries: [
            {
                queryKey: ['posts'],
                queryFn: () => getUserPosts()
            },
            {
                queryKey: ['followeePosts'],
                queryFn: () => getFolloweePosts()
            },
        ],
    })

    
    if (followeePosts.isLoading) return "Loading posts..."
    if (userPosts.isLoading) return "Loading posts..."
    
    if (followeePosts.error) return "An error has occurred"
    if (userPosts.error) return "An error has occurred"

    function fomatPostDate(date) {
        const [datePart, timePart] = date.split(' ')
        const [day, month, year] = datePart.split('/')
        return new Date(`${year}-${month}-${day} ${timePart}`)
    }
    
    const pagePosts = () => {
        const allPosts = followeePosts.data.concat(userPosts.data)
        allPosts.sort((a, b) => fomatPostDate(b.date) - fomatPostDate(a.date))
        return allPosts
    }
    
    return (
        <div className="posts">
            {pagePosts().map((post) => <Post post={post}/>)}
        </div>
    )
}

export default Posts
