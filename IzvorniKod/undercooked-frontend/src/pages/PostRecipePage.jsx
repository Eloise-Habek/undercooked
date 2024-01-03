import { useEffect, useState } from 'react'
import { Form, useParams } from 'react-router-dom'
import RecipeService from '../services/RecipeService';

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

function getOption(index, setInputs, inputs) {
    return <div>
        <input required placeholder='ingredient' type="text" name={"ingredient " + index.toString()} id={"ingredient " + index.toString()} />
        <input placeholder='amount' type="number" name={"ingredient " + index.toString() + " amount"} id={"ingredient " + index.toString() + " amount"} />
        <select name={"ingredient " + index.toString() + " unitOfMeasure"} id={"ingredient " + index.toString() + " unitOfMeasure"}>
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

function f(ref, setRef, i, len, data) {
    if (i < len) {
        i === 0 ? ref.push(getOption(i, null, null)) :
            ref.push(getOption(i, setRef, [...ref]));
        i++;
        f(ref, setRef, i, len, data);
    }
}


export function PostRecipePage() {
    let { id } = useParams();

    let [inputs, setInputs] = useState([getOption(0, null, null)]);
    useEffect(() => {
        if (id !== undefined) {
            let recipeService = new RecipeService();
            recipeService.getRecipe(id).then(res => res.json()).then(res => {
                document.getElementById('title').value = res.name;
                document.getElementById('description').value = res.description;
                let [hours, mins] = parseTime(res.preparationTime);
                document.getElementById('hour_input').value = hours;
                document.getElementById('mins_input').value = mins;
                document.getElementById('prep_desc').value = res.preparationDescription;

                let temp = []
                f(temp, setInputs, 0, res.ingredients.length, res.ingredients);
                setInputs(temp);
            });
            recipeService.getRecipe(id).then(res => res.json()).then(res => {
                for (var i = 0; i < res.ingredients.length; i++) {
                    document.getElementById('ingredient ' + i.toString()).value = res.ingredients[i].ingredient.name;
                    document.getElementById('ingredient ' + i.toString() + " amount").value = res.ingredients[i].amount;
                    document.getElementById('ingredient ' + i.toString() + " unitOfMeasure").value = res.ingredients[i].unitOfMeasure;
                }

            });
        }
        let hour_input = document.getElementById("hour_input");

        hour_input.setAttribute('value', 0);

    }, [id, setInputs])
    return <div>
        <Form method={id === undefined ? "post" : "put"} action={id === undefined ? "/recipe/post" : "/recipe/edit/" + id}>

            <div>
                <label htmlFor="">Title:</label>
                <input required id='title' type="text" name="title" />
            </div>
            <div>
                <label htmlFor="">Image:</label>
                <input id="image" type="file" name="image" />
            </div>
            <div>
                <textarea id="description" name="description" rows="4" cols="50" placeholder='Discription...'>

                </textarea>
            </div>
            <div>
                <label htmlFor="">Preparation time:</label>
                <div>
                    <input id='hour_input' required type="number" name="time_h" placeholder='hours' />
                    h
                    <input required id='mins_input' type="number" name="time_min" placeholder='minutes' />
                    min
                </div>

            </div>
            <div>
                <label htmlFor="">Ingredients:</label>
                <ul>{inputs}</ul>
                <button type='button' onClick={() => {
                    let inputs2 = [...inputs];
                    inputs2.push(
                        getOption(inputs.length, setInputs, inputs)
                    );
                    setInputs(inputs2);
                }}>Add ingredient</button>
            </div>
            <div>
                <textarea id="prep_desc" name="prep_desc" rows="4" cols="50" placeholder='Preparation discription...'>

                </textarea>
            </div>
            {id !== undefined ? <input type="text" hidden={true} value={id} name='recipe_id' /> : null}
            <button type="submit" >{id !== undefined ? "Post changes" : "Post recipe"}</button>
        </Form>
    </div>
}