import classes from "./JoiningRequestCard.module.css";
import defaultLogo from "../../assets/post/profile_default.svg";
import { MdOutlineBadge } from "react-icons/md";
import { MdCalendarMonth } from "react-icons/md";
import { extractDate } from "../../util/help";
import useGroup from "../../hooks/UseGroup";
import { MainContext } from "../../context/MainContext";
import { useContext } from "react";
const JoiningRequestCard = ({ data }) => {
  const { acceptJoiningRequest, rejectJoiningRequest } = useGroup();

  const { disableIsActive } = useContext(MainContext);

  const logo =
    data.logo && data.logo.assets && data.logo.assets.link
      ? data.logo.assets.link
      : defaultLogo;

  const fullName = data.firstName + "   " + data.lastName;
  const requestDate = extractDate(data.requestDate);
  const userId = data.userId;
  return (
    <div className={classes.container}>
      <header className={classes.header}>
        <div>
          <img src={logo} />
        </div>
      </header>{" "}
      <div className={classes.content}>
        <div>
          <MdOutlineBadge fontSize={"2rem"} color="#4d869c" />
          <p>{fullName}</p>
        </div>
        <div>
          <MdCalendarMonth fontSize={"2rem"} color="#4d869c" />
          <p>{requestDate}</p>
        </div>
      </div>
      <footer className={classes.footer}>
        <button
          disabled={disableIsActive}
          onClick={() => {
            rejectJoiningRequest(userId, data);
          }}
        >
          Reject
        </button>
        <button
          disabled={disableIsActive}
          onClick={() => {
            acceptJoiningRequest(userId, data);
          }}
        >
          Accept
        </button>
      </footer>
    </div>
  );
};

export default JoiningRequestCard;
