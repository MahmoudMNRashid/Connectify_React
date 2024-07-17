import classes from "./GroupInfoCard.module.css";
import defaultGroup from "../../assets/post/group_default.jpg";
import { useNavigate } from "react-router-dom";
import { MainContext } from "../../context/MainContext";
import { useContext } from "react";
const GroupInfoCard = ({ group }) => {
  const {    
    disableIsActive, 
  } = useContext(MainContext);

  const name = group.name;
  const description = group.description ? group.description : "No description";
  const groupId = group._id;
  const groupCover =
    group.cover && group.cover.link ? group.cover.link : defaultGroup;

  const navigate = useNavigate();
  const handleMoveToGroup = () => {
    navigate(`/group/${groupId}`);
  };
  return (
    <div className={classes.container}>
      <div className={classes.left}>
        <div className={classes.img}>
          <img src={groupCover} />
        </div>
        <div className={classes.info}>
          <p> {name}</p>
          <p> {description}</p>
        </div>
      </div>

      <div className={classes.right}>
        <button disabled={disableIsActive} onClick={handleMoveToGroup}>
          Visit
        </button>
      </div>
    </div>
  );
};

export default GroupInfoCard;
