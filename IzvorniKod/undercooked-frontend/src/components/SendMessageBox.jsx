import { useEffect } from "react";
import classes from "../styles/message/message-box.module.css"
import { Form } from 'react-router-dom'

export function SendMessageBox({ username, setReply }) {

    useEffect(() => {
        let inputF = document.getElementById("input1");
        if (username !== null) {
            inputF.setAttribute('value', username);
        }
    })
    return (
        <div className={classes.message_box_wrapper}>
            <Form method="post" action="/message" onSubmit={() => {
                if (setReply !== undefined) {
                    setReply(0);
                }
            }}>
                <div className={classes.reply_column}>
                    {username === null ?
                        <label htmlFor="" className="register_label">
                            To:
                        </label>
                        : null
                    }

                    {username !== null ?
                        <input id="input1" required type="text" name="receiver" placeholder="username" readOnly hidden /> :
                        <input className={classes.username_input} required type="text" name="receiver" placeholder="username" />}
                </div>
                <div className={classes.reply_column}>
                    <textarea className={classes.text_fields} id="freeform" name="text" rows="4" cols="50" placeholder="Enter message here...">

                    </textarea>
                </div>
                <button className={classes.send_button} type="submit">
                    Send
                </button>
            </Form>
        </div>
    );
}