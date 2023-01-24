import { useState } from "react"
import Post from "../post/Post"
import "./posts.scss"

const Posts = () => {

    // TEMPORARY
    const posts = [
        {
            id: 1,
            name: "Elon Musk",
            userId: 1,
            profilePic: "https://i.kym-cdn.com/entries/icons/mobile/000/027/100/_103330503_musk3.jpg",
            desc: "lorem ipsum lorem ipsum",
            img: "https://i.kym-cdn.com/entries/icons/mobile/000/018/012/this_is_fine.jpg"
        },
        {
            id: 2,
            name: "Elon Musk",
            userId: 1,
            profilePic: "https://i.kym-cdn.com/entries/icons/mobile/000/027/100/_103330503_musk3.jpg",
            desc: "lorem ipsum lorem ipsum",
            img: "https://i.kym-cdn.com/entries/icons/mobile/000/018/012/this_is_fine.jpg"
        }
    ]
    return (
        <div className="posts">
            {posts.map(post => (
                <Post post={post} key={post.id}/>
            ))}
        </div>
    )
}

export default Posts
