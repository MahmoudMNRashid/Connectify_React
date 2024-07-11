import validator from "validator";
import { useInput } from "../../hooks/UseInput";
import classes from "./CreatePostCard.module.css";
import { useContext, useState } from "react";
import Textarea from "../UI/Textarea";
import FileInput from "../UI/FileInput";
import ResponsiveMasonryCard from "../UI/ResponsiveMasonryCard";
import { MainContext } from "../../context/MainContext";
import { PostContext } from "../../context/PostContext";
import usePost from "../../hooks/UsePost";

const CreatePostCard = () => {
  const { postInformation } = useContext(PostContext);
  const { createPost } = usePost();
  const { disableIsActive } = useContext(MainContext);

  const place = postInformation.place;
  const descInformation = useInput(
    "",
    (value) => !validator.isEmpty(value) || validator.isEmpty(value)
  );

  const [selectedAssets, setSelectedAssets] = useState([]);
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

  const whoCanCommentInfo = useInput("none", (value) => {
    return value !== "none";
  });
  const whoCanSeeInfo = useInput("none", (value) => {
    return value !== "none";
  });

  const disable = selectedAssets.length === 0 && descInformation.value === "";
  const formIsDisabled =
    place === "group"
      ? disable
      : disable &&
        !whoCanCommentInfo.valueIsValid &&
        !whoCanSeeInfo.valueIsValid;

  const columnsCountBreakPoints = {
    350: 2,
    750: 2,
    900: 2,
  };

  const handleCreatePost = () => {
    createPost(
      selectedAssets,
      descInformation.value,
      whoCanCommentInfo.value,
      whoCanSeeInfo.value
    );
  };
  return (
    <>
      <Textarea
        placeholder="Add Your Description"
        value={descInformation.value}
        onChange={(event) => descInformation.handleInputChange(event)}
        onBlur={descInformation.handleInputBlur}
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

      {place !== "group" && (
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
              <option value={place === "page" ? "followers" : "friends"}>
                {place === "page" ? "followers" : "friends"}
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
              <option value={place === "page" ? "followers" : "friends"}>
                {place === "page" ? "followers" : "friends"}
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
          onClick={handleCreatePost}
        >
          {"Save"}
        </button>
      </footer>
    </>
  );
};

export default CreatePostCard;
