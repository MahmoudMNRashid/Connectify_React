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
            className="no"
          >
           No friends
          </p>
        )}
        {loading && <Loader />}
      </div>
    </>
  );
};

export default Content__InviteFriend;
