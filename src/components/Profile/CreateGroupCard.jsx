import validator from "validator";
import { useInput } from "../../hooks/UseInput";
import { Input } from "@mui/material";
import classes from "./CreateGroupCard.module.css";
import Select from "react-select";
import { useContext, useState } from "react";
import { MainContext } from "../../context/MainContext";
import useProfile from "../../hooks/UseProfile";
const CreateGroupCard = () => {
  const { disableIsActive } = useContext(MainContext);

  const nameInformation = useInput("", (value) => !validator.isEmpty(value));
  const { createGroup } = useProfile();
  // const handleCreatePage = () => {
  //   createPage(nameInformation.value, selected);
  // };
  const [error, setError] = useState(null);
  const [selectedPrivacy, setSelectedPrivacy] = useState("");
  const [selectedVisibility, setSelectedVisibility] = useState("");
  const privacy = [
    { label: "public", value: "public" },
    { label: "private", value: "private" },
  ];
  const visibility = [
    { label: "hidden", value: "hidden" },
    { label: "visible", value: "visible" },
  ];

  const handleSelectPrivacyChange = (selectedOption) => {
    setSelectedPrivacy(selectedOption.value);
  
    if (selectedOption.value === "public" && selectedVisibility === "hidden") {
      setError("you cannot select public because the visibility is hidden");
    } else {
      setError(null);
    }
  };
  const handleSelectVisibilityChange = (selectedOption) => {
    setSelectedVisibility(selectedOption.value);
   
    if (selectedOption.value === "hidden" && selectedPrivacy === "public") {
      setError("you cannot select hidden because the privacy is public");
    } else {
      setError(null);
    }
  };

  const formIsInvalid =
    (selectedPrivacy === "public" && selectedVisibility === "hidden") ||
    nameInformation.value === "" ||
    selectedVisibility === "" ||
    selectedPrivacy === "";

  const handleCreateGroup = () => {
    createGroup(nameInformation.value, selectedPrivacy, selectedVisibility);
  };

  return (
    <>
      <Input
        placeholder="Add Group Name"
        textError="Name should be not empty"
        value={nameInformation.value}
        onChange={(event) => nameInformation.handleInputChange(event)}
        onBlur={nameInformation.handleInputBlur}
        hasError={nameInformation.hasError}
      />
      <div className={classes.select__container}>
        <Select
          defaultValue={selectedPrivacy}
          onChange={handleSelectPrivacyChange}
          options={privacy}
          placeholder={"Select privacy"}
        />
        <Select
          defaultValue={selectedVisibility}
          onChange={handleSelectVisibilityChange}
          options={visibility}
          placeholder={"Select visibility"}
        />{" "}
      </div>{" "}
      {error && <div style={{ color: "red" }}>{error}</div>}
      <footer className={classes.footer}>
        <button
          disabled={formIsInvalid || disableIsActive}
          onClick={handleCreateGroup}
        >
          {"Save"}
        </button>
      </footer>{" "}
    </>
  );
};

export default CreateGroupCard;
