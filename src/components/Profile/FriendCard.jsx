import classes from "./FriendCard.module.css";
import defaultProfileLogo from "../../assets/post/profile_default.svg";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ProfileContext } from "../../context/ProfileContext";
import useProfile from "../../hooks/UseProfile";
import { MainContext } from "../../context/MainContext";
const FriendCard = ({ friend, blocked }) => {
  const { unblockUser } = useProfile();
  const { resetAllStates } = useContext(ProfileContext);
  const { disableIsActive } = useContext(MainContext);
  const src = friend.logo ? friend.logo.asset.link : defaultProfileLogo;
  const userId = friend.userId;
  const navigate = useNavigate();
  const handleNavigateToProfile = () => {
    if (!blocked) {
      resetAllStates();
      navigate(`/profile/${userId}`);
    }
  };

  const handleUnBlock = () => {
    unblockUser(userId);
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
            {blocked && (
              <button
                className="pt-2 text-lg font-semibold"
                onClick={handleUnBlock}
                disabled={disableIsActive}
              >
                Unblock
              </button>
            )}{" "}
          </div>
        </div>
      </div>
    </>
  );
};

export default FriendCard;
