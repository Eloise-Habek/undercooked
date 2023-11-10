import "../styles/home.css"

export function Home() {
    return (
    <>
    <div className="main_div">
        <h1 className="naslov">Dobrodošli na CookBooked!</h1>

        <div className="search-container">
            <input type="text" className="search-input" placeholder="Pretraži recepte..."/>
            <button className="search-button">Pretraži</button>
        </div>
    </div>
    </>
    )
}