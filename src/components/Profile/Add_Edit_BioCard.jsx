import { useContext } from "react";
import { MainContext, content } from "../../context/MainContext";
import Textarea from "../UI/Textarea";
import { useInput } from "../../hooks/UseInput";
import { ProfileContext } from "../../context/ProfileContext";
import validator from "validator";
import useProfile from "../../hooks/UseProfile";
import classes from "./Add_Edit_BioCard.module.css";
const Add_Edit_BioCard = () => {
  const { disableIsActive, contentModal } = useContext(MainContext);
  const { mainInformation } = useContext(ProfileContext);
  const { updateOrAddBio } = useProfile();
  const bioInformation = useInput(
    contentModal === content.ADD_BIO ? "" : mainInformation.bio || "",
    (value) => !validator.isEmpty(value)
  );

  const formAdd_Edit_BioIsValid =
    bioInformation.valueIsValid &&
    (contentModal === content.ADD_BIO || contentModal === content.EDIT_BIO);
  const handleEditName = () => {
    updateOrAddBio(bioInformation.value);
  };
  return (
    <>
  
      <Textarea
        placeholder="Add Your Bio"
        textError="Bio should be not empty"
        value={bioInformation.value}
        onChange={(event) => bioInformation.handleInputChange(event)}
        onBlur={bioInformation.handleInputBlur}
        hasError={bioInformation.hasError}
      />
      <footer className={classes.footer}>
        <button
          disabled={!formAdd_Edit_BioIsValid || disableIsActive}
          onClick={handleEditName}
        >
          {"Save"}
        </button>
      </footer>
    </>
  );
};

export default Add_Edit_BioCard;
