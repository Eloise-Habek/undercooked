import "../../styles/home.css"

export function Message({ message }) {
    if (message !== "") {
        return <div ><h4 className="search-button">Message: {message}</h4></div>
    }
    return null;
}