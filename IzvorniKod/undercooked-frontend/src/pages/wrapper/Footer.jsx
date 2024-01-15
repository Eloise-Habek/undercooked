import { NavLink } from "react-router-dom"
import "../../styles/footer/footer.css"
import secureLocalStorage from "react-secure-storage"

export function Footer({ sticky }) {
    if (secureLocalStorage.getItem("logInToken") === null) {
        return null;
    }
    return <footer className={"footer " + (sticky ? "footer-sticky" : "footer-fixed")}>
        <NavLink to="/recipe/post">
            <div className="post_recipe_button">Post a recipe</div>

        </NavLink>
    </footer>
}