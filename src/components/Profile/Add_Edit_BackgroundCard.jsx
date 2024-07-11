import { useContext, useState } from "react";
import FileInput from "../UI/FileInput";
import { MainContext, content } from "../../context/MainContext";
import { ProfileContext } from "../../context/ProfileContext";
import ResponsiveMasonryCard from "../UI/ResponsiveMasonryCard";
import useProfile from "../../hooks/UseProfile";
import classes from "./Add_Edit_BackgroundCard.module.css";
const Add_Edit_BackgroundCard = () => {
  const { disableIsActive, contentModal } = useContext(MainContext);
  const { updateBackgroundApi } = useProfile();

  const { mainInformation } = useContext(ProfileContext);
  const [selectedAssets, setSelectedAssets] = useState(
    content.EDIT_BACKGROUND === contentModal
      ? [mainInformation.backgroundPhotos]
      : []
  );
  const [error, setError] = useState("");
  const handleRemoveAsset = (index) => {
    setSelectedAssets((prevAssets) =>
      prevAssets.filter((file, i) => i !== index)
    );
  };
  const handleAssetsChanges = (event) => {
    setError({});
    setSelectedAssets([]);
    const file = event.target.files[0];
    let areAllFilesValid = true;

    // Check if all files are images    or size of any asset not up 10 MB

    const fileType = file.type;

    if (!fileType.startsWith("image")) {
      setError({
        hasError: true,
        errorMessage: "Only images  are allowed.",
      });
    }
    const fileSize = file.size;
    if (fileSize > 10485760) {
      areAllFilesValid = false;
      setError({
        hasError: true,
        errorMessage: "File size exceeds 10 MB",
      });
    }

    if (!areAllFilesValid) {
      return;
    }

    //Check if the user upload more than 1 assets
    if (file.length > 1) {
      setError({
        hasError: true,
        errorMessage: "You can only upload up to 1 files.",
      });
      return;
    }

    const modifyAssets = {
      resource_type: file.type.startsWith("image") ? "image" : "video",
      link: URL.createObjectURL(file),
      public_id: file.name,
      originalFile: file,
    };

    setSelectedAssets([modifyAssets]);
  };
  const columnsCountBreakPoints = {
    350: 1,
    750: 1,
    900: 1,
  };

  const formEdit_BackgroundIsVaild =
    (contentModal === content.EDIT_BACKGROUND ||
      contentModal === content.ADD_BACKGROUND) &&
    selectedAssets.length === 1;
  const handleupdateBackground = () => {
    updateBackgroundApi(selectedAssets);
  };
  return (
    <>
      <FileInput
        accept="image/*"
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
      <footer className={classes.footer}>
        <button
          disabled={!formEdit_BackgroundIsVaild || disableIsActive}
          onClick={handleupdateBackground}
        >
          {"Save"}
        </button>
      </footer>
    </>
  );
};

export default Add_Edit_BackgroundCard;
