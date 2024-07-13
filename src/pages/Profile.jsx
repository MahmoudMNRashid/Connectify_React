import { useContext, useEffect, useRef } from "react";
import NavBar from "../components/UI/NavBar";
import ProfileCard from "../components/Profile/ProfileCard";
import { ProfileContext } from "../context/ProfileContext";
import AboutContent from "../components/Profile/AboutContent";
import FriendsContent from "../components/Profile/FriendsContent";
import PostsContent from "../components/Profile/PostsContent";
import welcome from "../assets/profile/welcome.svg";
import { Toaster } from "react-hot-toast";
import { PostContext } from "../context/PostContext";
import ModalInstance from "../components/UI/Modals/Assets";
import CommentsModalInstance from "../components/UI/Modals/Comments";
import GroupInvitationsContent from "../components/Profile/GroupInvitationsContent";
import PageInvitationsContent from "../components/Profile/PageInvitationsContent";
import JoinedPageContent from "../components/Profile/JoinedPageContent";
import JoinedGroupContent from "../components/Profile/JoinedGroupContent";
import OwnedPagesContent from "../components/Profile/OwnedPagesContent";
import OutgoingRequestsContent from "../components/Profile/OutgoingRequestsContent";
import IncomingRequestsContent from "../components/Profile/IncomingRequestsContent";
import ConfirmModalInstance from "../components/UI/Modals/ConfirmModal";
import { MainContext } from "../context/MainContext";
import { useLocation } from "react-router-dom";
import AuthGuard from "./AuthGuard";

const Profile = () => {
  const { selectedTap, resetAllStates } = useContext(ProfileContext);
  const { confirmModalIsOpen } = useContext(MainContext);

  const { modalIsOpen, commentsModalIsOpen } = useContext(PostContext);
  const renderContent = () => {
    switch (selectedTap) {
      case "About":
        return (
          <AuthGuard>
            <AboutContent />
          </AuthGuard>
        );
      case "Friends":
        return (
          <AuthGuard>
            <FriendsContent />
          </AuthGuard>
        );
      case "Posts":
        return (
          <AuthGuard>
            <PostsContent />
          </AuthGuard>
        );
      case "Group Invites":
        return (
          <AuthGuard>
            <GroupInvitationsContent />
          </AuthGuard>
        );
      case "Page Invites":
        return (
          <AuthGuard>
            <PageInvitationsContent />
          </AuthGuard>
        );
      case "Joined Pages":
        return (
          <AuthGuard>
            <JoinedPageContent />
          </AuthGuard>
        );
      case "Joined Groups":
        return (
          <AuthGuard>
            <JoinedGroupContent />
          </AuthGuard>
        );
      case "Owned Pages":
        return (
          <AuthGuard>
            <OwnedPagesContent />
          </AuthGuard>
        );
      case "Outgoing Requests":
        return (
          <AuthGuard>
            <OutgoingRequestsContent />
          </AuthGuard>
        );
      case "Incoming Requests":
        return (
          <AuthGuard>
            <IncomingRequestsContent />
          </AuthGuard>
        );
      default:
        return (
          <img
            style={{ width: "372px", overflow: "hidden" }}
            src={welcome}
            alt="Welcome"
          />
        );
    }
  };

  useEffect(() => {
    return () => {
      resetAllStates();
    };
  }, [resetAllStates]);
  const location = useLocation();
  const lastLocation = useRef(location);
  useEffect(() => {
    const handle = () => {
      if (location.pathname.includes("/profile")) {
        console.log("aaasssdddfffggghhh");
        resetAllStates();
      }
    };
    window.addEventListener("popstate", () => {
      console.log("qqqqqqqqqqqqqqq");
      handle();
    });
    return () => {
      window.removeEventListener("popstate", () => {
        "qqqqqqqqqqqqq";
      });
    };
  }, [location, resetAllStates]);
  useEffect(() => {
    // Update the lastLocation ref on every location change
    lastLocation.current = location;
  }, [location]);
  return (
    <div>
      {modalIsOpen && <ModalInstance />}
      {commentsModalIsOpen && <CommentsModalInstance />}
      {confirmModalIsOpen && <ConfirmModalInstance />} <Toaster />
      <NavBar />
      <div className="container__profile">
        <ProfileCard />
        {renderContent()}
      </div>
    </div>
  );
};

export default Profile;
