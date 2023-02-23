import Posts from "../../components/posts/Posts";
import Share from "../../components/share/Share";
import Stories from "../../components/stories/Stories";
import "./home.scss"
import jwtDecode from "jwt-decode";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react"

const Home = () => {

    return (
        <div className="home">
            {/* <Stories/> */}
            <Share/>
            <Posts/>
        </div>
    )
}

export default Home;
