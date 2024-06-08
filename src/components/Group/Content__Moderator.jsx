import { useParams } from "react-router-dom";
import useFetchedPost from "../../hooks/UseFetchedPost";
import { host } from "../../util/help";
import { useContext } from "react";
import { GroupContext } from "../../context/GroupContext";
import M_A_M from "./M_A_M";
import { Loader } from "../UI/Loader";

const Content__Moderator = () => {
  let { groupId } = useParams();

  const { loading } = useFetchedPost(
    `${host}/group/moderator/${groupId}`,
    "MODERATOR"
  );
  const { groupModerator } = useContext(GroupContext);
  const moderator = groupModerator.moderator;

  return (
    <>
      <div className="M_A_M__Content__Container">
        {!loading && moderator && <M_A_M data={moderator} isMember={false} />}
        {!loading && moderator.length === 0 && (
          <p
            style={{
              fontSize: "2rem",
              padding: "2.5rem",
              boxShadow:
                "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
            }}
          >
            There are no moderator
          </p>
        )}
        {loading && <Loader />}
      </div>
    </>
  );
};

export default Content__Moderator;
