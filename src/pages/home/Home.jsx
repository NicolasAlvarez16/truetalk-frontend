import Posts from "../../components/posts/Posts";
import Share from "../../components/share/Share";
import Stories from "../../components/stories/Stories";
import "./home.scss"
import jwtDecode from "jwt-decode";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react"

const Home = () => {

    const { token } = useContext(AuthContext);

    const getUuid = () => {
        const decodedToken = jwtDecode(token)
        return decodedToken.uuid
    }

    return (
        <div className="home">
            {/* <Stories/> */}
            <Share/>
            <Posts uuid={getUuid()}/>
        </div>
    )
}

export default Home;
