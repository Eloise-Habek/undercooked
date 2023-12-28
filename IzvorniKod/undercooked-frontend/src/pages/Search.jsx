// import SearchRecipesWithCategories from '../components/SearchRecipesWithCategories';
import classes from "../styles/search/search.module.css"
import { Footer } from "./wrapper/Footer";

export function Search() {
    return (
        <>
            {/* {<SearchRecipesWithCategories/>} */}
            <div className={classes.search_box}><input type="text" placeholder="Search..." /></div>
            <div className={classes.category_select}>
                <div>Search by category:</div>
                <div className={classes.category_btns}>
                    <div><button>kategorija 1</button></div>
                    <div><button>kategorija 2</button></div>
                    <div><button>kategorija 3</button></div>
                    <div><button>kategorija 4</button></div>
                </div>
            </div>

            <Footer sticky={0} />
        </>
    )
}