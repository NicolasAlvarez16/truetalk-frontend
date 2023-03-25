import "./profile.scss"
import PlaceIcon from '@mui/icons-material/Place';
import TranslateIcon from '@mui/icons-material/Translate';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import Posts from "../../components/posts/Posts";
import { useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/authContext";
import jwtDecode from "jwt-decode";
import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import ContactsIcon from '@mui/icons-material/Contacts';

const Profile = () => {

    const uuid = useLocation().pathname.split("/")[2]
    
    const { token } = useContext(AuthContext)
    
    const [following, setFollowing] = useState()

    const [profileUrl, setProfileUrl] = useState()

    function getUuid() {
        const decodedToken = jwtDecode(token)
        return decodedToken.uuid
    }
    
    function isCurrentUserProfile() {
        if (getUuid() !== uuid) {
            return false
        }
        return true
    }   

    useEffect(()=>{
        fetch("https://truetalk.ie:8000/api/users/list-followees?uuid=" + getUuid())
            .then((response) => response.json())
            .then((response) => {
                setFollowing(response.data.followees.includes(uuid))
            })
        
        fetch("https://truetalk.ie:8000/api/users/profile-picture-url?uuid=" + uuid)
            .then((res) => res.json())
            .then((res) => {
                setProfileUrl(res.data.profile_picture_url)
            })
    }, []) 
    

    function button() { 
        if (!isCurrentUserProfile()) {
            if (following) {
                return <button onClick={handleUnfollow} style={{ background: "salmon"}}>unfollow</button>    
            }
            return <button onClick={handleFollow}>follow</button>
        }
    }

    function handleFollow() {
        axios.post("https://truetalk.ie:8000/api/users/follow",  { 
            follower_id: getUuid(),
            followee_id: uuid
        }, {
            headers: { 'Content-Type': 'application/json'}
        })
        setFollowing(true)
    }

    function handleUnfollow() {
        axios.post("https://truetalk.ie:8000/api/users/unfollow",  { 
            follower_id: getUuid(),
            followee_id: uuid
        }, {
            headers: { 'Content-Type': 'application/json'}
        })
        setFollowing(false)
    }

    const {isLoading, error, data} = useQuery(['profile'], () => 
        axios.get("https://truetalk.ie:8000/api/users/user-profile?uuid=" + uuid).then(res => {
            return res.data.data
        })
    )

    return (
        <div className="profile">
            <div className="images">
                {/* <img src="https://www.flytap.com/-/media/Flytap/new-tap-pages/destinations/europe/ireland/dublin/destinations-dublin-banner-mobile-1024x553.jpg" alt="" className="cover" /> */}
                <img src={profileUrl} alt="" className="profilePic" />
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
                                <ContactsIcon/>
                                {error ? <span>Something went wrong</span> : isLoading ? " " : <span>{data.followers}</span>}
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
