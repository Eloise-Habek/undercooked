// import "../../styles/header.css"
import { useEffect, useMemo, useState } from "react";
import { MessageMini } from "../components/MessageMini";
// import { PageNav } from "../components/PageNav";
import { SendMessageBox } from "../components/SendMessageBox";
// import { Footer } from "../pages/wrapper/Footer";
import classes from "../styles/inbox/inbox.module.css";
import secureLocalStorage from "react-secure-storage";
import MessageService from "../services/MessageService";

export function Inbox() {
  const [showReplyBox, setShowReplyBox] = useState(0);
  let [messageArray, setMessageArray] = useState([]);

  const arrayDataItems = messageArray.map((m) => (
    <MessageMini
      details={m}
      isReceiver={secureLocalStorage.getItem("username") === m.receiver}
    />
  ));

  const messageService = useMemo(() => new MessageService(), []);
  useEffect(() => {
    const interval = setInterval(() => {
      messageService.getMessages().then(
        (res) => setMessageArray(res),
        () => {}
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [messageService]);

  return (
    <>
      {" "}
      <div className={classes.inbox_wrapper}>
        {showReplyBox ? <SendMessageBox username={null} /> : null}
        <button
          className={classes.send_message_btn}
          onClick={() => {
            showReplyBox ? setShowReplyBox(0) : setShowReplyBox(1);
          }}
        >
          {showReplyBox ? "Close message box" : "Send message"}
        </button>
        <div className={classes.wrapper}>
          {arrayDataItems.length > 0
            ? arrayDataItems.reverse()
            : "Inbox empty!"}
        </div>

        {/* <PageNav /> */}
        {/* <Footer sticky={1} /> */}
      </div>
    </>
  );
}
