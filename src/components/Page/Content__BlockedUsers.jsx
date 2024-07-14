import { useParams } from "react-router-dom";
import useFetchedPost from "../../hooks/UseFetchedPost";
import { host } from "../../util/help";
import { PageContext } from "../../context/PageContext";
import { useContext } from "react";
import { Loader } from "../UI/Loader";
import Followers_BlockedUsers_Card from "./Followers_BlockedUsers_Card";

const Content__BlockedUsers = () => {
  let { pageId } = useParams();

  const { loading } = useFetchedPost(
    `${host}/page/usersBlocked/${pageId}`,
    "BLOCKED_USERS_PAGE"
  );
  const { pageBlockedUsers } = useContext(PageContext);

  const blockedUsers = pageBlockedUsers.blockedUsers;

  return (
    <>
      <div className="M_A_M__Content__Container">
        {blockedUsers.map((user) => {
          return (
            <Followers_BlockedUsers_Card
              key={user.userId}
              data={user}
              isBlocked
            />
          );
        })}
        {!loading && blockedUsers.length === 0 && (
          <p className="no">No blocked users</p>
        )}
        {loading && <Loader />}
      </div>
    </>
  );
};

export default Content__BlockedUsers;
