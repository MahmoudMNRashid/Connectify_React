import { useContext } from "react";
import { useParams } from "react-router-dom";
import { ProfileContext } from "../../context/ProfileContext";
import useFetchedPost from "../../hooks/UseFetchedPost";
import { host } from "../../util/help";
import { FaUsersSlash } from "react-icons/fa";
import SkeletonLoader2 from "../UI/SkeletonLoader2";
import classes from "./FriendsContent.module.css";
import FriendCard from "./FriendCard";
const BlockedUsersContent = () => {
  const { blockedUsers } = useContext(ProfileContext);
  let { userId } = useParams();
  const { loading } = useFetchedPost(
    `${host}/profile/blockedUsers/${userId}`,
    "BLOCKED__USERS"
  );

  return (
    <>
      <div className="container__profile ">
        <header className={classes.header}>
          <FaUsersSlash /> Total Users : {blockedUsers.total}
        </header>

        <div className={classes.flex}>
          {!loading &&
            blockedUsers.users.length > 0 &&
            blockedUsers.users.map((user) => {
              return <FriendCard key={user.userId} friend={user} blocked />;
            })}
        </div>

        {!loading && blockedUsers.users.length === 0 && (
          <p className="no"> No Users</p>
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

export default BlockedUsersContent;
