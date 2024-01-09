//import { PageNav } from "../components/PageNav";
import { RecipeMini } from "../../components/RecipeMini";
import { Footer } from "../wrapper/Footer";
import classes from "../../styles/home/home.module.css";
import { useEffect, useMemo, useState } from "react";
import RecipeService from "../../services/RecipeService";
import { useParams } from "react-router-dom";

export function SavedRecipes() {
    const [recipeArray, setRecipeArray] = useState([]);
    let { user } = useParams();
    const recipeService = useMemo(() => new RecipeService(), [])

    useEffect(() => {
        recipeService.getAllSaved(user).then(res => {
            setRecipeArray(res.map((e) => <RecipeMini details={e} />))
        }, () => { });
    }, [recipeService, user])
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
                {recipeArray.length > 0 ? recipeArray : "loading..."}
            </div>
            {/* <PageNav /> */}
            <Footer sticky={1} />
        </>
    );
}
