import classes from "./GroupInfoCard.module.css";
import defaultGroup from "../../assets/post/group_default.jpg";
import { useNavigate } from "react-router-dom";
const GroupInfoCard = ({ group }) => {
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
        <div onClick={handleMoveToGroup} className={classes.img}>
          <img src={groupCover} />
        </div>
        <div className={classes.info}>
          <p onClick={handleMoveToGroup}> {name}</p>
          <p> {description}</p>
        </div>
      </div>

      <div className={classes.right}>
        <button>Visit</button>
      </div>
    </div>
  );
};

export default GroupInfoCard;
