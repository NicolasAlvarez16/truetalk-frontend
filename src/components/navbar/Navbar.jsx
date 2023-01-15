import "./navbar.scss"
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import NightsStayOutlinedIcon from '@mui/icons-material/NightsStayOutlined';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Link } from "react-router-dom"
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";

const Navbar = () => {
    
    const { toggle, darkMode } = useContext(DarkModeContext);
    const { currentUser } = useContext(AuthContext);
    return (
        <div className="navbar">
            <div className="left">
                <Link to="/" style={{textDecoration:"none"}}>
                    <span>hive</span>
                </Link>
                <HomeOutlinedIcon />
                {darkMode ? <WbSunnyIcon onClick={toggle}/> : <NightsStayOutlinedIcon onClick={toggle}/>}
                <GridViewOutlinedIcon />
                <div className="search">
                    <SearchOutlinedIcon />
                    <input type="text" placeholder="Search..." />
                </div>
            </div>
            <div className="right">
                <PersonOutlineOutlinedIcon />
                <EmailOutlinedIcon />
                <NotificationsNoneOutlinedIcon />
                <div className="user">
                    <img src="https://i.kym-cdn.com/entries/icons/mobile/000/018/012/this_is_fine.jpg" alt="" />
                    <span>{currentUser.name}</span>
                </div>
            </div>
        </div>
    )
}

export default Navbar
