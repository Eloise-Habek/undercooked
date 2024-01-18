import "../../styles/home.css";

export function Message({ message, hide, setHideMessage }) {
  return (
    <div className="message-box-wrapper">
      <div className={"message-box " + (hide ? "message-box-hide" : null)}>
        {message}
        <button
          className="message-box-button"
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
