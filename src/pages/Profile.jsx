import { useContext } from "react";
import NavBar from "../components/NavBar";
import ProfileCard from "../components/Profile/ProfileCard";
import { ProfileContext } from "../context/ProfileContext";
import AboutContent from "../components/Profile/AboutContent";
import FriendsContent from "../components/Profile/FriendsContent";
import PostsContent from "../components/Profile/PostsContent";
import welcome from "../assets/profile/welcome.svg";
import { Toaster } from "react-hot-toast";
const Profile = () => {
  const { selectedTap } = useContext(ProfileContext);

  const content =
    selectedTap === "About" ? (
      <AboutContent />
    ) : selectedTap === "Friends" ? (
      <FriendsContent />
    ) : selectedTap === "Posts" ? (
      <PostsContent />
    ) : (
      <img style={{ width: "372px" ,overflow:'hidden' }} src={welcome} />
    );

  return (
    <div>
    <Toaster/>
      <NavBar />
      <div className="container__profile">
        <ProfileCard />
        {content}
      </div>
    </div>
  );
};

export default Profile;
