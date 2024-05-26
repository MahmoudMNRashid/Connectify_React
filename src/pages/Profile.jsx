import { useContext } from "react";
import NavBar from "../components/NavBar";
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

const Profile = () => {
  const { selectedTap } = useContext(ProfileContext);

  const { modalIsOpen, commentsModalIsOpen } = useContext(PostContext);
  const renderContent = () => {
    switch (selectedTap) {
      case "About":
        return <AboutContent />;
      case "Friends":
        return <FriendsContent />;
      case "Posts":
        return <PostsContent />;
      case "Group Invites":
        return <GroupInvitationsContent />;
      case "Page Invites":
        return <PageInvitationsContent />;
      case "Joined Pages":
        return <JoinedPageContent />;
      case "Joined Groups":
        return <JoinedGroupContent />;
      case "Owned Pages":
        return <OwnedPagesContent />;
      case "Outgoing Requests":
        return <OutgoingRequestsContent />;
      case "Incoming Requests":
        return <IncomingRequestsContent />;
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
  return (
    <div>
      {modalIsOpen && <ModalInstance />}
      {commentsModalIsOpen && <CommentsModalInstance />}
      <Toaster />
      <NavBar />
      <div className="container__profile">
        <ProfileCard />
        {renderContent()}
      </div>
    </div>
  );
};

export default Profile;
