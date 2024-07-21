import { Link } from "react-router-dom";
import classes from "./PageInvitationCard.module.css";
import { MdContactPage, MdPerson, MdOutlineDateRange } from "react-icons/md";
import { convertDateFormat } from "../../util/help";
import defaultLogo from "../../assets/post/profile_default.svg";
import defaultPage from "../../assets/post/page_default.svg";
import { ProfileContext } from "../../context/ProfileContext";
import { useContext } from "react";
import useProfile from "../../hooks/UseProfile";
import Loader2 from "../UI/Loader2";
import { MainContext } from "../../context/MainContext";

const PageInvitationCard = ({ invite }) => {

  const { disableIsActive } = useContext(MainContext);
  const { selectTap } = useContext(ProfileContext);
  const { deletePageInvite, isLoading } = useProfile();
  const { acceptPageInvite, isLoading1 } = useProfile();
  const senderName = invite.sender.firstName + "  " + invite.sender.lastName;
  const pageName = invite.page.name;
  const dateInvite = convertDateFormat(invite.inviteDate);

  const logoPage =
    invite.page.logo && invite.page.logo.link
      ? invite.page.logo.link
      : defaultPage;

  const logoSender =
    invite.sender.logo &&
    invite.sender.logo.asset &&
    invite.sender.logo.asset.link
      ? invite.sender.logo.asset.link
      : defaultLogo;

  const pageId = invite.page.pageId;
  const userId = invite.sender.userId;
  const idInvite = invite.idInvite;
  return (
    <div className={classes.container}>
      <div className={classes.logos}>
        <div className={classes.logo__container}>
          <div className={classes.logo}>
            <img src={logoPage} />
          </div>
          <span>page</span>
        </div>
        <div className={classes.logo__container}>
          <div className={classes.logo}>
            <img src={logoSender} />
          </div>
          <span>user</span>
        </div>
      </div>

      <div className={classes.info}>
        <p>
          <MdContactPage fontSize={"2rem"} color="#7077A1" />
          <Link to={`/page/${pageId}`}>{pageName}</Link>
        </p>
        <p>
          <MdPerson fontSize={"2rem"} color="#7077A1" />
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
          <MdOutlineDateRange fontSize={"2rem"} color="#7077A1" />
          <span>{dateInvite}</span>
        </p>
      </div>
      <div className={classes.footer}>
        <button
          disabled={disableIsActive}
          onClick={() => {
            deletePageInvite(idInvite);
          }}
          className={classes.cancel}
        >
          {isLoading ? <Loader2 /> : "Delete"}
        </button>
        <button
          disabled={disableIsActive}
          onClick={() => {
            acceptPageInvite(idInvite, invite.page);
          }}
          className={classes.accept}
        >
          {isLoading1 ? <Loader2 /> : "Accept"}
        </button>
      </div>
    </div>
  );
};

export default PageInvitationCard;
