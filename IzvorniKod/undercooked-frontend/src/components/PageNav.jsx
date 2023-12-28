import classes from "../styles/page-nav/page-nav.module.css"

export function PageNav() {
    return <>
        <div className={classes.navigation}>
            <div><button>Previous page</button></div>
            <div>Page: 2</div>
            <div><button>Next page</button></div>
        </div>
    </>
}