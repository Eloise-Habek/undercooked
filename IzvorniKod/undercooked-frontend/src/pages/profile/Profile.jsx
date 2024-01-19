import React, { useState, useEffect, useMemo } from "react";
import ProfileService from "../../services/ProfileService";
import secureLocalStorage from "react-secure-storage";
import { useNavigate, useParams } from "react-router-dom";
//import "../../styles/profile.css";

import { RecipeMini } from "../../components/RecipeMini";
import { SendMessageBox } from "../../components/SendMessageBox";
import classes from "../../styles/profile/profile.module.css";
import { Footer } from "../wrapper/Footer";
import { NavLink } from "react-router-dom";
import FollowService from "../../services/FollowService";
import RecipeService from "../../services/RecipeService";
import MessageService from "../../services/MessageService";

export function Profile() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const [followers, setFollowers] = useState("");
  const [following, setFollowing] = useState("");
  const [isFollowing, setIsFollowing] = useState("");
  const [savedCount, setSavedCount] = useState(0);
  const [isAvailable, setIsAvailable] = useState(false);

  let { user } = useParams();
  let [recipeArray, setRecipeArray] = useState([]);

  const arrayDataItems = recipeArray.map((r) => (
    <li key={r.id}>
      <RecipeMini details={r} isReceiver={true} />
    </li>
  ));

  const profileService = useMemo(() => new ProfileService(), []);
  const recipeService = useMemo(() => new RecipeService(), []);
  const followService = useMemo(() => new FollowService(), []);
  const messageService = useMemo(() => new MessageService(), []);

  useEffect(() => {
    if (secureLocalStorage.getItem("logInToken") != null) {
      profileService.getProfile(user).then(
        (data) => {
          setUsername(data.username);
          setRecipeArray(data.recipes);
          setFollowers(data.followers);
          setFollowing(data.following);
          setIsFollowing(data.isFollowed);
          setName(data.name)
          setSurname(data.surname)
          recipeService.getSavedCount(data.username).then(
            (res) => setSavedCount(res),
            () => { }
          );
        },
        () => {
          navigate("/login");
        }
      );
      profileService.getAvailable(user).then((data) => {
        setIsAvailable(data.available)
      }, () => { setIsAvailable(true) })
    } else {
      navigate("/login");
    }
  }, [navigate, user, recipeService, profileService]);

  const [showMessageBox, setShowMessageBox] = useState(0);

  return (
    <>
      <div className={classes.profileWrapper}>
        <div className={classes.profileSection}>
          <div className={classes.profileIntro}>
            <img
              src={require("../images/chef.png")}
              alt=""
              className={classes.profileImage}
            />
            {user === secureLocalStorage.getItem("username") ? (
              <NavLink
                to={"/settings"}
                className={`${classes.settingsLink} fa fa-cog`}
              ></NavLink>
            ) : null}

            <h3 className={classes.username}>{name + " " + surname}</h3>
            <h3 className={classes.username}>@{username}</h3>
          </div>
          {username === secureLocalStorage.getItem("username") ? null : (
            <div className={classes.profileActions}>
              <button
                className={classes.followButton}
                type="button"
                onClick={() => {
                  setIsFollowing(!isFollowing);
                  if (isFollowing) {
                    followService.unfollow(username).then(
                      () => { },
                      () => { }
                    );
                  } else {
                    followService.follow(username).then(
                      () => { },
                      () => { }
                    );
                  }
                }}
              >
                {isFollowing ? "Following" : "Follow"}
              </button>
              {isAvailable ?
                <>
                  <button
                    onClick={() => {
                      showMessageBox ? setShowMessageBox(0) : setShowMessageBox(1);
                    }}
                  >
                    {showMessageBox ? "Close message box" : "Message"}
                  </button>
                  <button
                    type="button"
                    className="fa-solid fa-video"
                    onClick={() => {
                      window.open(
                        "https://undercooked.daily.co/VideoRoom",
                        "_blank" // <- This is what makes it open in a new window.
                      );
                      let message = {
                        sender: secureLocalStorage.getItem("username"),
                        receiver: username,
                        text:
                          secureLocalStorage.getItem("username") +
                          " is calling you on video chat! Join link: https://undercooked.daily.co/VideoRoom",
                      };
                      messageService.sendMessage(message).then(
                        () => { },
                        () => { }
                      );
                    }}
                  ></button>
                </>
                :
                <button>Unavailable for communication</button>}

            </div>
          )}

          <div className={classes.profileStats}>
            <div className={classes.statItem}>
              <span className={classes.statValue}>
                <NavLink
                  className={classes.user_stats_numbers}
                  to={following > 0 ? "/following/" + username : ""}
                >
                  {following}
                </NavLink>
              </span>
              <span className={classes.statLabel}>Following</span>
            </div>
            <div className={classes.statItem}>
              <span className={classes.statValue}>
                <NavLink
                  className={classes.user_stats_numbers}
                  to={followers > 0 ? "/followers/" + username : ""}
                >
                  {followers}
                </NavLink>
              </span>
              <span className={classes.statLabel}>Followers</span>
            </div>
            <div className={classes.statItem}>
              <span className={classes.statValue}>
                <NavLink
                  className={classes.user_stats_numbers}
                  to={savedCount > 0 ? "/recipe/saved/" + username : ""}
                >
                  {savedCount}
                </NavLink>
              </span>
              <span className={classes.statLabel}>Recipes saved</span>
            </div>
          </div>
        </div>

        {showMessageBox ? <SendMessageBox username={user} /> : null}

        <div className={classes.recipeSection}>
          {arrayDataItems.length > 0 ? (
            <>
              <div className={classes.postedRecipes}>Posted recipes:</div>
              <div className={classes.recipeContainer}>
                <ul className={classes.no_bullets}>
                  {arrayDataItems.reverse()}
                </ul>
              </div>
            </>
          ) : (
            <div className={classes.postedRecipes}>
              User didn't post anything
            </div>
          )}
        </div>
      </div>
      {/* <PageNav /> */}
      <Footer sticky={1} />
    </>
  );
}
