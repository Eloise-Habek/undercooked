import classes from "../styles/page-nav/page-nav.module.css";

export function PageNav() {
  return (
    <>
      <div className={classes.navigation}>
        <button>Previous page</button>
        <div>Page: 2</div>
        <button>Next page</button>
      </div>
    </>
  );
}
