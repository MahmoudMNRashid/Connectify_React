import { useParams } from "react-router-dom";
import useFetchedPost from "../../hooks/UseFetchedPost";
import { host } from "../../util/help";
import { GroupContext } from "../../context/GroupContext";
import { useContext } from "react";
import M_A_M from "./M_A_M";
import { Loader } from "../UI/Loader";

const Content__BlockedUsers = () => {
  let { groupId } = useParams();

  const { loading } = useFetchedPost(
    `${host}/group/membersBlocked/${groupId}`,
    "BLOCKED_USERS"
  );
  const { groupBlockedUsers } = useContext(GroupContext);

  const blockedUsers = groupBlockedUsers.blockedUsers;

  return (
    <>
      <div className="M_A_M__Content__Container">
        {blockedUsers.map((user) => {
          return (
            <M_A_M key={user.userId} data={user} isMember={false} isBlocked />
          );
        })}
        {!loading && blockedUsers.length === 0 && (
          <p
           className="no"
          >
            No blocked users
          </p>
        )}
        {loading && <Loader />}
      </div>
    </>
  );
};

export default Content__BlockedUsers;
