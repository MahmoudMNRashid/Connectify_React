import {
  useParams,
} from "react-router-dom";
import useFetchedPost from "../../hooks/UseFetchedPost";
import FriendCard from "./FriendCard";
import { host } from "../../util/help";
import SkeletonLoader2 from "../UI/SkeletonLoader2";
import { FaUserFriends } from "react-icons/fa";
import classes from "./FriendsContent.module.css";
import { useContext, } from "react";
import { ProfileContext } from "../../context/ProfileContext";

const FriendsContent = () => {
  const { friends } = useContext(ProfileContext);
  let { userId } = useParams();
  const { loading } = useFetchedPost(
    `${host}/profile/friends/${userId}`,
    "FRIENDS"
  );

  return (
    <>
      <div className="container__profile ">
        <header className={classes.header}>
          <FaUserFriends /> Total Friends : {friends.total}
        </header>

        <div className={classes.flex}>
          {!loading &&
            friends.friends.length > 0 &&
            friends.friends.map((friend) => {
              return <FriendCard key={friend.userId} friend={friend} />;
            })}
        </div>

        {!loading && friends.friends.length === 0 && (
          <p>There Are No Friends Yet</p>
        )}

        {loading && (
          <>
            {Array.from({ length: 20 }).map((_, index) => (
              <SkeletonLoader2 key={index} />
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default FriendsContent;
