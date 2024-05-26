import { useParams } from "react-router-dom";
import GroupInfoCard from "./GroupInfoCard";
import useFetchedPost from "../../hooks/UseFetchedPost";
import { host } from "../../util/help";
import { useContext, useEffect } from "react";
import { ProfileContext } from "../../context/ProfileContext";
import SkeletonLoader2 from "../UI/SkeletonLoader2";
import { MdGroups } from "react-icons/md";
import classes from "./FriendsContent.module.css";

const JoinedGroupContent = () => {
  const { userId } = useParams();
  const { loading } = useFetchedPost(
    `${host}/profile/getGroupsJoined/${userId}`
  );
  const { joinedGroups, setJoinedGroups } = useContext(ProfileContext);

  const totalGroups = joinedGroups?.total || 0;
  const groups = joinedGroups?.groups || [];
  //   Make sure that JoinedPageContent resets the joinedPages state when it mounts:
  useEffect(() => {
    setJoinedGroups({ groups: [], total: 0 });
  }, [setJoinedGroups]);
  const skeletonLoaders = Array.from({ length: 20 }).map((_, index) => (
    <SkeletonLoader2 key={index} />
  ));


  return (
    <div className="container__profile">
      <header className={classes.header}>
        <MdGroups  fontSize={"2rem"} /> Total Groups: {totalGroups}
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
          groups.length > 0 &&
          groups.map((group) => (
            <GroupInfoCard key={group._id} group={group} />
          ))}

        {!loading && groups.length === 0 && <p>There are no groups</p>}

        {loading && skeletonLoaders}
      </div>
    </div>
  );
};

export default JoinedGroupContent;
