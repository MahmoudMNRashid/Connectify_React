import { createPortal } from "react-dom";
import classes from "./EditNameModal.module.css";
import { MdOutlineCancel } from "react-icons/md";
import { Input } from "../Input";
import { useContext } from "react";
import { ProfileContext } from "../../../context/ProfileContext";
import validator from "validator";
import { useInput } from "../../../hooks/UseInput";
import useProfile from "../../../hooks/UseProfile";
import { MainContext, content } from "../../../context/MainContext";
import Loader2 from "../Loader2";
import Textarea from "../Textarea";
import FileInput from "../../FileInput";

const EditNameModal = () => {
  const { disableIsActive, closeModal, contentModal } = useContext(MainContext);

  const { mainInformation } = useContext(ProfileContext);
  const { isLoading, editNameApi, updateOrAddBio } = useProfile();
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

  const handleSave = () => {
    if (contentModal === content.EDIT_NAME) {
      editNameApi(firstNameValue, lastNameInformation.value);
    } else if (
      contentModal === content.ADD_BIO ||
      contentModal === content.EDIT_BIO
    ) {
      updateOrAddBio(bioInformation.value);
    }
  };

  let disabledTheButton = true;
  if (contentModal === content.ADD_BIO || contentModal === content.EDIT_BIO) {
    disabledTheButton = isLoading || !formAdd_Edit_BioIsValid;
 
  } else if (contentModal === content.EDIT_NAME) {
    disabledTheButton = isLoading || !formEditNameIsValid;
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

{
  contentModal===content.EDIT_BACKGROUND && <FileInput

    
  />
}




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
