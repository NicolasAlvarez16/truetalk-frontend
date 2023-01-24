import "./post.scss"
import { Link } from "react-router-dom"
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MessageIcon from '@mui/icons-material/Message';
import ShareIcon from '@mui/icons-material/Share';

const Post = ({post}) => {

    // TEMPORARY 
    const liked = false

    return (
        <div className="post">
            <div className="container">
                <div className="user">
                    <div className="userInfo">
                        <img src={post.profilePic} alt="" />
                        <div className="details">
                            <Link to={`/profile/${post.userId}`} style={{textDecoration: "none", color: "inherit"}}>
                                <span className="name">{post.name}</span>
                            </Link>
                            <span className="date">1 min ago</span>
                        </div>
                    </div>
                    <MoreHorizIcon/>
                </div>
                <div className="content">
                    <p>{post.desc}</p>
                    <img src={post.img} alt="" />
                </div>
                <div className="info">
                    <div className="item">
                        {liked ? <FavoriteIcon/> : <FavoriteBorderIcon/>}
                        12 Likes
                    </div>
                    <div className="item">
                        <MessageIcon/>
                        12 Comments
                    </div>
                    <div className="item">
                        <ShareIcon/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post
