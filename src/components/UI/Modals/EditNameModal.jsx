import { createPortal } from "react-dom";
import classes from "./EditNameModal.module.css";
import { MdOutlineCancel } from "react-icons/md";
import { Input } from "../Input";
import { useContext, useState } from "react";
import { ProfileContext } from "../../../context/ProfileContext";
import validator from "validator";
import { useInput } from "../../../hooks/UseInput";
import useProfile from "../../../hooks/UseProfile";
import { MainContext, content } from "../../../context/MainContext";
import Loader2 from "../Loader2";
import Textarea from "../Textarea";
import FileInput from "../../FileInput";
import ResponsiveMasonryCard from "../ResponsiveMasonryCard";

const EditNameModal = () => {
  const { disableIsActive, closeModal, contentModal } = useContext(MainContext);

  const { mainInformation } = useContext(ProfileContext);
  const { isLoading, editNameApi, updateOrAddBio, updateBackgroundApi } =
    useProfile();
  const firstName = mainInformation.firstName;
  const lastName = mainInformation.lastName;
  const {
    value: firstNameValue,
    handleInputBlur: handleFirstNameBlur,
    handleInputChange: handleFirstNameChange,
    hasError: firstNameHasError,
    valueIsValid: firstNameIsValid,
  } = useInput(
    firstName,
    (value) => validator.isLength(value, { min: 3 }) && validator.isAlpha(value)
  );
  const lastNameInformation = useInput(
    lastName,
    (value) => validator.isLength(value, { min: 3 }) && validator.isAlpha(value)
  );
  const bioInformation = useInput(
    contentModal === content.ADD_BIO ? "" : mainInformation.bio,
    (value) => !validator.isEmpty(value)
  );
  const formEditNameIsValid =
    firstNameIsValid &&
    lastNameInformation.valueIsValid &&
    contentModal === content.EDIT_NAME;

  const formAdd_Edit_BioIsValid =
    bioInformation.valueIsValid &&
    (contentModal === content.ADD_BIO || contentModal === content.EDIT_BIO);

  const handleCloseTheModal = () => {
    closeModal(content.ADD_BIO);
  };
  const [selectedAssets, setSelectedAssets] = useState(
    content.EDIT_BACKGROUND === contentModal
      ? [mainInformation.backgroundPhotos]
      : []
  );

  const [error, setError] = useState("");
  const handleSave = () => {
    if (contentModal === content.EDIT_NAME) {
      editNameApi(firstNameValue, lastNameInformation.value);
    } else if (
      contentModal === content.ADD_BIO ||
      contentModal === content.EDIT_BIO
    ) {
      updateOrAddBio(bioInformation.value);
    } else if (
      contentModal === content.EDIT_BACKGROUND ||
      contentModal === content.ADD_BACKGROUND
    ) {
      updateBackgroundApi(selectedAssets);
    }
  };

  const formEdit_BackgroundIsVaild =
    (contentModal === content.EDIT_BACKGROUND ||
      contentModal === content.ADD_BACKGROUND) &&
    selectedAssets.length === 1;
 
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
  let disabledTheButton = true;
  if (contentModal === content.ADD_BIO || contentModal === content.EDIT_BIO) {
    disabledTheButton = isLoading || !formAdd_Edit_BioIsValid;
  } else if (contentModal === content.EDIT_NAME) {
    disabledTheButton = isLoading || !formEditNameIsValid;
  } else if (contentModal === content.EDIT_BACKGROUND || contentModal === content.ADD_BACKGROUND) {
    disabledTheButton = isLoading || !formEdit_BackgroundIsVaild;
  }
  return (
    <>
      <button
        disabled={disableIsActive}
        onClick={handleCloseTheModal}
        className={classes.backdrop}
      ></button>

      <div className={classes.wrapper}>
        <div className={classes.header}>
          <button disabled={disableIsActive} onClick={handleCloseTheModal}>
            <MdOutlineCancel />
          </button>
        </div>
        <div id="allComments" className={classes.main__content}>
          {contentModal === content.EDIT_NAME && (
            <>
              <Input
                placeholder="First Name"
                textError="First name: min. 3 characters, no numbers."
                type="text"
                value={firstNameValue}
                onChange={(event) => handleFirstNameChange(event)}
                onBlur={handleFirstNameBlur}
                hasError={firstNameHasError}
              />
              <Input
                placeholder="Last Name"
                textError="Last name: min. 3 characters, no numbers."
                type="text"
                value={lastNameInformation.value}
                onChange={(event) =>
                  lastNameInformation.handleInputChange(event)
                }
                onBlur={lastNameInformation.handleInputBlur}
                hasError={lastNameInformation.hasError}
              />
            </>
          )}
          {(contentModal === content.ADD_BIO ||
            contentModal === content.EDIT_BIO) && (
            <Textarea
              placeholder="Add Your Bio"
              textError="Bio should be not empty"
              value={bioInformation.value}
              onChange={(event) => bioInformation.handleInputChange(event)}
              onBlur={bioInformation.handleInputBlur}
              hasError={bioInformation.hasError}
            />
          )}

          {(contentModal === content.EDIT_BACKGROUND ||
            contentModal === content.ADD_BACKGROUND) && (
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
            </>
          )}
        </div>

        <footer className={classes.footer}>
          <button onClick={handleSave} disabled={disabledTheButton}>
            {!isLoading && "Save"}
            {isLoading && <Loader2 />}
          </button>
        </footer>
      </div>
    </>
  );
};

const EditNameModalInstance = () => {
  return createPortal(<EditNameModal />, document.getElementById("modal"));
};

export default EditNameModalInstance;
