import { PageNav } from "../components/PageNav";
import { RecipeMini } from "../components/RecipeMini";
import { Footer } from "./wrapper/Footer";
import classes from "../styles/home/home.module.css";

export function Home() {
    const temp = {
        "id": 1,
        "name": "kruh",
        "preparationTime": "PT1H30M",
        "description": "neobičan bijeli kruh",
        "preparationDescription": "1. Pomješaj sastojke\n2. Stavi u pećnicu na 180°C i 90 minuta\n3. Uživaj!",
        "author": {
            "id": 3,
            "username": "matej",
            "name": "matej",
            "surname": "magat",
            "isAdmin": false
        },
        "ingredients": [
            {
                "amount": 250.0,
                "unitOfMeasure": "g",
                "ingredient": {
                    "id": 1,
                    "name": "glatkog brasna"
                }
            },
            {
                "amount": 2.0,
                "unitOfMeasure": null,
                "ingredient": {
                    "id": 2,
                    "name": "jAJa"
                }
            },
            {
                "amount": null,
                "unitOfMeasure": "žlica",
                "ingredient": {
                    "id": 3,
                    "name": "VOde"
                }
            }
        ]
    }
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
                <RecipeMini details={temp} />
                <RecipeMini details={temp} />
                <RecipeMini details={temp} />
                <RecipeMini details={temp} />
                <RecipeMini details={temp} />
                <RecipeMini details={temp} />
            </div>
            {/* <PageNav /> */}
            <Footer sticky={1} />
        </>
    );
}
