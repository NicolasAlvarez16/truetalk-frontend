import "./profile.scss"
import PlaceIcon from '@mui/icons-material/Place';
import TranslateIcon from '@mui/icons-material/Translate';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import Posts from "../../components/posts/Posts";
import { useLocation } from "react-router-dom";
import { userProfile } from "../../services/userService";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"

const Profile = () => {

    const uuid = useLocation().pathname.split("/")[2]

    const [name, setName] = useState()
    const [country, setCountry] = useState()
    const [language, setLanguage] = useState()
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()
    
    useEffect(() => {
        fetch("http://localhost:8000/api/users/user-profile?uuid=" + uuid, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then(response => response.json())
        .then(response => {
            if (response.status === 200) {
                setName(response.data.name)
                setCountry(response.data.country)
                setLanguage(response.data.language)
            } else {
                navigate("/page-not-found")
            }
        })
        .catch((err) => {
            console.log(err.message)
        })
        .finally(() => {
            setLoading(false)
        })
    })

    console.log("Nameeee: ", name)
    if (loading) return "Loading...."

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
                        <span>{name}</span>
                        <div className="info">
                            <div className="item">
                                <PlaceIcon/>
                                <span>{country}</span>
                            </div>
                            <div className="item">
                                <TranslateIcon/>
                                <span>{language}</span>
                            </div>
                        </div>
                        <button>follow</button>
                    </div>
                    <div className="right">
                        {/* Email icon? */}
                        <MoreHorizIcon/>
                    </div>
                </div>
                <Posts uuid={uuid} name={name}/>
            </div>
        </div>
    )
}

export default Profile;
