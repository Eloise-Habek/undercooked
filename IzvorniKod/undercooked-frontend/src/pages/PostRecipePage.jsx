import { useState } from "react";
import { Form } from "react-router-dom";
import classes from "../styles/recipe/postrecipepage.module.css";

export function PostRecipePage() {
  let [inputs, setInputs] = useState([
    <input required type="text" name="ingredient 0" />,
  ]);
  return (
    <div className={classes.register_wrap}>
      <Form className={classes.form_wrapper} method="post" action="/lol">
        <div className={classes.columns}>
          <label htmlFor="">Title: </label>
          <input required type="text" name="title" />
        </div>
        <div className={classes.columns}>
          <label htmlFor="">Image: </label>
          <input id="image" type="file" name="image" />
        </div>
        <div className={classes.columns}>
          <textarea id="freeform" name="description" rows="4" cols="50">
            Discription...
          </textarea>
        </div>
        <div className={classes.columns}>
          <label htmlFor="">Preparation time: </label>
          <input required type="text" name="time" />
        </div>
        <div className={classes.columns}>
          <label htmlFor="">Ingredients: </label>
          <ul>{inputs}</ul>
          <button
            type="button"
            onClick={() => {
              let inputs2 = [...inputs];
              inputs2.push(
                <div>
                  <input
                    required
                    type="text"
                    name={"ingredient " + inputs.length.toString()}
                  />
                  <button
                    onClick={() => {
                      setInputs(inputs);
                    }}
                    type="button"
                  >
                    X
                  </button>
                </div>
              );
              setInputs(inputs2);
            }}
          >
            Add ingredient
          </button>
        </div>
        <div className={classes.columns}>
          <textarea id="freeform" name="prep_desc" rows="4" cols="50">
            Preparation discription...
          </textarea>
        </div>
        <button type="submit">Submit</button>
      </Form>
    </div>
  );
}
