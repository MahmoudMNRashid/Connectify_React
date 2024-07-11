import { useContext, useState } from "react";

import { Input } from "../UI/Input";
import { useInput } from "../../hooks/UseInput";
import validator from "validator";
import classes from "./CreatePageCard.module.css";
import useProfile from "../../hooks/UseProfile";
import { MainContext } from "../../context/MainContext";
import Select from "react-select";
import { pageCategories } from "../../util/help";

const CreatePageCard = () => {
  const { disableIsActive } = useContext(MainContext);

  const { createPage } = useProfile();
  const [selected, setSelected] = useState([]);
  const nameInformation = useInput("", (value) => !validator.isEmpty(value));
  const [error, setError] = useState(null);
  const handleSelectChange = (selectedOptions) => {
    setSelected(selectedOptions.map((option) => option.value));
    if (selectedOptions.length > 3) {
      setError("You can't select more than 4 categories");
    } else {
      setError(null);
    }
  };
  
  const formIsValid =
    nameInformation.valueIsValid && selected.length < 4 && selected.length > 0;
  const handleCreatePage = () => {
    createPage(nameInformation.value, selected);
  };
  return (
    <>
      <Input
        placeholder="Add Page Name"
        textError="Name should be not empty"
        value={nameInformation.value}
        onChange={(event) => nameInformation.handleInputChange(event)}
        onBlur={nameInformation.handleInputBlur}
        hasError={nameInformation.hasError}
      />
      <Select
        defaultValue={selected}
        onChange={handleSelectChange}
        options={pageCategories}
        isMulti
      />{" "}
      {error && <div style={{ color: "red" }}>{error}</div>}
      <footer className={classes.footer}>
        <button
          disabled={!formIsValid || disableIsActive}
          onClick={handleCreatePage}
        >
          {"Save"}
        </button>
      </footer>
    </>
  );
};

export default CreatePageCard;
