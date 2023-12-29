import { useState } from "react";
import classes from "../styles/message/message-mini.module.css"
import { SendMessageBox } from "./SendMessageBox";
import MessageService from "../services/MessageService";

export function MessageMini({ details, isReceiver }) {
    const [expand, setExpand] = useState(0);
    const [reply, setReply] = useState(0);
    const messageService = new MessageService();
    if (!expand) {
        return (
            <div className={classes.wrapper}>
                <div className={classes.message_wrapper}>
                    <div className={classes.img}>
                        <img
                            src={require('../pages/images/chef.png')} alt="profile_icon" />
                    </div>
                    <div>{"From: " + details.sender + " To: " + details.receiver}</div>
                    <div>{details.text.length > 5 ? details.text.substring(0, 5) + "..." : details.text}</div>
                </div>
                <div>
                    {!isReceiver && details.read ? "read" : null}
                </div>
                <button onClick={() => {
                    setExpand(1);
                    if (isReceiver) {
                        messageService.setRead(details.id);
                    }
                }}>Expand</button>
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
                <div>{details.sender}</div>

            </div>
            <div>{details.time.split('T')[0].split('-').reverse().join('.') + ", " +
                details.time.split('T')[1].split(':')[0] + ":" +
                details.time.split('T')[1].split(':')[1]
            }</div>
            <div>{details.text}</div>
            <div>
                {!isReceiver && details.read ? "read" : null}
            </div>
            {isReceiver ? <div><button onClick={() => {
                if (reply) {
                    setReply(0);
                } else {
                    setReply(1);
                }
            }}>Reply</button></div> : null}

            {reply ? <SendMessageBox username={details.sender} /> : null}
            <button onClick={() => { setExpand(0) }}>Collapse</button>
        </div>

    );
}