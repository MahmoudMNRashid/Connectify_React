import { FaEye, FaUnlock, FaUserPlus } from "react-icons/fa";
import classes from "./Followers_BlockedUsers_Card.module.css";
import defaultLogo from "../../assets/post/profile_default.svg";
import { RiUserForbidFill } from "react-icons/ri";

import { PageContext } from "../../context/PageContext";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { convertDateFormat, getUserId } from "../../util/help";
import usePage from "../../hooks/UsePage";
import { MainContext } from "../../context/MainContext";

const Followers_BlockedUsers_Card = ({
  data: follower,
  isFollower,
  isBlocked,
  isFriendNotJoin,
  ismoderator,
}) => {
  const { disableIsActive } = useContext(MainContext);

  const { pageInformation } = useContext(PageContext);
  const { blockFollower } = usePage();
  const { unblockUser } = usePage();
  const { inviteFriend } = usePage();
  const role = pageInformation.role;
  const name =
    (follower.firstName || follower.firstName) + " " + follower.lastName;
  const userId = follower.userId;
  const logo =
    follower.logo && follower.logo.asset && follower.logo.asset.link
      ? follower.logo.asset.link
      : defaultLogo;
  const blockedDate = convertDateFormat(follower.date);

  const navigate = useNavigate();
  const handleVisit = () => {
    navigate(`/profile/${userId}`);
  };

  const handleBlock = () => {
    blockFollower(follower);
  };
  const handleUnblock = () => {
    unblockUser(follower);
  };

  const handleInviteFriend = () => {
    inviteFriend(userId);
  };
  return (
    <div className={classes.f}>
      <div className={classes.container}>
        <div className={classes.info}>
          <div className={classes.img}>
            <img src={logo} />
          </div>
          <div className={classes.texts}>
            <p>{name}</p>
            {(isBlocked || ismoderator) && <p>{blockedDate}</p>}{" "}
          </div>
        </div>
        <div className={classes.buttons}>
          <button disabled={disableIsActive} onClick={handleVisit}>
            <FaEye fontSize={"1.3rem"} /> Visit
          </button>
          {isFriendNotJoin && (
            <button disabled={disableIsActive} onClick={handleInviteFriend}>
              <FaUserPlus fontSize={"1.3rem"} /> Invite
            </button>
          )}

          {role === "moderator" &&
            isFollower &&
            !isBlocked &&
            userId !== getUserId() && (
              <button disabled={disableIsActive} onClick={handleBlock}>
                <RiUserForbidFill fontSize={"1.3rem"} />
                Block
              </button>
            )}

          {!isFollower && isBlocked && (
            <button
              disabled={disableIsActive}
              onClick={() => {
                handleUnblock();
              }}
            >
              <FaUnlock fontSize={"1.3rem"} />
              Unblock
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Followers_BlockedUsers_Card;
