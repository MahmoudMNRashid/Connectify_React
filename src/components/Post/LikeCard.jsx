import { useNavigate } from "react-router-dom";
import classes from "./LikeCard.module.css";
import defaultLogoProfile from "../../assets/post/profile_default.svg";
import { useContext } from "react";
import { MainContext } from "../../context/MainContext";
const LikeCard = ({ like }) => {
  const { closeModal } = useContext(MainContext);
  const name = like.firstName + "    " + like.lastName;
  const logo = like.logo ? like.logo.asset.link : defaultLogoProfile;
  const userId = like.userId;
  const areYou = like.areYou;

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/profile/${userId}`);
    closeModal();
  };

  return (
    <div className={classes.container}>
      <div className={classes.img}>
        <img src={logo} onClick={handleNavigate} />
      </div>
     
        <p className={classes.name} onClick={handleNavigate}>
          {name}
        </p>
      

      {areYou && <p className={classes.you}>you</p>}
    </div>
  );
};

export default LikeCard;
