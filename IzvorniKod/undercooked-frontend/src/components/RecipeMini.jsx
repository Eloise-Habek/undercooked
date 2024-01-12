import { useNavigate } from "react-router-dom"
import classes from "../styles/recipe/recipe-mini.module.css"
import { useEffect, useMemo, useState } from "react";
import RecipeService from "../services/RecipeService";

export function RecipeMini({ details }) {
    let navigate = useNavigate();
    const [image, setImage] = useState(null);
    const recipeService = useMemo(() => new RecipeService(), []);
    useEffect(() => {
        recipeService.getImage(details.id)
            .then(data => URL.createObjectURL(data), () => { })
            .then(data => setImage(data))
    }, [details.id, recipeService])
    return (
        <>
            <div className={classes.wrapper}>
                <button
                    className={classes.button_recipe}
                    onClick={() => {
                        navigate("/recipe/" + details.id);
                    }}
                >
                    <div className={classes.image_and_title}>
                        <div className={classes.profile_img}>
                            <img src={require("../pages/images/chef.png")} alt="" />
                        </div>
                        <div>
                            <h3>{details.name}</h3>
                        </div>
                    </div>
                    <div className={classes.image_and_desc_wrapper}>
                        {image === null ?
                            <div className={classes.food_image}>
                                <img src={require("../pages/images/6978255.png")} alt="" />
                            </div> :
                            <div className={classes.food_image}>
                                <img src={image} alt="" />
                            </div>}
                        <div className={classes.description}>
                            {details.description}
                        </div>
                    </div>
                    <div>
                        <div className={classes.categories}>
                            <div className={classes.categories_label}>Categories:</div>
                            <div className={classes.category_tag}>{details.category}</div>
                        </div>
                    </div>
                </button>
            </div>
        </>
    );
}