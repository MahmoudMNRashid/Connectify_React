import { useContext, useState } from "react";
import { useInput } from "../../hooks/UseInput";
import classes from "./SettingCard.module.css";
import { Input } from "../UI/Input";
import toast from "react-hot-toast";
import { MainContext } from "../../context/MainContext";
const SettingCard = ({ result, validator, title, fnEdit, fnAdd }) => {
  const [showInput, setShowInput] = useState(false);
  const [editMode, seteditMode] = useState(false);

  const {    
    disableIsActive, 
  } = useContext(MainContext);

  const { value, handleInputBlur, handleInputChange, hasError, valueIsValid } =
    useInput(result, validator);

  const handleOpenEditMode = () => {
    setShowInput(true);
    seteditMode(true);
  };

  const handleOpenAddMode = () => {
    setShowInput(true);
    seteditMode(false);
  };

  const handleCLoseInput = () => {
    setShowInput(false);
    if (editMode) {
      seteditMode(false);
    }
  };

  const handleSave = async () => {
    try {
      if (editMode) {
        await fnEdit(value);
      } else {
        await fnAdd(value);
      }

      handleCLoseInput();
    } catch (error) {
      toast.error(error.message || error);
    }
  };

  return (
    <div className={classes.dataHolder1}>
      {!result && (
        <button disabled={disableIsActive} onClick={handleOpenAddMode}>
          Add {title}
        </button>
      )}

      {result && (
        <>
          <div>
            <p>{title}:</p>
            <p>{result}</p>
          </div>
          <button disabled={disableIsActive} onClick={handleOpenEditMode}>
            Edit {title}
          </button>
        </>
      )}
      {showInput && (
        <div className={classes.actions}>
          <Input
            placeholder="Add name"
            textError="name is required"
            type="text"
            value={value}
            onChange={(event) => handleInputChange(event)}
            onBlur={handleInputBlur}
            hasError={hasError}
          />
          <div className={classes.buttons}>
            <button
              onClick={handleSave}
              disabled={!valueIsValid || disableIsActive}
            >
              Save
            </button>
            <button disabled={disableIsActive} onClick={handleCLoseInput}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingCard;
