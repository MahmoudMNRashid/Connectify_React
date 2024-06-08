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
