import { useEffect, useMemo, useState } from "react"
import classes from "../../styles/recipe/recipe.module.css"
import { NavLink, redirect, useNavigate, useParams } from "react-router-dom";
//import { Footer } from "./wrapper/Footer";
import RecipeService from "../../services/RecipeService";
import { Form } from 'react-router-dom'
import CategoryService from "../../services/CategoryService";
import TagService from "../../services/TagService";
import CuisineService from "../../services/CuisineService";

function parseTime(time) {
    time = time.substring(2);
    let hours = null;
    if (time.includes("H")) {
        hours = time.split("H")[0];
    }
    let mins = null;
    if (time.includes("M") && time.includes("H")) {
        mins = time.substring(time.indexOf("H") + 1, time.indexOf("M"));
    }
    if (time.includes("M") && !time.includes("H")) {
        mins = time.substring(0, time.indexOf("M"));
    }
    return [(hours !== null ? hours : "0"), (mins !== null ? mins : "0")];
}

function Option({ id, set }) {
    var index = id;
    return <div>
        <input required placeholder='ingredient' type="text" name={"ingredient " + index.toString()} id={"ingredient " + index.toString()} />
        <input placeholder='amount' min={0} type="number" name={"ingredient " + index.toString() + " amount"} id={"ingredient " + index.toString() + " amount"} />
        <select name={"ingredient " + index.toString() + " unitOfMeasure"} id={"ingredient " + index.toString() + " unitOfMeasure"}>
            <option value=""></option>
            <option value="l">l</option>
            <option value="dL">dL</option>
            <option value="g">g</option>
            <option value="dag">dag</option>
            <option value="kg">kg</option>
            <option value="Tbsp">Tablespoon</option>
            <option value="Tsp">Teaspoon</option>
        </select>
        <button onClick={() => {
            var elements = document.getElementById("ing_options").childNodes;
            for (let i = id; i < elements.length - 1; i++) {
                let e = elements[i].childNodes;
                let nextE = elements[i + 1].childNodes;
                e[0].value = nextE[0].value;
                e[1].value = nextE[1].value;
                e[2].value = nextE[2].value;
            }
            let a = []
            let flag = false;
            for (let i = 0; i < elements.length; i++) {
                if (i !== id) {
                    if (!flag) {
                        a.push(<Option id={i} set={set} />)
                    } else {
                        a.push(<Option id={i - 1} set={set} />)
                    }
                } else {
                    flag = true;
                }
            }
            set([...a]);
        }} type='button'>X</button>
    </div>
}

function f(ref, setRef, i, len, data) {
    if (i < len) {
        ref.push(<Option id={i} set={setRef} />);
        i++;
        f(ref, setRef, i, len, data);
    }
}

function Tag({ tag_id, tagList, set }) {
    var id = tag_id;

    return <div>
        <select name={"tag " + id.toString()} id={"tag " + id.toString()}>
            {tagList}
        </select>
        <button type="button" onClick={() => {
            var elements = document.getElementById("tags").childNodes;
            for (let i = id; i < elements.length - 1; i++) {
                let e = elements[i].childNodes;
                let nextE = elements[i + 1].childNodes;
                e[0].value = nextE[0].value;
            }
            let a = []
            let flag = false;
            for (let i = 0; i < elements.length; i++) {
                if (i !== id) {
                    if (!flag) {
                        a.push(<Tag tag_id={i} set={set} tagList={tagList} />)
                    } else {
                        a.push(<Tag tag_id={i - 1} set={set} tagList={tagList} />)
                    }
                } else {
                    flag = true;
                }
            }
            set([...a]);
        }}>X</button>
    </div>
}

export function EditRecipePage({ setMessage }) {
    let navigate = useNavigate();
    const [author, setAuthor] = useState("");
    let { id } = useParams();
    const [image, setImage] = useState(null);
    let [inputs, setInputs] = useState([]);

    const recipeService = useMemo(() => new RecipeService(), []);

    const [catList, setCatList] = useState([]);
    const categoryService = useMemo(() => new CategoryService(), []);

    const [cuisineList, setCuisineList] = useState([]);
    const cuisineService = useMemo(() => new CuisineService(), []);

    const tagService = useMemo(() => new TagService(), []);
    const [tagList, setTagList] = useState([]);
    const [tagArray, setTagArray] = useState([]);

    useEffect(() => {
        var i = 1;
        categoryService.get().then((data) => {
            setCatList(data.map(e => {
                return <option key={i++} value={e}>{e}</option>
            }))
        }, () => { })

        i = 1;
        cuisineService.get().then((data) => {
            setCuisineList(data.map(e => {
                return <option key={i++} value={e}>{e}</option>
            }))
        }, () => { })

        i = 1;
        tagService.get().then((data) => {
            setTagList(data.map(e => {
                return <option key={i++} value={e}>{e}</option>
            }))
            return data.map(e => {
                return <option key={i++} value={e}>{e}</option>
            })
        }, () => { }).then((res) => {
            return recipeService.getRecipe(id).then((data2) => {
                let tempTags = []
                for (var i = 0; i < data2.tags.length; i++) {
                    tempTags.push(<Tag tag_id={i} set={setTagArray} tagList={res} />)
                }
                setTagArray(tempTags)
                return data2.tags
            }, () => { })
        }).then((tag_res) => {
            let children = document.getElementById("tags").childNodes
            if (children[0] !== undefined) {
                for (var i = 0; i < tag_res.length; i++) {
                    children[i].firstChild.value = tag_res[i];
                }
            }


        })
        recipeService.getRecipe(id).then(res => {
            document.getElementById('title').value = res.name;
            document.getElementById('description').value = res.description;
            let [hours, mins] = parseTime(res.preparationTime);
            document.getElementById('hour_input').value = hours;
            document.getElementById('mins_input').value = mins;
            document.getElementById('prep_desc').value = res.preparationDescription;
            document.getElementById('category').value = res.category;
            document.getElementById('cuisine').value = res.cuisine;
            document.getElementById("youtube_id").value = res.youtubeEmbedId;
            let temp = []
            f(temp, setInputs, 0, res.ingredients.length, res.ingredients);



            setInputs(temp);
            setAuthor(res.author.username);
        }, () => { });
        recipeService.getRecipe(id).then(res => {
            for (var i = 0; i < res.ingredients.length; i++) {
                if (document.getElementById('ingredient ' + i.toString()) !== null) {
                    document.getElementById('ingredient ' + i.toString()).value = res.ingredients[i].ingredient.name;
                    document.getElementById('ingredient ' + i.toString() + " amount").value = res.ingredients[i].amount;
                    document.getElementById('ingredient ' + i.toString() + " unitOfMeasure").value = res.ingredients[i].unitOfMeasure;
                }

            }

        }, () => { });
        recipeService.getImage(id).then(data => URL.createObjectURL(data), data => null)
            .then(data => setImage(data))

        let hour_input = document.getElementById("hour_input");

        hour_input.setAttribute('value', 0);

    }, [id, setInputs, setAuthor, recipeService, categoryService, tagService, cuisineService])
    return (
        <>
            <Form className={classes.wrapper} method={"put"} action={"/recipe/edit/" + id}>
                <div className={classes.mini_wrapper}>
                    <div className={classes.name_and_image}>
                        <img src={require("../images/chef.png")} alt="" />

                        <h2>{author}</h2>


                    </div>
                    <div>
                        <input className={classes.title} required id='title' type="text" name="title" placeholder="Title" />
                    </div>

                    <div className={classes.edit_button_wrapper}>
                        <NavLink className={classes.edit_button} to={"/recipe/" + id}>
                            <i className="fa-solid fa-xmark"></i>
                        </NavLink>
                    </div>

                </div>
                <div className={classes.image_container}>
                    {image === null ?
                        <img
                            className={classes.images}
                            src={require("../../pages/images/6978255.png")}
                            alt=""
                        />
                        :
                        <img
                            className={classes.images}
                            src={image}
                            alt=""
                        />
                    }
                    <input id="recipe_image_input" type="file" name="image" onChange={(e) => {
                        setImage(URL.createObjectURL(e.target.files[0]));
                    }} />
                </div>

                <div className={classes.descriptions_wrapper}>
                    <div className={classes.mini_description}>
                        <textarea id="description" name="description" rows="4" cols="50" placeholder='Discription...'>

                        </textarea>
                    </div>
                    <div className={classes.prep_time}>
                        <h2>Preparation time:</h2>
                        <div>
                            <input id='hour_input' required type="number" name="time_h" placeholder='hours' />
                            h
                            <input required id='mins_input' type="number" name="time_min" placeholder='minutes' />
                            min
                        </div>
                    </div>
                    <div className={classes.ingredients}>
                        <h2>Ingredients:</h2>
                        <ul id="ing_options">{inputs}</ul>
                        <button type='button' onClick={() => {
                            let inputs2 = [...inputs];
                            inputs2.push(
                                <Option id={inputs.length} set={setInputs} />
                            );
                            setInputs(inputs2);
                        }}>Add ingredient</button>
                    </div>
                </div>
                <div className={classes.description}>
                    <h1>Preparation:</h1>
                    <textarea id="prep_desc" name="prep_desc" rows="4" cols="50" placeholder='Preparation discription...'>

                    </textarea>
                    <h1>Video:</h1>
                    <input name="youtube_id" id="youtube_id" placeholder="Paste youtube video id"></input>
                </div>
                <div className={classes.ingredients}>
                    <h2>Category:</h2>
                    <select id="category" name="category">
                        {catList}
                    </select>
                    <h2>Type of cuisine:</h2>
                    <select id="cuisine" name="cuisine">
                        {cuisineList}
                    </select>
                    <h2>Tags:</h2>
                    <ul id="tags">
                        {tagArray}
                    </ul>
                    <button type='button' onClick={() => {
                        setTagArray(tagArray.concat([<Tag tag_id={tagArray.length} set={setTagArray} tagList={tagList} />]))
                    }}>Add tag</button>
                </div>
                <button className={classes.save_recipe} type="submit" >{"Save changes"}</button>
                <button className={classes.save_recipe} type="button" onClick={() => {
                    recipeService.deleteRecipe(id).then(() => { setMessage("Deleted!") }, () => { setMessage("Not deleted!") })
                        .then(() => { navigate("/profile/" + author) });
                }} >Delete recipe</button>
                <input type="text" hidden={true} readOnly value={id} name='recipe_id' />

            </Form>
            {/* <Footer sticky={1} /> */}
        </>
    );

}