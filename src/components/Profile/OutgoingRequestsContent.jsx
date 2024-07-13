import { useParams } from "react-router-dom";
import FriendRequestCard from "./FriendRequestCard";
import useFetchedPost from "../../hooks/UseFetchedPost";
import { host } from "../../util/help";
import { ProfileContext } from "../../context/ProfileContext";
import { useContext, useEffect } from "react";
import SkeletonLoader2 from "../UI/SkeletonLoader2";
import classes from "./FriendsContent.module.css";
import { LuGitPullRequestClosed } from "react-icons/lu";
const OutgoingRequestsContent = () => {
  const { userId } = useParams();
  const { loading } = useFetchedPost(
    `${host}/profile/friendsRequestSentByMe/${userId}`,
    "OUTGOING_REQUESTS"
  );
  const { friendsRequestSend } =
    useContext(ProfileContext);
  const totalRequests = friendsRequestSend?.total || 0;
  const requests = friendsRequestSend?.requests || [];



  const skeletonLoaders = Array.from({ length: 20 }).map((_, index) => (
    <SkeletonLoader2 key={index} />
  ));

  useEffect(() => {
    console.log('start')
  
    return () => {
    console.log('finish')  
    }
  },[])
  
  return (
    <div className="container__profile">
      <header className={classes.header}>
        <LuGitPullRequestClosed  fontSize={"2rem"} /> Total Requests: {totalRequests}
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
            <FriendRequestCard key={request.userId} request={request} out me />
          ))}

        {!loading && requests.length === 0 && <p>There are no requests sent</p>}

        {loading && skeletonLoaders}
      </div>
    </div>
  );
};

export default OutgoingRequestsContent;
