import FileInput from "./FileInput";
import { useContext, useEffect, useState } from "react";
import classes from "./CreateComment.module.css";
import { IoSend } from "react-icons/io5";
import ResponsiveMasonryCard from "./UI/ResponsiveMasonryCard";
import { MdCancelScheduleSend } from "react-icons/md";
import useComments from "../hooks/UseComments";
import Loader2 from "./UI/Loader2";
import { PostContext } from "../context/PostContext";
import { IoMdClose } from "react-icons/io";
const CreateComment = () => {
  const {
    activeUpdatedComment,
    addActiveupdatedComment,
    changeModeToUpdate,
    changeModeToCreate,
    isUpdateMode,
  } = useContext(PostContext);

  useEffect(() => {
    if (Object.getOwnPropertyNames(activeUpdatedComment).length > 0) {
      setDescription(activeUpdatedComment.comment.description);
      setSelectedAssets(activeUpdatedComment.comment.assets);
      changeModeToUpdate();
    }
  }, [activeUpdatedComment, changeModeToUpdate]);
  //Hooks

  const [description, setDescription] = useState("");

  const { isLoading, createComment, updateComment } = useComments(
    selectedAssets,
    description,
    setSelectedAssets,
    setDescription
  );

  //Variables

  const formIsDisabled = selectedAssets.length === 0 && description === "";
  // getDisabledValue(isLoading)
  //Function
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  

  

  const handleSubmitForm = (event) => {
    if (isUpdateMode) {
      updateComment(event);
    } else {
      createComment(event);
    }
  };

  const handleCloseUpdateMode = () => {
    setSelectedAssets([]);
    setDescription("");
    changeModeToCreate();
    addActiveupdatedComment({});
  };
  return (
    <div className={classes.container__createComment}>
      {isUpdateMode && (
        <button disabled={isLoading}>
          <IoMdClose color="red" onClick={handleCloseUpdateMode} />
        </button>
      )}
      <form onSubmit={(event) => handleSubmitForm(event)}>
        <div>
          <textarea
            value={description}
            onChange={(event) => {
              handleDescriptionChange(event);
            }}
            placeholder="Type Your Comment"
          />
        </div>

        <FileInput
          accept="image/*,video/*"
          multiple
          onChange={handleAssetsChanges}
          hasError={error.hasError}
          errorMessage={error.errorMessage}
        />
       
        <button disabled={isLoading || formIsDisabled}>
          {isLoading && <Loader2 />}
          {!isLoading && formIsDisabled && <MdCancelScheduleSend />}
          {!isLoading && !formIsDisabled && <IoSend />}
        </button>
      </form>
    </div>
  );
};

export default CreateComment;
