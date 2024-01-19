//import { PageNav } from "../components/PageNav";
import { RecipeMini } from "../../components/RecipeMini";
import { Footer } from "../wrapper/Footer";
import classes from "../../styles/profile/userlist.module.css";
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

    return <div className={classes.wrapper}>
        <div className={classes.title}><h3>Saved recipes:</h3></div>
        <ul className={classes.no_bullets}>
            {recipeArray.length > 0 ? recipeArray : "loading..."}
        </ul>
        <Footer sticky={0} />
    </div>
}
