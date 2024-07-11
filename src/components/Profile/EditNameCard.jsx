import validator from "validator";
import { useInput } from "../../hooks/UseInput";
import { Input } from "../UI/Input";
import { useContext } from "react";
import { ProfileContext } from "../../context/ProfileContext";
import { MainContext, content } from "../../context/MainContext";
import classes from "./EditNameCard.module.css";
import useProfile from "../../hooks/UseProfile";
const EditNameCard = () => {
  const { disableIsActive } = useContext(MainContext);
  const { editNameApi } = useProfile();
  const { contentModal } = useContext(MainContext);
  const { mainInformation } = useContext(ProfileContext);
  const firstName = mainInformation.firstName;
  const lastName = mainInformation.lastName;
  const {
    value: firstNameValue,
    handleInputBlur: handleFirstNameBlur,
    handleInputChange: handleFirstNameChange,
    hasError: firstNameHasError,
    valueIsValid: firstNameIsValid,
  } = useInput(
    firstName || "",
    (value) => validator.isLength(value, { min: 3 }) && validator.isAlpha(value)
  );
  const lastNameInformation = useInput(
    lastName || "",
    (value) => validator.isLength(value, { min: 3 }) && validator.isAlpha(value)
  );

  const formEditNameIsValid =
    firstNameIsValid &&
    lastNameInformation.valueIsValid &&
    contentModal === content.EDIT_NAME;

  const handleEditName = () => {
    editNameApi(firstNameValue, lastNameInformation.value);
  };
  return (
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
        onChange={(event) => lastNameInformation.handleInputChange(event)}
        onBlur={lastNameInformation.handleInputBlur}
        hasError={lastNameInformation.hasError}
      />
      <footer className={classes.footer}>
        <button
          disabled={!formEditNameIsValid || disableIsActive}
          onClick={handleEditName}
        >
          {"Save"}
        </button>
      </footer>
    </>
  );
};

export default EditNameCard;
