import classes from "./FriendCard.module.css";
import defaultProfileLogo from "../../assets/post/profile_default.svg";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ProfileContext } from "../../context/ProfileContext";
const FriendCard = ({ friend }) => {
  const {resetAllStates} = useContext(ProfileContext)
  const src = friend.logo ? friend.logo.asset.link : defaultProfileLogo;
  const userId = friend.userId;
  const navigate = useNavigate();
  const handleNavigateToProfile = () => {
    resetAllStates()
    navigate(`/profile/${userId}`);
  };
  
  return (
    <>
      <div className={classes.container}>
        <div>
          <div>
            <img
              src={src}
              alt={`${friend.firstName}   ${friend.lastName}`}
              onClick={handleNavigateToProfile}
            />
            <p
              className="pt-2 text-lg font-semibold"
              onClick={handleNavigateToProfile}
            >
              {friend.firstName} {friend.lastName}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default FriendCard;
