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

  const [error, setError] = useState("");
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
  const [selectedAssets, setSelectedAssets] = useState([]);

  const handleRemoveAsset = (index) => {
    setSelectedAssets((prevAssets) =>
      prevAssets.filter((file, i) => i !== index)
    );
  };
  const handleAssetsChanges = (event) => {
    setError({});
    setSelectedAssets([]);
    const files = event.target.files;
    let areAllFilesValid = true;

    // Check if all files are images or videos   or size of any asset not up 10 MB
    Array.from(files).forEach((file) => {
      const fileType = file.type;
      if (!fileType.startsWith("image") && !fileType.startsWith("video")) {
        setError({
          hasError: true,
          errorMessage: "Only images and videos are allowed.",
        });
      }

      if (file.size > 10485760) {
        areAllFilesValid = false;
        setError({
          hasError: true,
          errorMessage: "File size exceeds 10 MB",
        });
      }
    });

    if (!areAllFilesValid) {
      return;
    }

    //Check if the user upload more than 5 assets
    if (files.length > 5) {
      setError({
        hasError: true,
        errorMessage: "You can only upload up to 5 files.",
      });
      return;
    }

    const modifyAssets = Array.from(files).map((file) => {
      return {
        resource_type: file.type.startsWith("image") ? "image" : "video",
        link: URL.createObjectURL(file),
        public_id: file.name,
        originalFile: file,
      };
    });

    setSelectedAssets(modifyAssets);
  };
  const columnsCountBreakPoints = {
    350: 5,
    750: 5,
    900: 5,
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
        {selectedAssets.length > 0 && (
          <ResponsiveMasonryCard
            assets={selectedAssets}
            columnsCountBreakPoints={columnsCountBreakPoints}
            imageConfig={{
              onClick: handleRemoveAsset,
              style: { cursor: "pointer" },
            }}
            videoConfig={{
              onClick: handleRemoveAsset,
              style: { cursor: "pointer" },
              showTheControl: false,
            }}
          />
        )}
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
