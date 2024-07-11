import { useContext } from "react";
import useSearchAll from "../../hooks/UseSearchAll";
import { host } from "../../util/help";
import { MainContext } from "../../context/MainContext";
import UserCard from "./UserCard";
import { Loader } from "../UI/Loader";

const UserTab = ({ query, startSearch }) => {
  const { usersResult,  } = useContext(MainContext);

  const { loading } = useSearchAll(
    `${host}/profile/searchProfiles?query=${query}`,
    "USER",
    startSearch
  );

 
  return (
    <div className="conatiner_results">
      {usersResult.users.map((user) => {
        return <UserCard key={user._id} user={user} />;
      })}{" "}
      {!loading && usersResult.users.length === 0 && usersResult.firstTime && (
          <p
            style={{
              fontSize: "1rem",
            }}
          >
            No result
          </p>
        )}
        {!loading && !usersResult.firstTime && <p>please search</p>}
      {loading && <Loader />}
    </div>
  );
};

export default UserTab;
