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
          <p
            style={{
              fontSize: "2rem",
              padding: "2.5rem",
              boxShadow:
                "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
            }}
          >
            There are no blocked users
          </p>
        )}
        {loading && <Loader />}
      </div>
    </>
  );
};

export default Content__BlockedUsers;
