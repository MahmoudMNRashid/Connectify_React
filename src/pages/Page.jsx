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
import SkeletonLoadersMainPage from "../components/UI/SkeletonLoadersMainPage";
import SkeletonLoadersTabsPage from "../components/UI/SkeletonLoadersTabsPage";
import AuthGuard from "./AuthGuard";

const Page = () => {
  const { modalEditNameIsOpen, confirmModalIsOpen } = useContext(MainContext);

  const { getPageInformation, isLoading } = usePage();
  const { modalIsOpen, commentsModalIsOpen } = useContext(PostContext);

  useEffect(() => {
    getPageInformation();
  }, [getPageInformation]);
  const { pageInformation,resetPageStates } = useContext(PageContext);

  useEffect(() => {
    
  
    return () => {
      resetPageStates()
    }
  }, [resetPageStates])

  const role = pageInformation.role;
  const [activeTab, setActiveTab] = useState(0);
  const allTabs = [
    { icon: FaHome, tooltip: "Home", content:   <AuthGuard><div>home</div> </AuthGuard>},
    { icon: FaFileAlt, tooltip: "Posts", content:   <AuthGuard><Content__Posts /></AuthGuard> },
    { icon: FaUserCog, tooltip: "Moderator", content:   <AuthGuard><Content__Moderator /></AuthGuard> },
    { icon: FaUsers, tooltip: "Followers", content:   <AuthGuard><Content__Followers /> </AuthGuard>},
    {
      icon: FaUsersSlash,
      tooltip: "Blocked Users",
      content:   <AuthGuard><Content__BlockedUsers /></AuthGuard>,
    },

    {
      icon: IoSettingsSharp,
      tooltip: "Settings",
      content:  <AuthGuard> <Content__Settings /></AuthGuard>,
    },
    {
      icon: FaUserPlus,
      tooltip: "Invite Friend",
      content:  <AuthGuard> <Content__InviteFriend /></AuthGuard>,
    },
    {
      icon: GiStarsStack,
      tooltip: "Rates",
      content:  <AuthGuard> <Content__Rates /></AuthGuard>,
    },
    {
      icon: FaCircleInfo,
      tooltip: "About",
      content:  <AuthGuard> <Content__About /></AuthGuard>,
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
        <div className="top">
          {!isLoading && <PageMainInfoCard />}
          {isLoading && <SkeletonLoadersMainPage />}
        </div>
        <div className="bottom">
          {!isLoading && (
            <div className="tab-content">
              {tabsToDisplay[activeTab]?.content}
            </div>
          )}{" "}
        </div>
      </div>
    </div>
  );
};

export default Page;
