import { useContext } from "react"
import { AuthContext } from "../../context/authContext"
import "./stories.scss"

const Stories = () => {

    const {currentUser} = useContext(AuthContext)

    // TEMPORARY
    const stories = [
        {
            id: 1,
            name: "Hello",
            img: "https://e00-elmundo.uecdn.es/assets/multimedia/imagenes/2022/06/04/16543614394340.jpg"
        }, 
        {
            id: 2,
            name: "Hi",
            img: "https://i.kym-cdn.com/entries/icons/mobile/000/018/012/this_is_fine.jpg"
        },
        {
            id: 3,
            name: "Hi",
            img: "https://e00-elmundo.uecdn.es/assets/multimedia/imagenes/2022/06/04/16543614394340.jpg"
        },
        {
            id: 3,
            name: "Hi",
            img: "https://e00-elmundo.uecdn.es/assets/multimedia/imagenes/2022/06/04/16543614394340.jpg"
        }

    ]
    return (
        <div className="stories">
            <div className="story">
                <img src={currentUser.img}></img>
                <span>{currentUser.name}</span>
                <button>+</button>
            </div>
            {stories.map(story => (
                <div className="story" key={story.id}>
                    <img src={story.img}></img>
                    <span>{story.name}</span>
                </div>
            ))}
        </div>
    )
}

export default Stories
