import { useEffect, useMemo, useState } from "react";
import classes from "../../styles/recipe/recipe.module.css";
import { NavLink, redirect, useParams } from "react-router-dom";
//import { Footer } from "./wrapper/Footer";
import { Form } from "react-router-dom";
import CategoryService from "../../services/CategoryService";
import TagService from "../../services/TagService";
import CuisineService from "../../services/CuisineService";

function Option({ id, set }) {
  var index = id;
  return (
    <div>
      <input
        required
        placeholder="ingredient"
        type="text"
        name={"ingredient " + index.toString()}
        id={"ingredient " + index.toString()}
      />
      <input
        placeholder="amount"
        type="number"
        name={"ingredient " + index.toString() + " amount"}
        id={"ingredient " + index.toString() + " amount"}
      />
      <select
        name={"ingredient " + index.toString() + " unitOfMeasure"}
        id={"ingredient " + index.toString() + " unitOfMeasure"}
      >
        <option value=""></option>
        <option value="l">l</option>
        <option value="dL">dL</option>
        <option value="g">g</option>
        <option value="dag">dag</option>
        <option value="kg">kg</option>
        <option value="Tbsp">Tablespoon</option>
        <option value="Tsp">Teaspoon</option>
      </select>
      <button
        onClick={() => {
          var elements = document.getElementById("ing_options").childNodes;
          for (let i = id; i < elements.length - 1; i++) {
            let e = elements[i].childNodes;
            let nextE = elements[i + 1].childNodes;
            e[0].value = nextE[0].value;
            e[1].value = nextE[1].value;
            e[2].value = nextE[2].value;
          }
          let a = [];
          let flag = false;
          for (let i = 0; i < elements.length; i++) {
            if (i !== id) {
              if (!flag) {
                a.push(<Option id={i} set={set} />);
              } else {
                a.push(<Option id={i - 1} set={set} />);
              }
            } else {
              flag = true;
            }
          }
          set([...a]);
        }}
        type="button"
      >
        X
      </button>
    </div>
  );
}

function Tag({ tag_id, tagList, set }) {
  var id = tag_id;

  return (
    <div>
      <select name={"tag " + id.toString()} id={"tag " + id.toString()}>
        {tagList}
      </select>
      <button
        type="button"
        onClick={() => {
          var elements = document.getElementById("tags").childNodes;
          for (let i = id; i < elements.length - 1; i++) {
            let e = elements[i].childNodes;
            let nextE = elements[i + 1].childNodes;
            e[0].value = nextE[0].value;
          }
          let a = [];
          let flag = false;
          for (let i = 0; i < elements.length; i++) {
            if (i !== id) {
              if (!flag) {
                a.push(<Tag tag_id={i} set={set} tagList={tagList} />);
              } else {
                a.push(<Tag tag_id={i - 1} set={set} tagList={tagList} />);
              }
            } else {
              flag = true;
            }
          }
          set([...a]);
        }}
      >
        X
      </button>
    </div>
  );
}

export function PostRecipePage() {
  const [author, setAuthor] = useState("");
  let { id } = useParams();
  const [image, setImage] = useState(null);

  const [catList, setCatList] = useState([]);
  const categoryService = useMemo(() => new CategoryService(), []);

  const [cuisineList, setCuisineList] = useState([]);
  const cuisineService = useMemo(() => new CuisineService(), []);

  const [tagList, setTagList] = useState([]);
  const tagService = useMemo(() => new TagService(), []);

  const [inputs, setInputs] = useState([]);

  const [tagArray, setTagArray] = useState([]);

  useEffect(() => {
    var i = 1;
    categoryService.get().then(
      (data) => {
        setCatList(
          data.map((e) => {
            return (
              <option key={i++} value={e}>
                {e}
              </option>
            );
          })
        );
      },
      () => {}
    );

    i = 1;
    cuisineService.get().then(
      (data) => {
        setCuisineList(
          data.map((e) => {
            return (
              <option key={i++} value={e}>
                {e}
              </option>
            );
          })
        );
      },
      () => {}
    );

    i = 1;
    tagService.get().then(
      (data) => {
        setTagList(
          data.map((e) => {
            return (
              <option key={i++} value={e}>
                {e}
              </option>
            );
          })
        );
      },
      () => {}
    );

    let hour_input = document.getElementById("hour_input");

    hour_input.setAttribute("value", 0);
  }, [id, setInputs, setAuthor, categoryService, tagService, cuisineService]);
  return (
    <>
      <Form className={classes.wrapper} method={"post"} action={"/recipe/post"}>
        <div className={classes.mini_wrapper}>
          <div className={classes.name_and_image}>
            <img src={require("../images/chef.png")} alt="" />

            <h2>{author}</h2>
          </div>
          <div>
            {/* <h2 className={classes.title}>{details.length > 0 ? details[0].name : "loading.."}</h2> */}

            <input
              className={classes.title}
              required
              id="title"
              type="text"
              name="title"
              placeholder="Title"
            />
          </div>
          <div className={classes.edit_button_wrapper}>
            <NavLink className={classes.edit_button} to={"/.."}>
              <i className="fa-solid fa-xmark"></i>
            </NavLink>
          </div>
        </div>
        <div className={classes.image_container}>
          {image === null ? (
            <img
              className={classes.images}
              src={require("../../pages/images/6978255.png")}
              alt=""
            />
          ) : (
            <img className={classes.images} src={image} alt="" />
          )}
          <input
            id="recipe_image_input"
            type="file"
            name="image"
            onChange={(e) => {
              console.log(e.target.files);
              setImage(URL.createObjectURL(e.target.files[0]));
            }}
          />
        </div>

        <div className={classes.descriptions_wrapper}>
          <div className={classes.mini_description}>
            <textarea
              id="description"
              name="description"
              rows="4"
              cols="50"
              placeholder="Discription..."
            ></textarea>
          </div>
          <div className={classes.prep_time}>
            <h2>Preparation time:</h2>
            <div className={classes.time_inputs}>
              <input
                className={classes.hours}
                id="hour_input"
                required
                type="number"
                name="time_h"
                placeholder="hours"
              />
              h
              <input
                className={classes.minutes}
                required
                id="mins_input"
                type="number"
                name="time_min"
                placeholder="minutes"
              />
              min
            </div>
          </div>
          <div className={classes.ingredients}>
            <h2>Ingredients:</h2>
            <ul id="ing_options">{inputs}</ul>
            <button
              type="button"
              onClick={() => {
                let inputs2 = [...inputs];
                inputs2.push(<Option id={inputs.length} set={setInputs} />);
                setInputs(inputs2);
              }}
            >
              Add ingredient
            </button>
          </div>
        </div>
        <div className={classes.description}>
          <h1>Preparation:</h1>
          <textarea
            className={classes.prep_text_area}
            id="prep_desc"
            name="prep_desc"
            rows="4"
            cols="50"
            placeholder="Preparation discription..."
          ></textarea>
          <h1>Video:</h1>
          <input
            className={classes.yt_link}
            name="youtube_id"
            placeholder="Paste youtube video id"
          ></input>
        </div>
        <div className={classes.ingredients}>
          <h2>Category:</h2>
          <select name="category">{catList}</select>
          <h2>Type of cuisine:</h2>
          <select name="cuisine">{cuisineList}</select>
          <h2>Tags:</h2>
          <ul id="tags">{tagArray}</ul>
          <button
            type="button"
            onClick={() => {
              setTagArray(
                tagArray.concat([
                  <Tag
                    tag_id={tagArray.length}
                    set={setTagArray}
                    tagList={tagList}
                  />,
                ])
              );
            }}
          >
            Add tag
          </button>
        </div>
        <button className={classes.save_recipe} type="submit">
          {"Post recipe"}
        </button>
      </Form>
      {/* <Footer sticky={1} /> */}
    </>
  );
}