import { useParams } from "react-router-dom";
import PageInvitationCard from "./PageInvitationCard";
import useFetchedPost from "../../hooks/UseFetchedPost";
import { host } from "../../util/help";
import { ProfileContext } from "../../context/ProfileContext";
import { useContext } from "react";
import classes from "./FriendsContent.module.css";
import { FcInvite } from "react-icons/fc";
import SkeletonLoader2 from "../UI/SkeletonLoader2";
const PageInvitationsContent = () => {
  let { userId } = useParams();
  const { loading } = useFetchedPost(
    `${host}/profile/getInvitationsSentToMeFromPages/${userId}`,
    "PAGE_INVITATIONS"
  );

  const { pageInvites } = useContext(ProfileContext);

  return (
    <div className="container__profile">
      <header className={classes.header}>
        <FcInvite fontSize={"2rem"} /> Total Invites : {pageInvites.total}
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
          pageInvites.invites.length > 0 &&
          pageInvites.invites.map((invite) => {
            return (
              <PageInvitationCard key={invite.sender.userId} invite={invite} />
            );
          })}

        {!loading && pageInvites.invites.length === 0 && (
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

export default PageInvitationsContent;
