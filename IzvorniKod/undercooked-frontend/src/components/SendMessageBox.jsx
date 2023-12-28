import classes from "../styles/message/message-box.module.css"
import { Form } from 'react-router-dom'

export function SendMessageBox() {
    return <div className={classes.wrapper}>
        <Form method="post" action="/sendMessage">
            <div>
                <label htmlFor="" className='register_label'>To:</label>
                <input required type="text" name="username" />
            </div>
            <div>
                <textarea id="freeform" name="text" rows="4" cols="50">
                    Enter text here...
                </textarea>
            </div>
            <button type="submit">Send</button>
        </Form>
    </div>
}