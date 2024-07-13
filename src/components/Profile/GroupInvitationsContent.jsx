import { useParams } from "react-router-dom";
import { GroupInvitationCard } from "./GroupInvitationCard";
import useFetchedPost from "../../hooks/UseFetchedPost";
import { host } from "../../util/help";
import SkeletonLoader2 from "../UI/SkeletonLoader2";
import { FcInvite } from "react-icons/fc";
import classes from "./FriendsContent.module.css";
import { useContext } from "react";
import { ProfileContext } from "../../context/ProfileContext";
const GroupInvitationsContent = () => {
  let { userId } = useParams();

  const { loading } = useFetchedPost(
    `${host}/profile/getInvitationsSentToMeFromGroups/${userId}`
  ,'GROUP_INVITATIONS');
  const { groupInvites } = useContext(ProfileContext);
  console.log(groupInvites)
  return (
    <div className="container__profile">
      <header className={classes.header}>
        <FcInvite fontSize={"2rem"} /> Total Invites : {groupInvites.total}
      </header>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "2rem",
          justifyContent: "center",
          margin: "1rem",
        }}
      >
        {!loading &&
          groupInvites.invites.length > 0 &&
          groupInvites.invites.map((invite) => {
            return (
              <GroupInvitationCard key={invite.sender.userId} invite={invite} />
            );
          })}

        {!loading && groupInvites.invites.length === 0 && (
          <p>There Are No Invites Yet</p>
        )}

        {loading && (
          <>
            {Array.from({ length: 20 }).map((_, index) => (
              <SkeletonLoader2 key={index} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default GroupInvitationsContent;
