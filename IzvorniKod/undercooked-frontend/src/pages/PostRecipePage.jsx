import { useState } from 'react'
import { Form } from 'react-router-dom'


export function PostRecipePage() {
    let [inputs, setInputs] = useState([<input required type="text" name="ingredient 0" />]);
    return <div className='register_wrap'>
        <Form method="post" action="/lol">
            <div>
                <label htmlFor="">Title:</label>
                <input required type="text" name="title" />
            </div>
            <div>
                <label htmlFor="">Image:</label>
                <input id="image" type="file" name="image" />
            </div>
            <div>
                <textarea id="freeform" name="description" rows="4" cols="50">
                    Discription...
                </textarea>
            </div>
            <div>
                <label htmlFor="">Preparation time:</label>
                <input required type="text" name="time" />
            </div>
            <div>
                <label htmlFor="">Ingredients:</label>
                <ul>{inputs}</ul>
                <button type='button' onClick={() => {
                    let inputs2 = [...inputs];
                    inputs2.push(
                        <div>
                            <input required type="text" name={"ingredient " + inputs.length.toString()} />
                            <button onClick={() => {
                                setInputs(inputs);
                            }} type='button'>X</button>
                        </div>
                    );
                    setInputs(inputs2);
                }}>Add ingredient</button>
            </div>
            <div>
                <textarea id="freeform" name="prep_desc" rows="4" cols="50">
                    Preparation discription...
                </textarea>
            </div>
            <button type="submit" >Submit</button>
        </Form>
    </div>
}