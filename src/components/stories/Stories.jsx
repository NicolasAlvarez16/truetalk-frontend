import "./stories.scss"

const Stories = () => {
    // TEMPORARY
    const stories = [
        {
            id: 1,
            name: "Hello",
            img: "https://i.kym-cdn.com/entries/icons/facebook/000/030/710/dd0.jpg"
        }, 
        {
            id: 2,
            name: "Hi",
            img: "https://i.kym-cdn.com/entries/icons/facebook/000/030/710/dd0.jpg"
        }

    ]
    return (
        <div className="stories">
            {stories.map(story => (
                <div className="story">
                    <img src={story.img}></img>
                    <span>{story.name}</span>
                </div>
            ))}
        </div>
    )
}

export default Stories