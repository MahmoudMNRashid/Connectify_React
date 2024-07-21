import classes from "./PageCard.module.css";
import defaultLogoPage from "../../assets/post/page_default.svg";

import { useNavigate } from "react-router-dom";
const PageCard = ({ page }) => {
  const name = page.name;
  const logo = page.logo ? page.logo.link : defaultLogoPage;
  const pageId = page._id;
  const bio = page.bio;
  const areYouOwner = page.areYouOwner;
  const areYouFollowers = page.areYouFollowers;

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/page/${pageId}`);
  };

  return (
    <div className={classes.container}>
      <div className={classes.img}>
        <img src={logo} onClick={handleNavigate} />
      </div>
      <div>
        <p className={classes.name} onClick={handleNavigate}>
          {name}
        </p>
        {bio && <p className={classes.description}>{bio} </p>}
      </div>
      {areYouFollowers && <span className={classes.role}>followers</span>}
      {areYouOwner && <span className={classes.owner}>owner</span>}
    </div>
  );
};

export default PageCard;
