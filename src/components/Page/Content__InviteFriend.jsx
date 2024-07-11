import { useParams } from "react-router-dom";
import useFetchedPost from "../../hooks/UseFetchedPost";
import { host } from "../../util/help";
import { useContext } from "react";
import { PageContext } from "../../context/PageContext";
import { Loader } from "../UI/Loader";
import Followers_BlockedUsers_Card from "./Followers_BlockedUsers_Card";

const Content__InviteFriend = () => {
  let { pageId } = useParams();

  const { loading } = useFetchedPost(
    `${host}/page/friendsWhoDidNotLike/${pageId}`,
    "FRIEND_NOT_JOINED_PAGE"
  );
  const { pageFriendsNotJoin } = useContext(PageContext);

  const friends = pageFriendsNotJoin.friends;
  return (
    <>
      <div className="M_A_M__Content__Container">
        {friends.map((friend) => {
          return (
            <Followers_BlockedUsers_Card
              key={friend.userId}
              data={friend}
              isMember={false}
              isFriendNotJoin
            />
          );
        })}
        {!loading && friends.length === 0 && (
          <p
            style={{
              fontSize: "2rem",
              padding: "2.5rem",
              boxShadow:
                "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
            }}
          >
            There are no admins
          </p>
        )}
        {loading && <Loader />}
      </div>
    </>
  );
};

export default Content__InviteFriend;
