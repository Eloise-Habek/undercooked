import { useEffect, useState } from "react"
import classes from "../../styles/recipe/recipe.module.css"
import { NavLink, redirect, useParams } from "react-router-dom";
//import { Footer } from "./wrapper/Footer";
import { Form } from 'react-router-dom'

function getOption(index, setInputs, inputs) {
    return <div>
        <input required placeholder='ingredient' type="text" name={"ingredient " + index.toString()} id={"ingredient " + index.toString()} />
        <input placeholder='amount' type="number" name={"ingredient " + index.toString() + " amount"} id={"ingredient " + index.toString() + " amount"} />
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
        {inputs !== null ? <button onClick={() => {
            setInputs(inputs);
        }} type='button'>X</button> : null}

    </div>
}

export function PostRecipePage() {
    const [author, setAuthor] = useState("");
    let { id } = useParams();
    const [image, setImage] = useState(null);
    let [inputs, setInputs] = useState([getOption(0, null, null)]);

    useEffect(() => {
        let hour_input = document.getElementById("hour_input");

        hour_input.setAttribute('value', 0);

    }, [id, setInputs, setAuthor])
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

                        <input className={classes.title} required id='title' type="text" name="title" placeholder="Title" />
                    </div>
                    <div className={classes.edit_button_wrapper}>
                        <NavLink className={classes.edit_button} to={"/.."}>
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
                        console.log(e.target.files);
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
                        <ul>{inputs}</ul>
                        <button type='button' onClick={() => {
                            let inputs2 = [...inputs];
                            inputs2.push(
                                getOption(inputs.length, setInputs, inputs)
                            );
                            setInputs(inputs2);
                        }}>Add ingredient</button>
                    </div>
                </div>
                <div className={classes.description}>
                    <h1>Preparation:</h1>
                    <textarea id="prep_desc" name="prep_desc" rows="4" cols="50" placeholder='Preparation discription...'>

                    </textarea>
                </div>
                <button className={classes.save_recipe} type="submit" >{"Post recipe"}</button>

            </Form>
            {/* <Footer sticky={1} /> */}
        </>
    );

}