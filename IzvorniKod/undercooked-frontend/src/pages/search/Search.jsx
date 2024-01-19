// import SearchRecipesWithCategories from '../components/SearchRecipesWithCategories';
import { Form, useNavigate, useSearchParams } from "react-router-dom";
import classes from "../../styles/search/search.module.css";
import { Footer } from "../wrapper/Footer";
import { useEffect, useMemo, useState } from "react";
import CategoryService from "../../services/CategoryService";
import SearchService from "../../services/SearchService";
import { RecipeMini } from "../../components/RecipeMini";
import CuisineService from "../../services/CuisineService";

export function Search({ setMessage }) {
  let [searchParams] = useSearchParams();
  const categoryService = useMemo(() => new CategoryService(), []);
  const cuisineService = useMemo(() => new CuisineService(), []);
  const searchService = useMemo(() => new SearchService(), []);
  const [catList, setCatList] = useState([]);
  const [cuiList, setCuiList] = useState([]);
  const [recipeArray, setRecipeArray] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    var i = 1;
    categoryService.get().then(
      (data) => {
        let cat = [
          <option key={0} value={"All"}>
            {"All"}
          </option>,
        ];
        setCatList(
          cat.concat(
            data.map((e) => {
              return (
                <option key={i++} value={e}>
                  {e}
                </option>
              );
            })
          )
        );
      },
      () => { }
    );
    i = 1;
    cuisineService.get().then(
      (data) => {
        let cui = [
          <option key={0} value={"All"}>
            {"All"}
          </option>,
        ];
        setCuiList(
          cui.concat(
            data.map((e) => {
              return (
                <option key={i++} value={e}>
                  {e}
                </option>
              );
            })
          )
        );
      },
      () => { }
    );
    if (searchParams.size > 0) {
      var params = searchParams;
      if (params.get("q") === "") {
        params.delete("q");
      }
      if (params.get("category") === "All") {
        params.delete("category");
      }
      if (params.get("cuisine") === "All") {
        params.delete("cuisine");
      }
      params = params.toString();

      searchService.getResults(params).then(
        (data) => {
          var count = 0;
          setRecipeArray(
            data.map((e) => {
              count++;
              return (
                <li key={e.id}>
                  <RecipeMini details={e} />
                </li>
              );
            })
          );
          if (count === 0) {
            setMessage("No results!");
          }
        },
        () => {
          setMessage("search error");
        }
      );
    }
  }, [searchParams, categoryService, searchService, setMessage, cuisineService]);

  if (recipeArray.length > 0) {
    return (
      <>
        <div className={classes.ul_main_div}>
          <Form
            className={classes.search_category_wrapper_modified}
            action="/search"
          >
            <div className={classes.x_button_left}>
              <button
                onClick={() => {
                  setRecipeArray([]);
                  navigate("/search");
                }}
                type="button"
              >
                {" X "}
              </button>
            </div>

            <div>
              <div className={classes.search_container}>
                <input className={classes.search_input} type="search" name="q" placeholder="Search..." />
                <button type="submit" className={classes.search_button} >
                  Search
                </button>
              </div>
              <div className={classes.cat_cui_wrapper}>
                <div className={classes.category_select}>
                  <div>Search by category:</div>
                  <select multiple="" name="category">
                    {catList.length > 0 ? catList : ""}
                  </select>
                </div>
                <div className={classes.category_select}>
                  <div>Search by cuisine:</div>
                  <select multiple="" name="cuisine">
                    {cuiList.length > 0 ? cuiList : ""}
                  </select>
                </div>
              </div>

            </div>

            <div className={classes.x_button}>
              <button
                onClick={() => {
                  setRecipeArray([]);
                  navigate("/search");
                }}
                type="button"
              >
                {" X "}
              </button>
            </div>
          </Form>

          <ul className={classes.ul_array_of_recipe}>{recipeArray}</ul>
        </div>
      </>
    );
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
            <button type="submit" className={classes.search_button}>
              Search
            </button>
          </div>

          <div className={classes.cat_cui_wrapper}>
            <div className={classes.category_select}>
              <div>Search by category:</div>
              <select multiple="" name="category">
                {catList.length > 0 ? catList : ""}
              </select>
            </div>
            <div className={classes.category_select}>
              <div>Search by cuisine:</div>
              <select multiple="" name="cuisine">
                {cuiList.length > 0 ? cuiList : ""}
              </select>
            </div>
          </div>
        </div>
      </Form>

      <Footer sticky={0} />
    </>
  );
}
