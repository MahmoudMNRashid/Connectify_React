import { useContext } from "react";
import style from "./ProfilesTabs.module.css";
import { ProfileContext } from "../../context/ProfileContext";
const ProfileTabs = () => {
  const { selectedTap, selectTap } = useContext(ProfileContext);

  return (
    <ul className={style["profile-header-tab"]}>
      <li className="nav-item">
        <button
          onClick={() => {
            selectTap("Posts");
          }}
          className={`
          ${style["nav-button"]}
          ${selectedTap === "Posts" ? style.active : undefined}`}
        >
          POSTS
        </button>
      </li>
      <li className="nav-item">
        <button
          onClick={() => {
            selectTap("About");
          }}
          className={`${style["nav-button"]}
          ${selectedTap === "About" ? style.active : undefined}`}
        >
          ABOUT
        </button>
      </li>
      <li className="nav-item">
        <button
          onClick={() => {
            selectTap("Photos");
          }}
          className={`${style["nav-button"]}
          ${selectedTap === "Photos" ? style.active : undefined}`}
        >
          PHOTOS
        </button>
      </li>
      <li className="nav-item">
        <button
          onClick={() => {
            selectTap("Videos");
          }}
          className={`${style["nav-button"]}
          ${selectedTap === "Videos" ? style.active : undefined}`}
        >
          VIDEOS
        </button>
      </li>
      <li className="nav-item">
        <button
          onClick={() => {
            selectTap("Friends");
          }}
          className={`${style["nav-button"]} ${
            selectedTap === "Friends" ? style.active : undefined
          }`}
        >
          FRIENDS
        </button>
      </li>
    </ul>
  );
};

export default ProfileTabs;
