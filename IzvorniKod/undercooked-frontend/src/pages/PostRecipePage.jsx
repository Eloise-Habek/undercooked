import { useEffect, useState } from 'react'
import { Form } from 'react-router-dom'


export function PostRecipePage() {
    let [inputs, setInputs] = useState([
        <>
            <input required placeholder='ingredient' type="text" name="ingredient 0" />
            <input placeholder='amount' type="number" name={"ingredient 0 amount"} />
            <select name={"ingredient 0 unitOfMeasure"}>
                <option value="g">g</option>
                <option value="dag">dag</option>
                <option value="kg">kg</option>
                <option value="Tbsp">Tablespoon</option>
                <option value="Tsp">Teaspoon</option>
            </select>
        </>

    ]);
    useEffect(() => {
        let hour_input = document.getElementById("hour_input");

        hour_input.setAttribute('value', 0);

    })
    return <div>
        <Form method="post" action="/postRecipe">
            <div>
                <label htmlFor="">Title:</label>
                <input required type="text" name="title" />
            </div>
            <div>
                <label htmlFor="">Image:</label>
                <input id="image" type="file" name="image" />
            </div>
            <div>
                <textarea id="freeform" name="description" rows="4" cols="50" placeholder='Discription...'>

                </textarea>
            </div>
            <div>
                <label htmlFor="">Preparation time:</label>
                <div>
                    <input id='hour_input' required type="number" name="time_h" placeholder='hours' />
                    h
                    <input required type="number" name="time_min" placeholder='minutes' />
                    min
                </div>

            </div>
            <div>
                <label htmlFor="">Ingredients:</label>
                <ul>{inputs}</ul>
                <button type='button' onClick={() => {
                    let inputs2 = [...inputs];
                    inputs2.push(
                        <div>
                            <input placeholder='ingredient' required type="text" name={"ingredient " + inputs.length.toString()} />
                            <input placeholder='amount' type="number" name={"ingredient " + inputs.length.toString() + " amount"} />
                            <select name={"ingredient " + inputs.length.toString() + " unitOfMeasure"}>
                                <option value="g">g</option>
                                <option value="dag">dag</option>
                                <option value="kg">kg</option>
                                <option value="Tbsp">Tablespoon</option>
                                <option value="Tsp">Teaspoon</option>
                            </select>
                            <button onClick={() => {
                                setInputs(inputs);
                            }} type='button'>X</button>
                        </div>
                    );
                    setInputs(inputs2);
                }}>Add ingredient</button>
            </div>
            <div>
                <textarea id="freeform" name="prep_desc" rows="4" cols="50" placeholder='Preparation discription...'>

                </textarea>
            </div>
            <button type="submit" >Submit</button>
        </Form>
    </div>
}