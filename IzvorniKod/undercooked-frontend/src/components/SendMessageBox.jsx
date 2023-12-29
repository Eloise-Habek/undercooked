import { useEffect } from "react";
import classes from "../styles/message/message-box.module.css"
import { Form } from 'react-router-dom'

export function SendMessageBox({ username }) {

    useEffect(() => {
        let inputF = document.getElementById("input1");
        if (username !== null) {
            inputF.setAttribute('value', username);
        }
    })
    return <div className={classes.wrapper}>
        <Form method="post" action="/message">
            <div>
                <label htmlFor="" className='register_label'>To:</label>

                {username !== null ?
                    <input id="input1" required type="text" name="receiver" placeholder="username" readOnly /> :
                    <input required type="text" name="receiver" placeholder="username" />}
            </div>
            <div>
                <textarea id="freeform" name="text" rows="4" cols="50" placeholder="Enter text here...">

                </textarea>
            </div>
            <button type="submit">Send</button>
        </Form>
    </div>
}