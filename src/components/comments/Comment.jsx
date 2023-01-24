import { useContext } from "react"
import { AuthContext } from "../../context/authContext"
import "./comments.scss"

const Comments = () => {

    const {currentUser} = useContext(AuthContext)
    // TEMPORARY
    const comments = [
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
        <div className="comments">
            <div className="write">
                <img src={currentUser.img} alt="" />
                <input type="text" placeholder="write a comment"/>
                <button>Send</button>
            </div>
            {comments.map(comment => (
                <div className="comment">
                    <img src={comment.profilePic} alt="" />
                    <div className="info">
                        <span>{comment.name}</span>
                        <p>{comment.desc}</p>
                    </div>
                    <span className="date">1 hour ago</span>
                </div>
            ))}
        </div>
    )
}

export default Comments
