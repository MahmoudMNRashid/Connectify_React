import { useContext, useEffect } from "react";
import useFetchedPost from "../../hooks/UseFetchedPost";
import { host } from "../../util/help";
import { ProfileContext } from "../../context/ProfileContext";
import { useParams } from "react-router-dom";
import SkeletonLoader2 from "../UI/SkeletonLoader2";
import { VscGitPullRequest } from "react-icons/vsc";
import classes from "./FriendsContent.module.css";
import FriendRequestCard from "./FriendRequestCard";

const IncomingRequestsContent = () => {
  const { userId } = useParams();
  const { loading } = useFetchedPost(
    `${host}/profile/friendsRequestSentToMe/${userId}`
  );
  const { friendsRequestRecieve, setFriendsRequestRecieve } =
    useContext(ProfileContext);
  const totalRequests = friendsRequestRecieve?.total || 0;
  const requests = friendsRequestRecieve?.requests || [];

  useEffect(() => {
    setFriendsRequestRecieve({ requests: [], total: 0 });
  }, [setFriendsRequestRecieve]);

  const skeletonLoaders = Array.from({ length: 20 }).map((_, index) => (
    <SkeletonLoader2 key={index} />
  ));

  return (
    <div className="container__profile">
      <header className={classes.header}>
        <VscGitPullRequest fontSize={"2rem"} /> Total Requests: {totalRequests}
      </header>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "2rem",
          justifyContent: "center",
          margin: "1rem",
          width: "100%",
        }}
      >
        {!loading &&
          requests.length > 0 &&
          requests.map((request) => (
            <FriendRequestCard
              key={request.userId}
              request={request}
              out={false}
              me={false}
            />
          ))}

        {!loading && requests.length === 0 && <p>There are no requests sent</p>}

        {loading && skeletonLoaders}
      </div>
    </div>
  );
};

export default IncomingRequestsContent;
