import { useContext } from "react";
import style from "./ProfilesTabs.module.css";
import { ProfileContext } from "../../context/ProfileContext";

const ProfileTabs = () => {
  const { selectedTap, selectTap, mainInformation } =
    useContext(ProfileContext);

  const friendsNumber = mainInformation.friends;
  const incomingRequestNumber = mainInformation.incomingRequest;
  const pageInvitesNumber = mainInformation.pageInvites;
  const groupInvitesNumber = mainInformation.groupInvites;
  const isHeOwner = mainInformation.isHeOwner;

  const allTabs = [
    "Posts",
    "About",
    "Friends",
    "Group Invites",
    "Page Invites",
    "Joined Groups",
    "Joined Pages",
    "Owned Pages",
    "Incoming Requests",
    "Outgoing Requests",
  ];

  const ownerTabs = [
    "Group Invites",
    "Page Invites",
    "Owned Pages",
    "Incoming Requests",
    "Outgoing Requests",
  ];

  const filteredTabs = allTabs.filter(
    (tab) => !ownerTabs.includes(tab) || isHeOwner
  );

  const TabButton = ({ tabName }) => (
    <li className={style["nav-item"]}>
      <button
        onClick={() => selectTap(tabName)}
        className={`${style["nav-button"]} ${
          selectedTap === tabName ? style.active : undefined
        }`}
      >
        {tabName.toUpperCase()}

        {tabName === "Friends" ? (
          <p>{friendsNumber}</p>
        ) : tabName === "Group Invites" ? (
          <p>{groupInvitesNumber}</p>
        ) : tabName === "Page Invites" ? (
          <p>{pageInvitesNumber}</p>
        ) : tabName === "Incoming Requests" ? (
          <p>{incomingRequestNumber}</p>
        ) : null}
      </button>
    </li>
  );

  return (
    <ul className={style["profile-header-tab"]}>
      {filteredTabs.map((tab) => (
        <TabButton key={tab} tabName={tab} />
      ))}
    </ul>
  );
};

export default ProfileTabs;
