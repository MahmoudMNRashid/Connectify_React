import { useContext, useState } from "react";
import classes from "./CheckboxInput.module.css";
import { MainContext } from "../../context/MainContext";
import toast from "react-hot-toast";

const CheckboxInput = ({ initData, secondData, label, fn, disabled }) => {
  const [checkedData, setcheckedData] = useState(initData);
  const [showButton, setShowButton] = useState(false);
  const { disableIsActive } = useContext(MainContext);

  const handleChange = () => {
    const newValue = checkedData === initData ? secondData : initData;
    setcheckedData(newValue);
    setShowButton(newValue !== initData);
  };

  const handleSaveSetting = async () => {
    try {
      await fn(secondData);
      setShowButton(false);
    } catch (error) {
      toast.error(error.message || error);
      // handle the error if needed
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes["btn-container"]}>
        <label className={`${classes["btn-color-mode-switch"]}`}>
          <input
            id={`color_mode_${label}`}
            name={`color_mode_${label}`}
            type="checkbox"
            checked={checkedData === initData}
            onChange={handleChange}
            disabled={disableIsActive || disabled}
          />
          <label
            className={classes["btn-color-mode-switch-inner"]}
            data-off={secondData}
            data-on={initData}
            htmlFor={`color_mode_${label}`}
          />
        </label>
      </div>
      {showButton && (
        <button
          onClick={handleSaveSetting}
          className={classes.button}
          disabled={disableIsActive}
        >
          Save Changes
        </button>
      )}
    </div>
  );
};

export default CheckboxInput;
