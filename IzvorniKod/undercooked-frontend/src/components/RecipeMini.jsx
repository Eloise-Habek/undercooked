import { useNavigate } from "react-router-dom"
import classes from "../styles/recipe/recipe-mini.module.css"

export function RecipeMini() {
    let navigate = useNavigate();
    return (
        <>
            <div className={classes.wrapper}>
                <button onClick={() => { navigate("/recipe") }}>
                    <div className={classes.image_and_title}>
                        <div className={classes.profile_img}>
                            <img src={require('../pages/images/chef.png')} alt="" />
                        </div>
                        <div><h3>Naslov</h3></div>
                    </div>
                    <div className={classes.img}>SLIKA</div>
                    <div className={classes.description}>skraćeni opis</div>
                    <div>
                        <div>Categories:</div>
                        <div className={classes.categories}>
                            <div>category 1</div>
                            <div>category 2</div>
                            <div>category 3</div>
                        </div>
                    </div>
                </button>
            </div>
        </>
    )
}