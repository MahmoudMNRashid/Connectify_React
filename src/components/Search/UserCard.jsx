import classes from "./UserCard.module.css";
import defaultLogoProfile from "../../assets/post/profile_default.svg";
import { FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const UserCard = ({ user }) => {
  const name = user.firstName + "    " + user.lastName;
  const logo = user.logo ? user.logo.asset.link : defaultLogoProfile;
  const userId = user._id;
  const areYouFriends = user.areYouFriends;

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/profile/${userId}`);
  };

  return (
    <div className={classes.container}>
      <div className={classes.img}>
        <img src={logo} onClick={handleNavigate} />
      </div>
      <div>
        <p className={classes.name} onClick={handleNavigate}>{name}</p>
        {areYouFriends && (
          <span className={classes.friends}>
            <FaCheck /> Friends
          </span>
        )}
      </div>
    </div>
  );
};

export default UserCard;
