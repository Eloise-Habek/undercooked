import classes from "../styles/login/pleaseLogin.module.css";

export function PleaseLogin() {
  return (
    <div className={classes.wrapper}>
      <div className={classes.postedRecipes}>
        Please login to see this content
      </div>
    </div>
  );
}
