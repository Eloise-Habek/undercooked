// import SearchRecipesWithCategories from '../components/SearchRecipesWithCategories';
import classes from "../styles/search/search.module.css"
import { Footer } from "./wrapper/Footer";

export function Search() {
    return (
        <>
            {/* {<SearchRecipesWithCategories/>} */}

            <div className={classes.main_div}>
                <div className={classes.search_category_wrapper}>
                    <div className={classes.search_container}>
                        <input className={classes.search_input} type="text" placeholder="Search..." />
                        <button className={classes.search_button}>Search</button>
                    </div>

                    <div className={classes.category_select}>
                        <div>Search by category:</div>
                        <div className={classes.category_btns}>
                            <div><button>kategorija 1</button></div>
                            <div><button>kategorija 2</button></div>
                            <div><button>kategorija 3</button></div>
                            <div><button>kategorija 4</button></div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer sticky={0} />
        </>
    )
}