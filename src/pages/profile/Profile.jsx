import "./profile.scss"
import PlaceIcon from '@mui/icons-material/Place';
import TranslateIcon from '@mui/icons-material/Translate';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import Posts from "../../components/posts/Posts";
import { useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import jwtDecode from "jwt-decode";
import axios from "axios"
import { useQuery } from "@tanstack/react-query"

const Profile = () => {

    const uuid = useLocation().pathname.split("/")[2]

    const { token } = useContext(AuthContext)

    function isCurrentUserProfile() {
        const decodedToken = jwtDecode(token)
        if (!decodedToken.uuid === uuid) {
            return false
        }
        return true
    }

    function button() {
        // TODO:
        // Hide the button instead using the dom
        if (!isCurrentUserProfile()) {
            return <button>follow</button>
        }
    }

    const {isLoading, error, data} = useQuery(['profile'], () => 
        axios.get("http://localhost:8000/api/users/user-profile?uuid=" + uuid).then(res => {
            return res.data.data
        })
    )

    return (
        <div className="profile">
            <div className="images">
                {/* <img src="https://www.flytap.com/-/media/Flytap/new-tap-pages/destinations/europe/ireland/dublin/destinations-dublin-banner-mobile-1024x553.jpg" alt="" className="cover" /> */}
                <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="" className="profilePic" />
            </div>
            <div className="profileContainer">
                <div className="uInfo">
                    <div className="left">
                        {/* some icons */}
                    </div>
                    <div className="center">
                    {error ? <span>Something went wrong</span> : isLoading ? " " : <span>{data.name}</span>}
                        <div className="info">
                            <div className="item">
                                <PlaceIcon/>
                                {error ? <span>Something went wrong</span> : isLoading ? " " : <span>{data.country}</span>}
                            </div>
                            <div className="item">
                                <TranslateIcon/>
                                {error ? <span>Something went wrong</span> : isLoading ? " " : <span>{data.language}</span>}
                            </div>
                        </div>
                        {button()}
                    </div>
                    <div className="right">
                        {/* Email icon? */}
                        <MoreHorizIcon/>
                    </div>
                </div>
                {error ? <span>Something went wrong</span> : isLoading ? " " : <Posts/>}
            </div>
        </div>
    )
}

export default Profile;
