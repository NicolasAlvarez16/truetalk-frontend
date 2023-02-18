import "./post.scss"
import { Link } from "react-router-dom"
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MessageIcon from '@mui/icons-material/Message';
import ShareIcon from '@mui/icons-material/Share';
import Comments from "../comments/Comment";
import { SettingsInputComponent } from "@mui/icons-material";
import { useState } from "react";

const Post = ({post}) => {

    const [commentOpen, setCommentOpen] = useState(false)

    // TEMPORARY 
    const liked = false

    function commentsLenght() {
        if (post.comments === null) {
            return <span>0</span>
        } else {
            return <span>{post.comments.length}</span>
        }
    }

    return (
        <div className="post">
            <div className="container">
                <div className="user">
                    <div className="userInfo">
                        <img src={post.profilePic} alt="" />
                        <div className="details">
                            <Link to={`/profile/${post.user}`} style={{textDecoration: "none", color: "inherit"}}>
                                <span className="name">{post.name}</span>
                            </Link>
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
                        {liked ? <FavoriteIcon/> : <FavoriteBorderIcon/>}
                        {post.likes}
                    </div>
                    <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
                        <MessageIcon/>
                        {commentsLenght()}
                    </div>
                    <div className="item">
                        <ShareIcon/>
                    </div>
                </div>
                {commentOpen && <Comments/>}
            </div>
        </div>
    )
}

export default Post
