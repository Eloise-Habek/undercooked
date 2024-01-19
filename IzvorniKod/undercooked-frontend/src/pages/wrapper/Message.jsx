//import "../../styles/home.css";
import classes from "../../styles/header/alert.module.css"

export function Message({ message, hide, setHideMessage }) {
  return (
    <div className={classes.message_box_wrapper}>
      <div className={classes.message_box + " " + (hide ? classes.message_box_hide : null)}>
        {message}
        <button
          className={classes.message_box_button}
          onClick={() => {
            setHideMessage(1);
          }}
        >
          X
        </button>
      </div>
    </div>
  );
}
