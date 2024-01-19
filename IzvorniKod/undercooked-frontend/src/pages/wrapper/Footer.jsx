import { useNavigate } from "react-router-dom";
import classes from "../../styles/footer/footer.module.css";
import secureLocalStorage from "react-secure-storage";

export function Footer({ sticky }) {
  let navigate = useNavigate();
  if (secureLocalStorage.getItem("logInToken") === null) {
    return null;
  }
  return (
    <footer className={classes.footer + " " + (sticky ? classes.footer_sticky : classes.footer_fixed)}>
      <button onClick={() => {
        navigate("/recipe/post")
      }} className={classes.post_recipe_button}>
        Post a recipe
      </button>
    </footer>
  );
}
