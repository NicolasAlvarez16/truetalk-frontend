import Post from "../post/Post"
import "./posts.scss"
import axios from "axios"
import { useQueries } from "@tanstack/react-query"
import { useLocation } from "react-router-dom";
import { useContext } from "react"
import jwtDecode from "jwt-decode";
import { AuthContext } from "../../context/authContext";
import { useState } from "react";

const Posts = () => {

    const path = useLocation().pathname.split("/")[1]
    const pathUuid = useLocation().pathname.split("/")[2]

    const { token } = useContext(AuthContext);

    const [profileUrl, setProfileUrl] = useState()

    const getUuid = () => {
        const decodedToken = jwtDecode(token)
        return decodedToken.uuid
    }

    async function getUserPosts() {
        let uuidCall = getUuid()
        if (pathUuid !== undefined) {
            uuidCall = pathUuid
        }
        
        return axios.get("https://truetalk.ie:8002/api/posts/user-posts?uuid=" + uuidCall).then(res => {
            const data =  res.data.data.user_posts
            const posts = formatPost(data)
            return posts
        })
    }

    async function getFolloweePosts() {
        if (path === 'profile') {
            return []
        }
        return axios.get("https://truetalk.ie:8002/api/posts/followee-posts?uuid=" + getUuid()).then(res => {
            const data = res.data.data.followees_posts
            const posts = formatPost(data)
            return posts
        })
    }

    function getProfileUrl(uuid) {
        fetch("https://truetalk.ie:8000/api/users/profile-picture-url?uuid=" + uuid)
            .then((res) => res.json())
            .then((res) => {
                setProfileUrl(res.data.profile_picture_url)
            })
    }

    function formatPost(data) {
        const posts = []
        data.forEach((post) => {
            const postDate = new Date(post.createdAt * 1000).toLocaleDateString()
            const postTime = new Date(post.createdAt * 1000).toLocaleTimeString()
            getProfileUrl(post.user)
            posts.push({
                id: post.id,
                name: post.name,
                user: post.user,
                profilePic: profileUrl,
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
    
    const homePosts = () => {
        const allPosts = followeePosts.data.concat(userPosts.data)
        allPosts.sort((a, b) => fomatPostDate(b.date) - fomatPostDate(a.date))
        return allPosts
    }
    
    return (
        <div className="posts">
            {homePosts().map((post) => <Post post={post} alreadyLiked={post.likes.includes(getUuid())}key={post.id}/>)}
        </div>
    )
}

export default Posts
