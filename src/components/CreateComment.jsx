import FileInput from "./FileInput";
import { useState } from "react";
import classes from "./CreateComment.module.css";
import { IoSend } from "react-icons/io5";
import ResponsiveMasonryCard from "./UI/ResponsiveMasonryCard";
import { MdCancelScheduleSend } from "react-icons/md";
import useComments from "../hooks/UseComments";
import Loader2 from "./UI/Loader2";
const CreateComment = () => {
  //Hooks

  const [selectedAssets, setSelectedAssets] = useState([]);
  const [error, setError] = useState({ hasError: false, errorMessage: "" });
  const [description, setDescription] = useState("");
  const { isLoading, createComment } = useComments(
    selectedAssets,
    description,
    setSelectedAssets,setDescription,
    
  );
  //Variables
  const columnsCountBreakPoints = {
    350: 5,
    750: 5,
    900: 5,
  };
  const formIsDisabled = selectedAssets.length === 0 && description === "";
  // getDisabledValue(isLoading)
  //Function
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
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

    setSelectedAssets(Array.from(files));
    console.log(files);
  };

  const handleRemoveAsset = (index) => {
    setSelectedAssets((prevAssets) =>
      prevAssets.filter((file, i) => i !== index)
    );
  };
  return (
    <div className={classes.container__createComment}>
      <form onSubmit={(event) => createComment(event)}>
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
