import classes from "../styles/comment/comment.module.css"

export function Comment() {
    return (
        <div className={classes.wrapper}>
            <div className={classes.img}>
                <img
                    src={require('../pages/images/chef.png')} alt="profile_icon" />
            </div>

            <div>Username</div>
            <div>Tekst...</div>

        </div>
    );
}