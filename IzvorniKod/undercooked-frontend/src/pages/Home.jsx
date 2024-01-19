import { RecipeMini } from "../components/RecipeMini";
import { Footer } from "./wrapper/Footer";
import classes from "../styles/home/home.module.css";
import { useEffect, useMemo, useState } from "react";
import FeedService from "../services/FeedService";

export function Home() {
  const feedService = useMemo(() => new FeedService(), []);
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    feedService.getRecipes().then(
      (data) => {
        setRecipes(
          data.map((e) => {
            return (
              <li key={e.id}>
                <RecipeMini details={e} />
              </li>
            );
          })
        );
      },
      () => { }
    );
  }, [feedService]);
  return (
    <div className={classes.wrapper}>
      {recipes.length > 0 ?
        <div>
          {recipes}
        </div>
        :
        <div className={classes.postedRecipes}>Follow people to see their posts</div>
      }
      <Footer sticky={0} />
    </div>
  );
}
