import validator from "validator";
import { useInput } from "../../hooks/UseInput";
import Textarea from "../UI/Textarea";
import { MainContext } from "../../context/MainContext";
import { useContext } from "react";
import classes from "./AddReportCard.module.css";
import { PostContext } from "../../context/PostContext";
import useGroup from "../../hooks/UseGroup";
const AddReportCard = () => {
  const { disableIsActive } = useContext(MainContext);
  const { addReport } = useGroup();
  const { postInformation } = useContext(PostContext);
  const postId = postInformation.postContent._idPost;
  const groupId = postInformation.groupContent.groupId;
  const descriptionInfo = useInput("", (value) => !validator.isEmpty(value));

  const formIsValid = descriptionInfo.valueIsValid;
console.log(postInformation)
  const handleAddReport = () => {
    addReport(groupId, postId, descriptionInfo.value);
  };
  return (
    <>
      <Textarea
        placeholder="What do you think of this post?"
        textError="Bio should be not empty"
        value={descriptionInfo.value}
        onChange={(event) => descriptionInfo.handleInputChange(event)}
        onBlur={descriptionInfo.handleInputBlur}
        hasError={descriptionInfo.hasError}
      />
      <footer className={classes.footer}>
        <button
          disabled={!formIsValid || disableIsActive}
          onClick={handleAddReport}
        >
          {"Save"}
        </button>
      </footer>
    </>
  );
};

export default AddReportCard;
