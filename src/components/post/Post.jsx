import "./post.scss"
import { Link, useNavigate } from "react-router-dom"
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MessageIcon from '@mui/icons-material/Message';
import ShareIcon from '@mui/icons-material/Share';
import Comments from "../comments/Comment";
import { useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";
import jwtDecode from "jwt-decode";

const Post = ({post, alreadyLiked}) => {

    const [commentOpen, setCommentOpen] = useState(false)
    const [liked, setLiked] = useState(alreadyLiked)
    const [likesLength, setLikesLength] = useState(post.likes.length)

    const { token } = useContext(AuthContext)

    const navigate = useNavigate()
        
    const getUuid = () => {
        const decodedToken = jwtDecode(token)
        return decodedToken.uuid
    }

    const likeUnlikeRequestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ post_id: post.id, user: getUuid() })
    };

    function commentsLenght() {
        if (post.comments === null) {
            return <span>0</span>
        } else {
            return <span>{post.comments.length}</span>
        }
    }

    const getPostLikes = async () => {
        const postLikes = await fetch("http://192.46.239.71:8002/api/posts/likes?post_id=" + post.id)
            .then((response) => response.json())
            .then((response) => response.data.post_likes)
        return postLikes
    }

    const handleLike = async () => {
        const postLikes = await getPostLikes()
        if (postLikes.includes(getUuid())) {
            fetch('http://192.46.239.71:8002/api/posts/unlike', likeUnlikeRequestOptions).finally(async () => {
                setLiked(false)
                const postLikesFinally = await getPostLikes()
                setLikesLength(postLikesFinally.length)
            })
        } else {
            fetch('http://192.46.239.71:8002/api/posts/like', likeUnlikeRequestOptions).finally(async () => {
                setLiked(true)
                const postLikesFinally = await getPostLikes()
                setLikesLength(postLikesFinally.length)
            })
        }
    }

    function getProfilePage() {
        return "/profile/" + post.user
    }

    function handleClick() {
        navigate(getProfilePage());
        window.location.reload()
    }
    

    return (
        <div className="post">
            <div className="container">
                <div className="user">
                    <div className="userInfo">
                        <img src={post.profilePic} alt="" />
                        <div className="details">
                            {/* <Link to={`/profile/${post.user}`} style={{textDecoration: "none", color: "inherit"}}>
                                <span className="name">{post.name}</span>
                            </Link> */}
                            <button onClick={handleClick} style={{all: "unset", cursor: "pointer"}}>{post.name}</button>
                            <span className="date">{post.date}</span>
                        </div>
                    </div>
                    <MoreHorizIcon/>
                </div>
                <div className="content">
                    <p>{post.text}</p>
                    <img src={post.img} alt="" />
                </div>
                <div className="info">
                    <div className="item">
                        {liked 
                            ? <FavoriteIcon style={{ color: "green"}} onClick={handleLike}/>
                            : <FavoriteBorderIcon onClick={handleLike}/>}
                        <span>{likesLength}</span>
                    </div>
                    <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
                        <MessageIcon/>
                        {commentsLenght()}
                    </div>
                    <div className="item">
                        <ShareIcon/>
                    </div>
                </div>
                {commentOpen && <Comments comments={post.comments} postId={post.id}/>}
            </div>
        </div>
    )
}

export default Post
