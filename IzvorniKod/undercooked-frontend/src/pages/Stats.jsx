import { useEffect, useMemo, useState } from "react";
import { RecipeMini } from "../components/RecipeMini";
import AdminService from "../services/AdminService";
import { NavLink } from "react-router-dom";

export function Stats() {
  const [bestRated, setBestRated] = useState(null);
  const [user, setUser] = useState("");
  const [popularRecipe, setPopularRecipe] = useState(null);

  const adminService = useMemo(() => new AdminService(), []);
  useEffect(() => {
    adminService.getBestRatedRecipe().then(
      (data) => {
        setBestRated(data);
      },
      () => {}
    );
    adminService.getMostActiveUser().then(
      (data) => {
        setUser(data);
      },
      () => {}
    );
    adminService.getMostSavedRecipe().then(
      (data) => {
        setPopularRecipe(data);
      },
      () => {}
    );
  });
  return (
    <div className="admin_stats_wrapper">
      <header>
        <div>
          <NavLink to={"/admin"}>Users</NavLink>
        </div>
        <div>
          <NavLink to={"/admin/stats"}>Stats</NavLink>
        </div>
      </header>
      <div>
        <h2>Best rated recipe: </h2>
        {bestRated !== null ? <RecipeMini details={bestRated} /> : null}
      </div>
      <div>
        <h2>Most active user: </h2>
        {user !== "" ? (
          <NavLink to={"/profile/" + user.username}> {user.username}</NavLink>
        ) : null}
      </div>
      <div>
        <h2>Most popular recipe: </h2>
        {popularRecipe !== null ? <RecipeMini details={popularRecipe} /> : null}
      </div>
    </div>
  );
}
