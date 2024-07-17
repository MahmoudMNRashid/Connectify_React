import style from "./NavBar.module.css";
import logo from "../../assets/1.png";
import { GoHomeFill } from "react-icons/go";
import { CgProfile } from "react-icons/cg";
import { CiSearch } from "react-icons/ci";
import { GoSignOut } from "react-icons/go";
import { NavLink, useNavigate } from "react-router-dom";
import { getUserId } from "../../util/help";
const NavBar = () => {
  const navigate = useNavigate();
  const moveToSearch = () => {
    navigate("/search");
  };

  return (
    <header className={style.header}>
      <div className={style["container--logo-search"]}>
        <div className={style["container--img"]}>
          <img src={logo} />
        </div>
        <form className={style["container--search"]}>
          <input placeholder="Search..." onClick={moveToSearch} />
          <button disabled>
            <CiSearch />
          </button>
        </form>
      </div>

      <ul className={style.nav__lists}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? `${style["nav__lists--list"]} ${style["active--link"]}`
              : `${style["nav__lists--list"]}`
          }
        >
          <span>
            <GoHomeFill />
          </span>
          <span>Home</span>
        </NavLink>

        <NavLink
          to={`/profile/${getUserId()}`}
          className={({ isActive }) =>
            isActive
              ? `${style["nav__lists--list"]} ${style["active--link"]}`
              : `${style["nav__lists--list"]}`
          }
        >
          <span>
            <CgProfile />
          </span>
          <span>Profile</span>
        </NavLink>

        <NavLink
          to="/logout"
          className={({ isActive }) =>
            isActive
              ? `${style["nav__lists--list"]} ${style["active--link"]}`
              : `${style["nav__lists--list"]}`
          }
        >
          <span>
            <GoSignOut />
          </span>
          <span>Logout</span>
        </NavLink>
      </ul>
    </header>
  );
};

export default NavBar;
