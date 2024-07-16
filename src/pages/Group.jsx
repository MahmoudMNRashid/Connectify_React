import { useContext, useEffect, useState } from "react";
import useGroup from "../hooks/UseGroup";
import Tabs from "../components/Group/Tabs";
import GroupMainInfoCard from "../components/Group/GroupMainInfoCard";
import {
  FaHome,
  FaFileAlt,
  FaUsers,
  FaUserShield,
  FaUserCog,
  FaThumbtack,
  FaFlag,
  FaUsersSlash,
  FaUserPlus,
} from "react-icons/fa";
import { ImExit } from "react-icons/im";
import { IoSettingsSharp } from "react-icons/io5";
import { FaUsersBetweenLines } from "react-icons/fa6";
import Content__Posts from "../components/Group/Content__Posts";
import { PostContext } from "../context/PostContext";
import ModalInstance from "../components/UI/Modals/Assets";
import CommentsModalInstance from "../components/UI/Modals/Comments";
import Content__Members from "../components/Group/Content__Members";
import Content__Admins from "../components/Group/Content__Admins";
import Content__Moderator from "../components/Group/Content__Moderator";
import Content__Reports from "../components/Group/Content__Reports";
import { Toaster } from "react-hot-toast";
import Content__BlockedUsers from "../components/Group/Content__BlockedUsers";
import Content__PinnedPosts from "../components/Group/Content__PinnedPosts";
import Content__YourPinnedPosts from "../components/Group/Content__YourPinnedPosts";
import Content__JoiningRequests from "../components/Group/Content__JoiningRequests";
import { HiFlag } from "react-icons/hi";
import Content__AdminReports from "../components/Group/Content__AdminReports";
import Content__Settings from "../components/Group/Content__Settings";
import Content__InviteFriend from "../components/Group/Content__InviteFriend";
import Content__LeaveGroup from "../components/Group/Content__LeaveGroup";
import { GroupContext } from "../context/GroupContext";
import { MainContext } from "../context/MainContext";
import MainModalInstance from "../components/UI/Modals/MainModal";
import SkeletonLoadersTabsPage from "../components/UI/SkeletonLoadersTabsPage";
import SkeletonLoadersMainGroup from "../components/UI/SkeletonLoadersMainGroup";
import NavBar from "../components/UI/NavBar";
import { RiMenu2Fill } from "react-icons/ri";
import TabsMobile from "../components/UI/TabsMobile";
const Group = () => {
  const { getgroupInformation, isLoading } = useGroup();
  const { modalIsOpen, commentsModalIsOpen } = useContext(PostContext);
  const {
    modalEditNameIsOpen,
    showTabsMobile,
    openCloseTabsMobile,
    disableIsActive,
  } = useContext(MainContext);

  useEffect(() => {
    getgroupInformation();
  }, [getgroupInformation]);
  const { groupInformation } = useContext(GroupContext);
  const role = groupInformation.role;
  const canApproveMemberRequest = groupInformation.CanApproveMemberRequest;
  const privacy = groupInformation.privacy;
  const [activeTab, setActiveTab] = useState(0);
  const allTabs = [
    {
      icon: FaHome,
      tooltip: "Home",
      content: (
        <div className="top">
          {!isLoading && <GroupMainInfoCard />}
          {isLoading && <SkeletonLoadersMainGroup />}
        </div>
      ),
    },
    { icon: FaFileAlt, tooltip: "Posts", content: <Content__Posts /> },
    { icon: FaUserCog, tooltip: "Moderator", content: <Content__Moderator /> },
    { icon: FaUserShield, tooltip: "Admins", content: <Content__Admins /> },
    { icon: FaUsers, tooltip: "Members", content: <Content__Members /> },
    {
      icon: FaUsersSlash,
      tooltip: "Blocked Users",
      content: <Content__BlockedUsers />,
    },
    {
      icon: FaThumbtack,
      tooltip: "Pinned Posts",
      content: <Content__PinnedPosts />,
    },
    { icon: FaFlag, tooltip: "Reports", content: <Content__Reports /> },
    {
      icon: FaUsersBetweenLines,
      tooltip: "Joining Requests",
      content: <Content__JoiningRequests />,
    },
    {
      icon: FaThumbtack,
      tooltip: "Your Pinned Posts",
      content: <Content__YourPinnedPosts />,
    },
    {
      icon: HiFlag,
      tooltip: "Reports From Admins",
      content: <Content__AdminReports />,
    },
    {
      icon: IoSettingsSharp,
      tooltip: "Settings",
      content: <Content__Settings />,
    },
    {
      icon: FaUserPlus,
      tooltip: "Invite Friend",
      content: <Content__InviteFriend />,
    },
    {
      icon: ImExit,
      tooltip: "Leave Group",
      content: <Content__LeaveGroup />,
    },
  ];

  const filterTabsBasedOnModerator = () => {
    const tabs = allTabs.filter((tab) => tab.tooltip !== "Your Pinned Posts");
    return tabs;
  };
  const filterTabsBasedOnAdmin = () => {
    const tabs = allTabs.filter(
      (tab) =>
        tab.tooltip !== "Reports From Admins" &&
        tab.tooltip !== "Your Pinned Posts"
    );
    return tabs;
  };
  const filterTabsBasedOnMember = () => {
    let tabs;
    if (canApproveMemberRequest) {
      tabs = allTabs.filter(
        (tab) =>
          tab.tooltip !== "Settings" &&
          tab.tooltip !== "Reports From Admins" &&
          tab.tooltip !== "Reports" &&
          tab.tooltip !== "Pinned Posts" &&
          tab.tooltip !== "Blocked Users"
      );
    } else {
      tabs = allTabs.filter(
        (tab) =>
          tab.tooltip !== "Settings" &&
          tab.tooltip !== "Reports From Admins" &&
          tab.tooltip !== "Reports" &&
          tab.tooltip !== "Joining Requests" &&
          tab.tooltip !== "Pinned Posts" &&
          tab.tooltip !== "Blocked Users"
      );
    }

    return tabs;
  };
  const filterTabsBasedOnNotMember = () => {
    let tabs;
    if (privacy === "private") {
      tabs = allTabs.filter(
        (tab) =>
          tab.tooltip !== "Leave Group" &&
          tab.tooltip !== "Invite Friend" &&
          tab.tooltip !== "Settings" &&
          tab.tooltip !== "Reports From Admins" &&
          tab.tooltip !== "Your Pinned Posts" &&
          tab.tooltip !== "Joining Requests" &&
          tab.tooltip !== "Reports" &&
          tab.tooltip !== "Pinned Posts" &&
          tab.tooltip !== "Blocked Users" &&
          tab.tooltip !== "Posts" &&
          tab.tooltip !== "Members" &&
          tab.tooltip !== "Admins" &&
          tab.tooltip !== "Moderator"
      );
    } else {
      tabs = allTabs.filter(
        (tab) =>
          tab.tooltip !== "Leave Group" &&
          tab.tooltip !== "Invite Friend" &&
          tab.tooltip !== "Settings" &&
          tab.tooltip !== "Reports From Admins" &&
          tab.tooltip !== "Your Pinned Posts" &&
          tab.tooltip !== "Joining Requests" &&
          tab.tooltip !== "Reports" &&
          tab.tooltip !== "Pinned Posts" &&
          tab.tooltip !== "Blocked Users" &&
          tab.tooltip !== "Members" &&
          tab.tooltip !== "Admins" &&
          tab.tooltip !== "Moderator"
      );
    }

    return tabs;
  };

  const roleBasedTabs = {
    moderator: filterTabsBasedOnModerator(),
    admin: filterTabsBasedOnAdmin(),
    member: filterTabsBasedOnMember(),
    notMember: filterTabsBasedOnNotMember(),
    // Add more roles and their specific tabs here
  };
  const tabsToDisplay = roleBasedTabs[role] || [];
  return (
    <>
      {modalIsOpen && <ModalInstance />}{" "}
      {modalEditNameIsOpen && <MainModalInstance />}
      {commentsModalIsOpen && <CommentsModalInstance />}
      <Toaster />
      <NavBar />{" "}
      <div style={{ position: "relative" }} className="navbar__mobile">
        <button disabled={disableIsActive}>
          <RiMenu2Fill onClick={openCloseTabsMobile} />
        </button>
        {showTabsMobile && (
          <TabsMobile
            tabs={tabsToDisplay}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        )}
      </div>
      <div className="all">
        <div className="left">
          {!isLoading && (
            <Tabs
              tabs={tabsToDisplay}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          )}
          {isLoading && <SkeletonLoadersTabsPage />}
        </div>
        <div className="right">
          {!isLoading && (
            <div className="tab-content">
              {tabsToDisplay[activeTab]?.content}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Group;
