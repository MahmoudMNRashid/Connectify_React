import { Link } from "react-router-dom";
import classes from "./GroupInvitationCard.module.css";
import { MdOutlineGroups, MdPerson, MdOutlineDateRange } from "react-icons/md";
import { convertDateFormat } from "../../util/help";
import defaultLogo from "../../assets/post/profile_default.svg";
import defaultGroup from "../../assets/post/group_default.jpg";
import { ProfileContext } from "../../context/ProfileContext";
import { useContext } from "react";
import useProfile from "../../hooks/UseProfile";
import Loader2 from "../UI/Loader2";
export const GroupInvitationCard = ({ invite }) => {
  const { deleteGroupInvite, isLoading } = useProfile();
  const { selectTap } = useContext(ProfileContext);
  const senderName = invite.sender.firstName + "  " + invite.sender.lastName;
  const groupName = invite.group.name;
  const dateInvite = convertDateFormat(invite.inviteDate);
  const description = invite.group.description
    ? invite.group.description
    : "There is no description";

  const backgroundImage =
    invite.group.cover && invite.group.cover.link
      ? invite.group.cover.link
      : defaultGroup;

  const logoImage =
    invite.sender.logo &&
    invite.sender.logo.asset &&
    invite.sender.logo.asset.link
      ? invite.sender.logo.asset.link
      : defaultLogo;

  const groupId = invite.group.groupId;
  const userId = invite.sender.userId;
  const idInvite = invite.idInvite;

  return (
    <div className={classes.container}>
      <div className={classes.background__logo}>
        <div className={classes.background}>
          <img src={backgroundImage} />
        </div>
        <div className={classes.logo}>
          <img src={logoImage} />
        </div>
      </div>

      <div className={classes.desc}>{description} </div>
      <div className={classes.info}>
        <p>
          <MdOutlineGroups fontSize={"2rem"} />
          <Link to={`/group/${groupId}`}>{groupName}</Link>
        </p>
        <p>
          <MdPerson fontSize={"2rem"} />
          <Link
            onClick={() => {
              selectTap("");
            }}
            to={`/profile/${userId}`}
          >
            {senderName}
          </Link>
        </p>
        <p>
          <MdOutlineDateRange fontSize={"2rem"} />
          <span>{dateInvite}</span>
        </p>
      </div>
      <div className={classes.footer}>
        <button
          onClick={() => {
            deleteGroupInvite(idInvite);
          }}
          className={classes.cancel}
        >
          {isLoading ? <Loader2 /> : "Delete invite"}
        </button>
      </div>
    </div>
  );
};
