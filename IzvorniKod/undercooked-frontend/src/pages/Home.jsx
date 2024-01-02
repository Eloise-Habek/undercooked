import { PageNav } from "../components/PageNav";
import { RecipeMini } from "../components/RecipeMini";
import { Footer } from "./wrapper/Footer";
import classes from "../styles/home/home.module.css";

export function Home() {
  return (
    <>
      {/* <div className="main_div">
        <h1 className="naslov">Dobrodošli na CookBooked!</h1>

        <div className="search-container">
            <input type="text" className="search-input" placeholder="Pretraži recepte..."/>
            <button className="search-button">Pretraži</button>
        </div>
    </div> */}
      <div className={classes.wrapper}>
        <RecipeMini />
        <RecipeMini />
        <RecipeMini />
        <RecipeMini />
        <RecipeMini />
        <RecipeMini />
        <RecipeMini />
        <RecipeMini />
      </div>
      <PageNav />
      <Footer sticky={1} />
    </>
  );
}
