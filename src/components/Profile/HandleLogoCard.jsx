import { useContext, useState } from "react";
import CustomSlider from "./CustomSlider";
import { ProfileContext } from "../../context/ProfileContext";
import classes from "./HandleLogoCard.module.css";
import ResponsiveMasonryCard from "../UI/ResponsiveMasonryCard";
import FileInput from "../UI/FileInput";
import useProfile from "../../hooks/UseProfile";
import { MainContext } from "../../context/MainContext";
const HandleLogoCard = () => {
  const { disableIsActive } = useContext(MainContext);
  const { mainInformation } = useContext(ProfileContext);
  const { addNewProfilePhotoAndSet } = useProfile();
  const profilePhotos = mainInformation.profilePhotos?.slice().reverse();
  profilePhotos?.forEach((element, index) => {
    element.current = index === 0;
  });

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
  const formIsValid = selectedAssets.length === 1;
  const handleAddNewphotoAndSet = () => {
    addNewProfilePhotoAndSet(selectedAssets);
  };
  return (
    <>
      {mainInformation.profilePhotos?.length > 0 && (
        <CustomSlider assets={profilePhotos} />
      )}

      <div className={classes.container__newphoto}>
        <p className={classes.intro}>upload a new photo</p>
        <FileInput
          accept="image/*"
          onChange={handleAssetsChanges}
          hasError={error.hasError}
          errorMessage={error.errorMessage}
          name="Upload a new photo"
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
            disabled={!formIsValid || disableIsActive}
            onClick={handleAddNewphotoAndSet}
          >
            {"Save"}
          </button>
        </footer>
      </div>
    </>
  );
};

export default HandleLogoCard;
