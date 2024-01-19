import { useEffect, useMemo, useState } from "react";
import { RecipeMini } from "../components/RecipeMini";
import AdminService from "../services/AdminService";
import { NavLink } from "react-router-dom";
import "../styles/adminpage.css";
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
      () => { }
    );
    adminService.getMostActiveUser().then(
      (data) => {
        setUser(data);
      },
      () => { }
    );
    adminService.getMostSavedRecipe().then(
      (data) => {
        setPopularRecipe(data);
      },
      () => { }
    );
  });
  return (
    <div className="admin_stats_wrapper">
      <header className="admin_header">
        <div>
          <NavLink className="users_stats_btn" to={"/admin"}>
            Users
          </NavLink>
        </div>
        <div>
          <NavLink className="users_stats_btn" to={"/admin/stats"}>
            Stats
          </NavLink>
        </div>
      </header>
      <div>
        <h3>Best rated recipe: </h3>
        {bestRated !== null ? <RecipeMini details={bestRated} /> : null}
      </div>
      <div>
        <h3>Most active user: </h3>
        {user !== "" ? (
          <NavLink to={"/profile/" + user.username}> {user.username}</NavLink>
        ) : null}
      </div>
      <div>
        <h3>Most popular recipe: </h3>
        {popularRecipe !== null ? <RecipeMini details={popularRecipe} /> : null}
      </div>
    </div>
  );
}
