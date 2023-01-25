import "./profile.scss"
import PlaceIcon from '@mui/icons-material/Place';
import TranslateIcon from '@mui/icons-material/Translate';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import Posts from "../../components/posts/Posts";


const Profile = () => {
    return (
        <div className="profile">
            <div className="images">
                <img src="https://www.flytap.com/-/media/Flytap/new-tap-pages/destinations/europe/ireland/dublin/destinations-dublin-banner-mobile-1024x553.jpg" alt="" className="cover" />
                <img src="https://i.kym-cdn.com/entries/icons/mobile/000/027/100/_103330503_musk3.jpg" alt="" className="profilePic" />
            </div>
            <div className="profileContainer">
                <div className="uInfo">
                    <div className="left">
                        {/* some icons */}
                    </div>
                    <div className="center">
                        <span>Elon Musk</span>
                        <div className="info">
                            <div className="item">
                                <PlaceIcon/>
                                <span>Ireland</span>
                            </div>
                            <div className="item">
                                <TranslateIcon/>
                                <span>English</span>
                            </div>
                        </div>
                        <button>follow</button>
                    </div>
                    <div className="right">
                        {/* Email icon? */}
                        <MoreHorizIcon/>
                    </div>
                </div>
                <Posts/>
            </div>
        </div>
    )
}

export default Profile;
