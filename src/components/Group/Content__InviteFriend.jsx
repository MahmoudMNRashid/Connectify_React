import { useParams } from "react-router-dom";
import { GroupContext } from "../../context/GroupContext";
import { useContext } from "react";
import useFetchedPost from "../../hooks/UseFetchedPost";
import { host } from "../../util/help";
import { Loader } from "../UI/Loader";
import M_A_M from "./M_A_M";

const Content__InviteFriend = () => {
  let { groupId } = useParams();

  const { loading } = useFetchedPost(
    `${host}/group/friendsDidNotJoin/${groupId}`,
    "FRIEND_NOT_JOINED"
  );
  const { groupFriendsNotJoin } = useContext(GroupContext);

  const friends = groupFriendsNotJoin.friends;
  console.log(friends);
  return (
    <>
      <div className="M_A_M__Content__Container">
        {friends.map((friend) => {
          return (
            <M_A_M
              key={friend.userId}
              data={friend}
              isMember={false}
              isFriendNotJoin
            />
          );
        })}
        {!loading && friends.length === 0 && <p className="no">no Friends</p>}
        {loading && <Loader />}
      </div>
    </>
  );
};

export default Content__InviteFriend;
