import { useParams } from "react-router-dom";
import useFetchedPost from "../../hooks/UseFetchedPost";
import { useContext } from "react";
import { GroupContext } from "../../context/GroupContext";
import M_A_M from "./M_A_M";
import { Loader } from "../UI/Loader";
import { host } from "../../util/help";

const Content__Admins = () => {
  let { groupId } = useParams();

  const { loading } = useFetchedPost(
    `${host}/group/admins/${groupId}`,
    "ADMINS"
  );
  const { groupAdmins } = useContext(GroupContext);

  const admins = groupAdmins.admins;

  return (
    <>
      <div className="M_A_M__Content__Container">
        {admins.map((admin) => {
          return <M_A_M key={admin.userId} data={admin} isMember={false} />;
        })}
        {!loading && admins.length === 0 && (
          <p
          className="no"
          >
            No admins
          </p>
        )}
        {loading && <Loader />}
      </div>
    </>
  );
};

export default Content__Admins;
