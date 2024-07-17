import { useContext } from "react";
import classes from "./GroupMainInfoCard.module.css";
import { GroupContext } from "../../context/GroupContext";
import defaultCoverGroup from "../../assets/post/group_default.jpg";
import { FaCheck } from "react-icons/fa6";
import { MdClose } from "react-icons/md";
import { RiSendPlaneFill } from "react-icons/ri";
import useGroup from "../../hooks/UseGroup";
import { MainContext } from "../../context/MainContext";

const GroupMainInfoCard = () => {
  const { disableIsActive } = useContext(MainContext);

  const { groupInformation: data } = useContext(GroupContext);
  const { sendJoinRequest, cancelJoinRequest } = useGroup();

  const cover =
    data.cover && data.cover.link ? data.cover.link : defaultCoverGroup;
  const description = data.description ? data.description : "No description";
  const name = data.name;
  const role = data.role;
  const isHeSendRequestToJoined = data.isHeSendRequestToJoined;
  const isHeInGroup =
    role === "member" || role === "admin" || role === "moderator";
  const groupId = data._id;
  const handleRequestJoin = () => {
    if (!isHeInGroup && !isHeSendRequestToJoined) {
      sendJoinRequest(groupId);
    }
    if (!isHeInGroup && isHeSendRequestToJoined) {
      cancelJoinRequest(groupId);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.background}>
        <img src={cover} />
      </div>
      <div className={classes.info__button}>
        <div className={classes.info}>
          <div className={classes.name}>
            <p>{name}</p>
          </div>
          <div className={classes.desc}>
            <p>{description}</p>
          </div>
        </div>
        <button disabled={disableIsActive} onClick={handleRequestJoin}>
          {isHeInGroup && (
            <>
              <FaCheck /> Joined
            </>
          )}

          {!isHeInGroup && isHeSendRequestToJoined && (
            <>
              {" "}
              <MdClose /> Cancel Join Request
            </>
          )}
          {!isHeInGroup && !isHeSendRequestToJoined && (
            <>
              <RiSendPlaneFill /> Send Join Request
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default GroupMainInfoCard;
