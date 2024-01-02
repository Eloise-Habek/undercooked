import { NavLink } from "react-router-dom";
import "../../styles/footer/footer.css";

export function Footer({ sticky }) {
  return (
    <footer className={"footer " + (sticky ? "footer-sticky" : "footer-fixed")}>
      <NavLink to="/editRecipe">
        <h2>Post a recipe</h2>
      </NavLink>
    </footer>
  );
}
