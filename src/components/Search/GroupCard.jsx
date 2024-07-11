import classes from "./GroupCard.module.css";
import defaultCover from "../../assets/post/group_default.jpg";

import { useNavigate } from "react-router-dom";
const GroupCard = ({ group }) => {
  const name = group.name;
  const cover = group.cover ? group.cover.link : defaultCover;
  const groupId = group._id;
  const description = group.description;
  const yourRole = group.YourRole;

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/group/${groupId}`);
  };

  return (
    <div className={classes.container}>
      <div className={classes.img}>
        <img src={cover} onClick={handleNavigate} />
      </div>
      <div>
        <p className={classes.name} onClick={handleNavigate}>
          {name}
        </p>
        {description && <p className={classes.description}>{description} </p>}
      </div>
      {yourRole && <span className={classes.role}>{yourRole}</span>}
    </div>
  );
};

export default GroupCard;
