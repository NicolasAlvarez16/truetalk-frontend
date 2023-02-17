import "./leftBar.scss"
import ForumIcon from '@mui/icons-material/Forum';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import EventIcon from '@mui/icons-material/Event';
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import FeedIcon from '@mui/icons-material/Feed';
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

const LeftBar = () => {

  const { currentUser } = useContext(AuthContext)

  return (
    <div className='leftBar'>
      <div className="container">
        <div className="menu">
          <div className="user">
            <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="" />
            <span>{currentUser.name}</span>
          </div>
          <div className="item">
            <div className="icon">
              <PeopleAltIcon/>
            </div>
            <span>Friends</span>
          </div>
          <div className="item">
            <div className="icon">
              <EventIcon/>
            </div>
            <span>Memories</span>
          </div>
        </div>
        <hr/>
        <div className="menu">
          <span>Your shortcuts</span>
          <div className="item">
            <div className="icon">
              <ForumIcon/>
            </div>
            <span>Messages</span>
          </div>
          <div className="item">
            <div className="icon">
              <AutoAwesomeMosaicIcon/>
            </div>
            <span>Gallery</span>
          </div>
        </div>
        <hr/>
        <div className="menu">
          <span>Your shortcuts</span>
          <div className="item">
            <div className="icon">
              <FeedIcon/>
            </div>
            <span>News</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeftBar
