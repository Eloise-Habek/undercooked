// import "../../styles/header.css"
import { useState } from "react";
import { MessageMini } from "../components/MessageMini";
import { PageNav } from "../components/PageNav";
import { SendMessageBox } from "../components/SendMessageBox";
import { Footer } from "../pages/wrapper/Footer";
import classes from "../styles/inbox/inbox.module.css"

export function Inbox() {
    const [showReplyBox, setShowReplyBox] = useState(0);
    return (
        <>
            {showReplyBox ? <SendMessageBox /> : null}
            <button onClick={() => { showReplyBox ? setShowReplyBox(0) : setShowReplyBox(1) }}>
                {showReplyBox ? "Close message box" : "Send message"}
            </button>
            <div className={classes.wrapper}>
                <MessageMini show={showReplyBox} setShow={setShowReplyBox} />
                <MessageMini show={showReplyBox} setShow={setShowReplyBox} />
            </div>


            <PageNav />
            <Footer sticky={1} />
        </>
    );
}