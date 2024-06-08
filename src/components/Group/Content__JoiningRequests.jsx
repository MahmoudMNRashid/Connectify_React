import { useParams } from "react-router-dom";
import useFetchedPost from "../../hooks/UseFetchedPost";
import { host } from "../../util/help";
import { useContext } from "react";
import { GroupContext } from "../../context/GroupContext";
import { Loader } from "../UI/Loader";
import JoiningRequestCard from "./JoiningRequestCard";

const Content__JoiningRequests = () => {
  let { groupId } = useParams();

  const { loading } = useFetchedPost(
    `${host}/group/joiningRequests/${groupId}`,
    "JOINING_REQUESTS"
  );
  const { groupJoiningRequests } = useContext(GroupContext);

  const requests = groupJoiningRequests.requests;
  return (
    <>
      <div className="M_A_M__Content__Container">
        {requests.map((request) => {
          return <JoiningRequestCard key={request.userId} data={request} />;
        })}
        {!loading && requests.length === 0 && (
          <p
            style={{
              fontSize: "2rem",
              padding: "2.5rem",
              boxShadow:
                "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
            }}
          >
            There are no requests
          </p>
        )}
        {loading && <Loader />}
      </div>
    </>
  );
};

export default Content__JoiningRequests;
