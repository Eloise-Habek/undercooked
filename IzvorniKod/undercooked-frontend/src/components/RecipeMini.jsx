import { useNavigate } from "react-router-dom";
import classes from "../styles/recipe/recipe-mini.module.css";

export function RecipeMini() {
  let navigate = useNavigate();
  return (
    <>
      <div className={classes.wrapper}>
        <button
          className={classes.button_recipe}
          onClick={() => {
            navigate("/recipe");
          }}
        >
          <div className={classes.image_and_title}>
            <div className={classes.profile_img}>
              <img src={require("../pages/images/chef.png")} alt="" />
            </div>
            <div>
              <h3>Naslov naslov Naslov</h3>
            </div>
          </div>
          <div className={classes.image_and_desc_wrapper}>
            <div className={classes.food_image}>
              <img src={require("../pages/images/6978255.png")} alt="" />
            </div>
            <div className={classes.description}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </div>
          </div>
          <div>
            <div className={classes.categories}>
              <div class={classes.categories_label}>Categories:</div>
              <div class={classes.category_tag}>Cake</div>
              <div class={classes.category_tag}>Pizza</div>
              <div class={classes.category_tag}>Drinks</div>
            </div>
          </div>
        </button>
      </div>
    </>
  );
}
