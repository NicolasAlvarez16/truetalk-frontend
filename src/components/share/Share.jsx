import "./share.scss";
// import Image from "../../assets/img.png";
// import Map from "../../assets/map.png";
// import Friend from "../../assets/friend.png";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useQuery } from "@tanstack/react-query"
import jwtDecode from "jwt-decode";

// THIS STILL NEEDS TO GRO THROUGH CHANGES
const Share = () => {

  const [file, setFile] = useState(null);
  const [postText, setPostText] = useState("");
  const [profileUrl, setProfileUrl] = useState()

//   const upload = async () => {
//     try {
//       const formData = new FormData();
//       formData.append("file", file);
//       const res = await makeRequest.post("/upload", formData);
//       return res.data;
//     } catch (err) {
//       console.log(err);
//     }
//   };

  const { token } = useContext(AuthContext);

  const queryClient = useQueryClient();

  function getUuid() {
    const decodedToken = jwtDecode(token)
    return decodedToken.uuid
  }

  const {isLoading, error, data} = useQuery(['name'], () => 
    axios.get("http://143.42.26.143:8000/api/users/user-profile?uuid=" + getUuid()).then(res => {
        return res.data.data.name
    })
  )


  const mutation = useMutation(
    (newPost) => {
      return axios.post("http://143.42.26.143:8002/api/posts/save-post", { 
            text: newPost.text, 
            user: getUuid()
        }, {
            headers: { 'Content-Type': 'application/json'}
        });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();
    // let imgUrl = "";
    // if (file) imgUrl = await upload();
    mutation.mutate({ text: postText });
    setPostText("");
    // setFile(null);
  };

  useEffect(()=>{    
    fetch("http://143.42.26.143:8000/api/users/profile-picture-url?uuid=" + getUuid())
        .then((res) => res.json())
        .then((res) => {
            setProfileUrl(res.data.profile_picture_url)
        })
}, []) 

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <div className="left">
            <img src={profileUrl} alt="" />
            <input
              type="text"
              placeholder={`What's on your mind ${error ? "Something went wrong!" : isLoading ? " " : data}?`}
              onChange={(e) => setPostText(e.target.value)}
              value={postText}
            />
          </div>
          <div className="right">
            {file && (
              <img className="file" alt="" src={URL.createObjectURL(file)} />
            )}
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label htmlFor="file">
              <div className="item">
                <img src="" alt="" />
                <span>Add Image</span>
              </div>
            </label>
            <div className="item">
              <img src="" alt="" />
              <span>Add Place</span>
            </div>
            <div className="item">
              <img src="" alt="" />
              <span>Tag Friends</span>
            </div>
          </div>
          <div className="right">
            <button onClick={handleClick}>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
