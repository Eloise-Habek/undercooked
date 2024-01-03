import { NavLink } from "react-router-dom";
import "../../styles/footer/footer.css";

export function Footer({ sticky }) {
  return (
    <footer className={"footer " + (sticky ? "footer-sticky" : "footer-fixed")}>
      <NavLink to="/editRecipe">
        <div class="post_recipe_button">Post a recipe</div>
      </NavLink>
    </footer>
  );
}
