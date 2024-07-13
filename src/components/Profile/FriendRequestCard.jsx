import classes from "./FriendRequestCard.module.css";
import { IoPersonCircle } from "react-icons/io5";
import { IoIosTime } from "react-icons/io";
import { extractDate } from "../../util/help";
import defaultProfile from "../../assets/post/profile_default.svg";
import useProfile from "../../hooks/UseProfile";
import Loader2 from "../UI/Loader2";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ProfileContext } from "../../context/ProfileContext";
const FriendRequestCard = ({ request, out, me }) => {
  const name = request.firstName + "  " + request.lastName;
  const sendDate = extractDate(request.sendingDate);
  const userId = request.userId;
  const logo =
    request.logo && request.logo.asset && request.logo.asset.link
      ? request.logo.asset.link
      : defaultProfile;

  const { cancelFriendRequestSentByMeApi, isLoading } = useProfile();
  const { acceptfriendApi, isLoading: isLoading1 } = useProfile();
  const { cancelFriendRequestSentToMeApi, isLoading: isLoading2 } =
    useProfile();
  const handleCancelRequest = () => {
    if (me) {
      cancelFriendRequestSentByMeApi(userId, "OUTGOING REQUESTS");
    } else {
      cancelFriendRequestSentToMeApi(userId, "INCOMING REQUESTS");
    }
  };
  const handleAcceptRequest = () => {
    acceptfriendApi(userId, "INCOMING REQUESTS");
  };
  const navigate = useNavigate();
  const { resetAllStates } = useContext(ProfileContext);
  const handleNavigateToProfile = () => {
    navigate(`/profile/${userId}`);
    resetAllStates();
  };
  return (
    <div className={classes.container}>
      <div className={classes.info}>
        <div className={classes.img}>
          <img src={logo} onClick={handleNavigateToProfile} />
        </div>

        <div className={classes.texts}>
          <div className={classes.text}>
            <IoPersonCircle fontSize={"1.7rem"} />
            <p onClick={handleNavigateToProfile}>{name}</p>
          </div>
          <div className={classes.text}>
            <IoIosTime fontSize={"1.7rem"} />
            <p>{sendDate}</p>
          </div>
        </div>
      </div>

      <div className={classes.buttons}>
        <button onClick={handleCancelRequest}>
          {!isLoading && !isLoading2 ? "Cancel" : <Loader2 />}
        </button>
        {!out && (
          <button onClick={handleAcceptRequest}>
            {!isLoading1 ? "Accept" : <Loader2 />}
          </button>
        )}
      </div>
    </div>
  );
};

export default FriendRequestCard;
