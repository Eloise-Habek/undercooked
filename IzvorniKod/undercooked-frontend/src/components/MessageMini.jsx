import { useState } from "react";
import classes from "../styles/message/message-mini.module.css";
import { SendMessageBox } from "./SendMessageBox";

export function MessageMini() {
  const [expand, setExpand] = useState(0);
  const [reply, setReply] = useState(0);
  if (!expand) {
    return (
      <div className={classes.wrapper}>
        <div className={classes.message_wrapper}>
          <div className={classes.img_and_username}>
            <img src={require("../pages/images/chef.png")} alt="profile_icon" />
            <div>Username</div>
          </div>
          <div className={classes.message_text}>Tekst poruke...</div>
          <button
            className={classes.expand_btn}
            onClick={() => {
              setExpand(1);
            }}
          >
            Expand
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className={classes.wrapper}>
      <div className={classes.message_wrapper}>
        <div className={classes.img_and_username}>
          <img src={require("../pages/images/chef.png")} alt="profile_icon" />
          <div>Username</div>
        </div>
      </div>
      <div className={classes.message_text}>
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem
        accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
        illo inventore veritatis et quasi architecto beatae vitae dicta sunt
        explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
        odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
        voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum
        quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam
        eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat
        volupta
      </div>
      <div className={classes.btns_wrapper}>
        <button
          className={classes.reply_btn}
          onClick={() => {
            if (reply) {
              setReply(0);
            } else {
              setReply(1);
            }
          }}
        >
          Reply
        </button>
      </div>

      {reply ? <SendMessageBox /> : null}

      <button
        className={classes.collapse_btn}
        onClick={() => {
          setExpand(0);
        }}
      >
        Collapse
      </button>
    </div>
  );
}
