// import SearchRecipesWithCategories from '../components/SearchRecipesWithCategories';
import { Form, useNavigate, useSearchParams } from "react-router-dom";
import classes from "../../styles/search/search.module.css";
import { Footer } from "../wrapper/Footer";
import { useEffect, useMemo, useState } from "react";
import CategoryService from "../../services/CategoryService";
import SearchService from "../../services/SearchService";
import { RecipeMini } from "../../components/RecipeMini";

export function Search({ setMessage }) {
    let [searchParams] = useSearchParams();
    const categoryService = useMemo(() => new CategoryService(), []);
    const searchService = useMemo(() => new SearchService(), [])
    const [catList, setCatList] = useState([]);
    const [recipeArray, setRecipeArray] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        var i = 1;
        categoryService.get().then((data) => {
            let cat = [<option key={0} value={"All"}>{"All"}</option>]
            setCatList(cat.concat(data.map(e => {
                return <option key={i++} value={e}>{e}</option>
            })))
        }, () => { })
        if (searchParams.size > 0) {
            var params = searchParams.toString();
            if (params.startsWith("q=&")) {
                params = params.slice(3);
            }
            if (params.endsWith("&category=All")) {
                params = params.slice(0, params.lastIndexOf("&"));
            }
            searchService.getResults(params).then((data) => {
                var count = 0;
                setRecipeArray(data.map((e) => {
                    count++;
                    return <li key={e.id}><RecipeMini details={e} /></li>
                }));
                if (count === 0) {
                    setMessage("No results!")
                }
            }, () => { setMessage("search error") })
        }
    }, [searchParams, categoryService, searchService, setMessage])

    if (recipeArray.length > 0) {
        return <>
            <Form action="/search">
                <div>
                    <input className={classes.search_input} type="search" name="q" />
                    <button type="submit" className={classes.search_button}>Search</button>
                </div>
                <div>
                    <div>Search by category:</div>
                    <select multiple="" name="category">
                        {catList.length > 0 ? catList : ""}
                    </select>
                </div>


            </Form>
            <button onClick={() => {
                setRecipeArray([]);
                navigate("/search");
            }} type="button"> X </button>
            <ul>
                {recipeArray}
            </ul>
        </>
    }
    return (
        <>
            {/* {<SearchRecipesWithCategories/>} */}

            <Form action="/search" className={classes.main_div}>
                <div className={classes.search_category_wrapper}>
                    <div className={classes.search_container}>
                        <input
                            name="q"
                            className={classes.search_input}
                            type="search"
                            placeholder="Search..."
                        />
                        <button type="submit" className={classes.search_button}>Search</button>
                    </div>

                    <div className={classes.category_select}>
                        <div>Search by category:</div>
                        <select multiple="" name="category">
                            {catList.length > 0 ? catList : ""}
                        </select>

                        {/* <div className={classes.category_btns}>
                            <div>
                                <button>kategorija 1</button>
                            </div>
                            <div>
                                <button>kategorija 2</button>
                            </div>
                            <div>
                                <button>kategorija 3</button>
                            </div>
                            <div>
                                <button>kategorija 4</button>
                            </div>
                        </div> */}
                    </div>
                </div>
            </Form>

            <Footer sticky={0} />
        </>
    );
}
