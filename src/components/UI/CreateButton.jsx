import { useContext } from "react";
import { MainContext } from "../../context/MainContext";
import classes from "./CreateButton.module.css";
import { Tooltip } from "react-tooltip";
const CreateButton = ({ fn, tooltip, style, icon: Icon }) => {
  const { disableIsActive } = useContext(MainContext);

  return (
    <button
      disabled={disableIsActive}
      style={style}
      className={classes.circle_button}
      onClick={fn}
      data-tooltip-id="ttt"
      data-tooltip-content={tooltip}
      data-tooltip-place="right"
    >
      {Icon && <Icon />}
      <Tooltip
        id="ttt"
        effect="solid"
        variant="light"
        className={classes.tooltip}
      />
    </button>
  );
};

export default CreateButton;
