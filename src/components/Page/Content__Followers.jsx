import { useParams } from "react-router";
import useFetchedPost from "../../hooks/UseFetchedPost";
import { host } from "../../util/help";
import { useContext } from "react";

import { PageContext } from "../../context/PageContext";
import { Loader } from "../UI/Loader";
import Followers_BlockedUsers_Card from "./Followers_BlockedUsers_Card";

const Content__Followers = () => {
  let { pageId } = useParams();

  const { loading } = useFetchedPost(
    `${host}/page/followers/${pageId}`,
    "FOLLOWERS"
  );
  const { pageFollowers } = useContext(PageContext);

  const followers = pageFollowers.followers;

  return (
    <>
      <div className="M_A_M__Content__Container">
        {followers.map((follower) => {
          return (
            <Followers_BlockedUsers_Card
              key={follower.userId}
              data={follower}
              isBlocked={false}
              isFollower
            />
          );
        })}
        {!loading && followers.length === 0 && (
          <p
            style={{
              fontSize: "2rem",
              padding: "2.5rem",
              boxShadow:
                "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
            }}
          >
            There are no Followers
          </p>
        )}
        {loading && <Loader />}
      </div>
    </>
  );
};

export default Content__Followers;
