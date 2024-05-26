import { useParams } from "react-router-dom";
import useFetchedPost from "../../hooks/UseFetchedPost";
import FriendCard from "./FriendCard";
import { host } from "../../util/help";
import SkeletonLoader2 from "../UI/SkeletonLoader2";
import { FaUserFriends } from "react-icons/fa";
import classes from "./FriendsContent.module.css";
const FriendsContent = () => {
  let { userId } = useParams();
  const { friends, loading } = useFetchedPost(
    `${host}/profile/friends/${userId}`
  );

  console.log(friends.friends);
  return (
    <>
      <div className="container__profile">
        <header className={classes.header}>
          <FaUserFriends /> Total Friends : {friends.total}
        </header>
        <div className={classes.flex}>
          {!loading &&
            friends.friends.length > 0 &&
            friends.friends.map((friend) => {
              return <FriendCard key={friend.userId} friend={friend} />;
            })}

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
      </div>
    </>
  );
};

export default FriendsContent;
