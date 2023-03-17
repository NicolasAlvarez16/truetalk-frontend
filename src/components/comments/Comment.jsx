import { useContext, useState } from "react"
import { AuthContext } from "../../context/authContext"
import "./comments.scss"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import jwtDecode from "jwt-decode";
import axios from "axios";

const Comments = ({comments, postId}) => {

    const [postComment, setPostComment] = useState('')

    const { token } = useContext(AuthContext);

    const queryClient = useQueryClient();

    const getComments = (comments) => {
        const formattedComments = []
        
        comments.forEach((comment) => {
            const commentDate = new Date(comment.createdAt * 1000).toLocaleDateString()
            const commentTime = new Date(comment.createdAt * 1000).toLocaleTimeString()
            formattedComments.push({
                id: comment.id,
                name: comment.name,
                user: comment.user,
                profilePic: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
                text: comment.text,
                date: commentDate + " " + commentTime,
            })
        })

        return formattedComments
    }

    function getUuid() {
        const decodedToken = jwtDecode(token)
        return decodedToken.uuid
    }

    const handleClick = async (e) => {
        e.preventDefault();
        mutation.mutate({ text: postComment });
        setPostComment("");
    };
    
    const orderedComments = (comments) => {
        const orderedComments = getComments(comments)
        orderedComments.sort((a, b) => fomatPostDate(b.date) - fomatPostDate(a.date))
        return orderedComments
    }

    function fomatPostDate(date) {
        const [datePart, timePart] = date.split(' ')
        const [day, month, year] = datePart.split('/')
        return new Date(`${year}-${month}-${day} ${timePart}`)
    }

    const mutation = useMutation(
        (newComment) => {
          return axios.post("http://192.46.239.71:8002/api/posts/comment", { 
                text: newComment.text, 
                user: getUuid(),
                post_id: postId
            }, {
                headers: { 'Content-Type': 'application/json'}
            });
        },
        {
          onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries(["posts"]);
          },
        }
      );


    return (
        <div className="comments">
            <div className="write">
                <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="" />
                <input 
                    type="text" 
                    placeholder="write a comment"
                    onChange={(e) => setPostComment(e.target.value)}
                    value={postComment}
                />
                <button onClick={handleClick}>Send</button>
            </div>
            {orderedComments(comments).map(comment => (
                <div className="comment">
                    <img src={comment.profilePic} alt="" />
                    <div className="info">
                        <span>{comment.name}</span>
                        <p>{comment.text}</p>
                    </div>
                    <span className="date">{comment.date}</span>
                </div>
            ))}
        </div>
    )
}

export default Comments
