import "./leftBar.scss"
import ForumIcon from '@mui/icons-material/Forum';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import EventIcon from '@mui/icons-material/Event';
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import FeedIcon from '@mui/icons-material/Feed';
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/authContext";
import jwtDecode from "jwt-decode";
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import Profile from "../../pages/profile/Profile";


const LeftBar = () => {

  const { token } = useContext(AuthContext) 

  const navigate = useNavigate()

  function getUuid() {
    const decdoeToken = jwtDecode(token)
    return decdoeToken.uuid
  }

  function getProfilePage() {
    return "/profile/" + getUuid()
  }

  function handleClick() {
    navigate(getProfilePage());
    window.location.reload()
  }

  const {isLoading, error, data} = useQuery(['name'], () => 
    axios.get("http://143.42.26.143:8000/api/users/user-profile?uuid=" + getUuid()).then(res => {
        return res.data.data.name
    })
  )

  return (
    <div className='leftBar'>
      <div className="container">
        <div className="menu">
          <div className="user">
            <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="" />
            {/* <Link to={getProfilePage()} style={{textDecoration:"none"}}>
              {error ? <span>Something went wrong</span> : isLoading ? " " : <span>{data}</span>}
            </Link> */}
            {error ? <span>Something went wrong</span> : isLoading ? " " : <button onClick={handleClick} style={{all: "unset", cursor: "pointer"}}>{data}</button>}

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
