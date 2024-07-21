import { useContext } from "react";
import { MainContext } from "../../context/MainContext";
import useSearchAll from "../../hooks/UseSearchAll";
import { host } from "../../util/help";
import { Loader } from "../UI/Loader";
import GroupCard from "./GroupCard";

const GroupTab = ({ query, startSearch }) => {
  const { groupsResult } = useContext(MainContext);
  const { loading } = useSearchAll(
    `${host}/profile/searchGroups?query=${query}`,
    "GROUP",
    startSearch
  );


  return (
    <div className="conatiner_results">
      {groupsResult.groups.map((group) => {
        return <GroupCard key={group._id} group={group} />;
      })}
      {!loading &&
        groupsResult.groups.length === 0 &&
        groupsResult.firstTime && (
          <p
            style={{
              fontSize: "1rem",
            }}
          >
            No result
          </p>
        )}
      {!loading && !groupsResult.firstTime && <p>Please search</p>}
      {loading && <Loader />}
    </div>
  );
};

export default GroupTab;
