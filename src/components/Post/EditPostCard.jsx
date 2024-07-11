import { useContext, useState } from "react";
import { PostContext } from "../../context/PostContext";
import classes from "./EditPostCard.module.css";
import Textarea from "../UI/Textarea";
import { useInput } from "../../hooks/UseInput";
import validator from "validator";
import FileInput from "../UI/FileInput";
import ResponsiveMasonryCard from "../UI/ResponsiveMasonryCard";
import { MainContext } from "../../context/MainContext";
import usePost from "../../hooks/UsePost";

const EditPostCard = () => {
  const { updatePost } = usePost();
  const { postInformation } = useContext(PostContext);
  const { disableIsActive } = useContext(MainContext);
  const description = postInformation.postContent.description;
  const postId = postInformation.postContent._idPost;
  const assets = [...postInformation.postContent.assets];
  const whoCanComment = postInformation.postContent.whoCanComment;
  const whoCanSee = postInformation.postContent.whoCanSee;
  const postType = postInformation.permission.postType;

  const descInformation = useInput(
    description,
    (value) => !validator.isEmpty(value) || validator.isEmpty(value)
  );

  const [selectedAssets, setSelectedAssets] = useState(assets);
  const [error, setError] = useState("");
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

  const whoCanCommentInfo = useInput(whoCanComment, (value) => {
    return value !== "none";
  });
  const whoCanSeeInfo = useInput(whoCanSee, (value) => {
    return value !== "none";
  });

  const disable = selectedAssets.length === 0 && descInformation.value === "";
  const formIsDisabled =
    postType === "group"
      ? disable
      : disable &&
        !whoCanCommentInfo.valueIsValid ||
        !whoCanSeeInfo.valueIsValid;

  const columnsCountBreakPoints = {
    350: 2,
    750: 2,
    900: 2,
  };

  const handleUpdatePost = () => {
    updatePost(
      selectedAssets,
      descInformation.value,
      postId,
      whoCanCommentInfo.value,
      whoCanSeeInfo.value
    );
  };
  return (
    <>
      <Textarea
        placeholder="Add Your Bio"
        textError="Bio should be not empty"
        value={descInformation.value}
        onChange={(event) => descInformation.handleInputChange(event)}
        onBlur={descInformation.handleInputBlur}
        hasError={descInformation.hasError}
      />
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

      {postType !== "group" && (
        <div className={classes.select__container}>
          <div className={classes.select}>
            <select
              className={`${whoCanSeeInfo.hasError ? classes.invalid : null}`}
              value={whoCanSeeInfo.value}
              onChange={(event) => whoCanSeeInfo.handleInputChange(event)}
              onBlur={whoCanSeeInfo.handleInputBlur}
            >
              <option value="none">Who Can See:</option>
              <option value="public">public</option>
              <option value={postType === "page" ? "followers" : "friends"}>
                {postType === "page" ? "followers" : "friends"}
              </option>
            </select>
            {whoCanSeeInfo.hasError && (
              <p className={classes["text--invalid"]}>{"public or follower"}</p>
            )}
          </div>

          <div className={classes.select}>
            <select
              className={`${
                whoCanCommentInfo.hasError ? classes.invalid : null
              }`}
              value={whoCanCommentInfo.value}
              onChange={(event) => whoCanCommentInfo.handleInputChange(event)}
              onBlur={whoCanCommentInfo.handleInputBlur}
            >
              <option value="none">Who Can Comment:</option>
              <option value="public">public</option>
              <option value={postType === "page" ? "followers" : "friends"}>
                {postType === "page" ? "followers" : "friends"}
              </option>
            </select>
            {whoCanCommentInfo.hasError && (
              <p className={classes["text--invalid"]}>
                {"public or followers"}
              </p>
            )}
          </div>
        </div>
      )}
      <footer className={classes.footer}>
        <button
          disabled={formIsDisabled || disableIsActive}
          onClick={handleUpdatePost}
        >
          {"Save"}
        </button>
      </footer>
    </>
  );
};

export default EditPostCard;
