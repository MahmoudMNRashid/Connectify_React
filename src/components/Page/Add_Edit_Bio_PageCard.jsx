import { useContext } from "react";
import { MainContext, content } from "../../context/MainContext";
import Textarea from "../UI/Textarea";
import classes from "./Add_Edit_Bio_PageCard.module.css";
import { PageContext } from "../../context/PageContext";
import { useInput } from "../../hooks/UseInput";
import validator from "validator";
import usePage from "../../hooks/UsePage";

const Add_Edit_Bio_PageCard = () => {
  const { disableIsActive, contentModal } = useContext(MainContext);
  const { pageInformation } = useContext(PageContext);
  const { addBio, editBio } = usePage();
  const bioInformation = useInput(
    contentModal === content.ADD_BIO ? "" : pageInformation.bio || "",
    (value) => !validator.isEmpty(value)
  );

  const formAdd_Edit_BioIsValid =
    bioInformation.valueIsValid

  const handleAdd_Edit_Bio = () => {
    if (contentModal === content.ADD_BIO_PAGE) {
      addBio(bioInformation.value);
    } else {
      editBio(bioInformation.value);
    }
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
          onClick={handleAdd_Edit_Bio}
        >
          {"Save"}
        </button>
      </footer>
    </>
  );
};

export default Add_Edit_Bio_PageCard;
