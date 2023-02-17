import { useRef } from "react"
import { useState, useEffect} from "react"
import { userPosts } from "../../services/postService"
import Post from "../post/Post"
import "./posts.scss"
import { useNavigate } from "react-router-dom"
import { userProfile } from "../../services/userService"

const Posts = ({uuid, name}) => {

    const [posts, setPosts] = useState([])
    const effectCalled = useRef(false);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!effectCalled.current) {
            effectCalled.current = true
            return
        }
        fetch("http://localhost:8002/api/posts/user-posts?uuid=" + uuid, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then(response => response.json())
        .then(response => {
            if (response.status === 200) {
                for (var i = 0; i < response.data.user_posts.length; i++) {
                    const post = response.data.user_posts[i]
                    const postDate = new Date(post.cratedAt * 1000).toLocaleDateString()
                    const postTime = new Date(post.cratedAt * 1000).toLocaleTimeString()
                    setPosts((prevPosts) => [...prevPosts, 
                        {
                            id: post.id,
                            name: name,
                            user: uuid,
                            profilePic: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
                            text: post.text,
                            date: postDate + " " + postTime,
                            likes: post.likes,
                            comments: post.comments,
                        }
                    ])
                }
            }
        })
        .catch((err) => {
            console.log(err.message)
        })
        .finally(() => {
            setLoading(false)
        })
    }, [])

    if (loading) return "Loading...."

    return (
        <div className="posts">
            {posts.map(post => (
                <Post post={post} key={post.id}/>
            ))}
        </div>
    )
}

export default Posts
