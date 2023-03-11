import "./navbar.scss"
import DarkModeIcon from '@mui/icons-material/DarkMode';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Link, useNavigate } from "react-router-dom"
import { useContext, useEffect, useState } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";
import jwtDecode from "jwt-decode";
import axios from "axios"
import { useQuery } from "@tanstack/react-query"

const Navbar = () => {
    
    const { toggle, darkMode } = useContext(DarkModeContext);
    const { token } = useContext(AuthContext);
    const [search, setSearch] = useState('')

    const navigate = useNavigate()

    
    function getUuid() {
        const decodedToken = jwtDecode(token)
        return decodedToken.uuid
    }
    
    function getProfilePage() {
        return "/profile/" + getUuid()
    }

    function handleClick() {
        navigate(getProfilePage());
        window.location.reload()
    }
    
    const {isLoading, error, data} = useQuery(['name'], () => 
        axios.get("http://192.168.0.161:8000/api/users/user-profile?uuid=" + getUuid()).then(res => {
            return res.data.data.name
        })
    )

    const handleSearch = () => {
        const splittedSearch = search.split(" ")
        axios.get("http://192.168.0.161:8000/api/users/find-user?first_name=" + splittedSearch[0] + "&last_name=" + splittedSearch[1]).then(res => {
            const user = res.data.data.uuid
            navigate("/profile/" + user)
        }).catch(_ => {
            navigate("/user-not-found")
        })
    }

    return (
        <div className="navbar">
            <div className="left">
                <Link to="/" style={{textDecoration:"none"}}>
                    <span>hive</span>
                </Link>
                {/* <HomeOutlinedIcon /> */}
                {darkMode ? <WbSunnyIcon onClick={toggle}/> : <DarkModeIcon onClick={toggle}/>}
                <GridViewOutlinedIcon />
                <div className="search">
                    <SearchOutlinedIcon />
                    <input type="text" placeholder="Search users" value={search} onChange={(e) => setSearch(e.target.value)}/>
                </div>
                <button onClick={handleSearch}>Share</button>
            </div>
            <div className="right">
                <PersonOutlineOutlinedIcon />
                <EmailOutlinedIcon />
                <NotificationsNoneOutlinedIcon />
                <div className="user">
                    <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="" />
                    {/* <Link to={getProfilePage()} style={{textDecoration:"none"}}>
                    {error ? <span>Something went wrong</span> : isLoading ? " " : <span>{data}</span>}
                    </Link> */}
                    {error ? <span>Something went wrong</span> : isLoading ? " " : <button onClick={handleClick} style={{all: "unset", cursor: "pointer"}}>{data}</button>}
                </div>
            </div>
        </div>
    )
}

export default Navbar
