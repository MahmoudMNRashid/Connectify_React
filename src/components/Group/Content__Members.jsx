import { useParams } from "react-router-dom";
import M_A_M from "./M_A_M";
import useFetchedPost from "../../hooks/UseFetchedPost";
import { host } from "../../util/help";
import { GroupContext } from "../../context/GroupContext";
import { useContext } from "react";
import { Loader } from "../UI/Loader";

const Content__Members = () => {
  let { groupId } = useParams();

  const { loading } = useFetchedPost(
    `${host}/group/members/${groupId}`,
    "MEMBERS"
  );
  const { groupMembers } = useContext(GroupContext);

  const members = groupMembers.members;

  return (
    <>
      <div className="M_A_M__Content__Container">
        {members.map((member) => {
          return <M_A_M key={member.userId} data={member} isMember />;
        })}
        {!loading && members.length === 0 && (
          <p
            style={{
              fontSize: "2rem",
              padding: "2.5rem",
              boxShadow:
                "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
            }}
          >
            There are no members
          </p>
        )}
        {loading && <Loader />}
      </div>
    </>
  );
};

export default Content__Members;
