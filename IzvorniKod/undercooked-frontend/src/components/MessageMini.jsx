import { useState } from "react";
import classes from "../styles/message/message-mini.module.css"
import { SendMessageBox } from "./SendMessageBox";

export function MessageMini() {
    const [expand, setExpand] = useState(0);
    const [reply, setReply] = useState(0);
    if (!expand) {
        return (
            <div className={classes.wrapper}>
                <div className={classes.message_wrapper}>
                    <div className={classes.img}>
                        <img
                            src={require('../pages/images/chef.png')} alt="profile_icon" />
                    </div>
                    <div>Username</div>
                    <div>Tekst poruke...</div>
                </div>
                <button onClick={() => { setExpand(1) }}>Expand</button>
            </div>
        );
    }
    return (
        <div className={classes.wrapper}>
            <div className={classes.message_wrapper}>
                <div className={classes.img}>
                    <img
                        src={require('../pages/images/chef.png')} alt="profile_icon" />
                </div>
                <div>Username</div>

            </div>
            <div>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
                laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto
                beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
                aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro
                quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit,
                sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat volupta</div>
            <div><button onClick={() => {
                if (reply) {
                    setReply(0);
                } else {
                    setReply(1);
                }
            }}>Reply</button></div>

            {reply ? <SendMessageBox /> : null}
            <button onClick={() => { setExpand(0) }}>Collapse</button>
        </div>

    );
}