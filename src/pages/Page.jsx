import { useContext, useEffect, useState } from "react";
import usePage from "../hooks/UsePage";
import { PageContext } from "../context/PageContext";
import {
  FaFileAlt,
  FaHome,
  FaUserCog,
  FaUserPlus,
  FaUsers,
  FaUsersSlash,
} from "react-icons/fa";
import { GiStarsStack } from "react-icons/gi";
import { IoSettingsSharp } from "react-icons/io5";
import Tabs from "../components/Group/Tabs";
import { Toaster } from "react-hot-toast";
import { PostContext } from "../context/PostContext";
import ModalInstance from "../components/UI/Modals/Assets";
import CommentsModalInstance from "../components/UI/Modals/Comments";
import Content__Posts from "../components/Page/Content__Posts";
import Content__Moderator from "../components/Page/Content__Moderator";
import Content__Followers from "../components/Page/Content__Followers";
import Content__BlockedUsers from "../components/Page/Content__BlockedUsers";
import Content__Settings from "../components/Page/Content__Settings";
import Content__InviteFriend from "../components/Page/Content__InviteFriend";
import Content__Rates from "../components/Page/Content__Rates";
import PageMainInfoCard from "../components/Page/PageMainInfoCard";
import { FaCircleInfo } from "react-icons/fa6";
import MainModalInstance from "../components/UI/Modals/MainModal";
import { MainContext } from "../context/MainContext";
import Content__About from "../components/Page/Content__About";
import ConfirmModalInstance from "../components/UI/Modals/ConfirmModal";

const Page = () => {
  const { modalEditNameIsOpen, confirmModalIsOpen } = useContext(MainContext);

  const { getPageInformation } = usePage();
  const { modalIsOpen, commentsModalIsOpen } = useContext(PostContext);

  useEffect(() => {
    getPageInformation();
  }, [getPageInformation]);
  const { pageInformation } = useContext(PageContext);

  const role = pageInformation.role;
  const [activeTab, setActiveTab] = useState(0);
  const allTabs = [
    { icon: FaHome, tooltip: "Home", content: <div>home</div> },
    { icon: FaFileAlt, tooltip: "Posts", content: <Content__Posts /> },
    { icon: FaUserCog, tooltip: "Moderator", content: <Content__Moderator /> },
    { icon: FaUsers, tooltip: "Followers", content: <Content__Followers /> },
    {
      icon: FaUsersSlash,
      tooltip: "Blocked Users",
      content: <Content__BlockedUsers />,
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
      icon: GiStarsStack,
      tooltip: "Rates",
      content: <Content__Rates />,
    },
    {
      icon: FaCircleInfo,
      tooltip: "About",
      content: <Content__About />,
    },
  ];

  const filterTabsBasedOnModerator = () => {
    const tabs = allTabs.filter((tab) => tab.tooltip !== "Moderator");
    return tabs;
  };

  const filterTabsBasedOnFollowers = () => {
    let tabs;

    tabs = allTabs.filter(
      (tab) => tab.tooltip !== "Settings" && tab.tooltip !== "Blocked Users"
    );
    return tabs;
  };

  const filterTabsBasedOnNotFollowers = () => {
    let tabs;

    tabs = allTabs.filter(
      (tab) => tab.tooltip !== "Settings" && tab.tooltip !== "Blocked Users"
    );

    return tabs;
  };

  const roleBasedTabs = {
    moderator: filterTabsBasedOnModerator(),
    followers: filterTabsBasedOnFollowers(),
    "not-followers": filterTabsBasedOnNotFollowers(),
    // Add more roles and their specific tabs here
  };
  const tabsToDisplay = roleBasedTabs[role] || [];
  return (
    <div className="all">
      {modalIsOpen && <ModalInstance />}
      {commentsModalIsOpen && <CommentsModalInstance />}
      {modalEditNameIsOpen && <MainModalInstance />}{" "}
      {confirmModalIsOpen && <ConfirmModalInstance />}
      <Toaster />
      <div className="left">
        <Tabs
          tabs={tabsToDisplay}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>
      <div className="right">
        <div className="top">
          <PageMainInfoCard />
        </div>
        <div className="bottom">
          <div className="tab-content">{tabsToDisplay[activeTab]?.content}</div>
        </div>
      </div>
    </div>
  );
};

export default Page;
