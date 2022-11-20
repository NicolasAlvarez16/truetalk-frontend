import "./navbar.scss"
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import NightsStayOutlinedIcon from '@mui/icons-material/NightsStayOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <div className="navbar">
        <div className="left">
            <Link to="/" style={{textDecoration:"none"}}>
                <span>hive</span>
            </Link>
            <HomeOutlinedIcon />
            <NightsStayOutlinedIcon />
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
                <span>Nicolas Alvarez</span>
            </div>
        </div>
    </div>
  )
}

export default Navbar
